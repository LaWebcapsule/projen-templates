import * as fs from 'fs';
import { pipeline as streamPipeline, Writable } from 'stream';
import { promisify } from 'util';
import * as pg from 'pg';
import { from as copyFrom } from 'pg-copy-streams';
import { Cli } from './cli';
import { readFirstLineOfFile } from './utils';

const readdir = promisify(fs.readdir);
const pipeline = promisify(streamPipeline);


export async function applySQLSnapshot(dbConfig: {
  host: string;
  user: string;
  pwd: string;
  database: string;
  ssl?: boolean;
}): Promise<void> {
  let pgClient: pg.Client;
  const connectionProps: pg.ClientConfig = {
    user: dbConfig.user,
    host: dbConfig.host,
    password: dbConfig.pwd,
    database: 'postgres',
    ...(dbConfig.ssl ? { ssl: { rejectUnauthorized: false } } : {}),
  };
    //SCHEMA
    //1. we create an empty db
    //2. we populate with the schema
    //3. we calculate the diff
  pgClient = new pg.Client(connectionProps);
  console.info('creating empty tmp database');
  await pgClient.connect();
  try {
    await pgClient.query(`DROP DATABASE IF EXISTS ${dbConfig.database}_tmp_bis`);
    await pgClient.query(`CREATE DATABASE ${dbConfig.database}_tmp_bis;`);
  } finally {
    await pgClient.end();
  }
  connectionProps.database = `${dbConfig.database}_tmp_bis`;
  pgClient = new pg.Client(connectionProps);

  const endDbClient = new pg.Client({
    ...connectionProps,
    database: dbConfig.database,
  });

  await Promise.all([pgClient.connect(), endDbClient.connect()]);

  let sqlMigration = '';
  try {
    console.info('populating with target schema');
    //we manually install postgis and some extensions. We should do a dump of sql extensions but we are waiting for atlasgo to support this (time of writing : 19/03 - atlasgo released extensions support but not in the community version)
    let extensionQuery = `
            create extension if not exists postgis;
            create extension if not exists fuzzystrmatch;
            create extension if not exists postgis_tiger_geocoder ;
            create extension if not exists postgis_raster ;
            create extension if not exists postgis_topology ;
            create extension if not exists address_standardizer ;
        `;
    //there is a problem with the dump in atlas : schema are created with CREATE and not create if not exits...
    //so we insert extension creation after schema creation in order to avoid getting "schema already exists"
    const sqlSchema = fs.readFileSync('./sql/schema.sql').toString();
    const sqlSchemaWithExtension = sqlSchema
      .replace(
        'CREATE TABLE',
        `${extensionQuery}
            CREATE TABLE`,
      ) //only first occurrence will be replaced
      .replace(/CREATE SCHEMA IF NOT EXISTS/g, 'CREATE SCHEMA')
      .replace(/CREATE SCHEMA/g, 'CREATE SCHEMA IF NOT EXISTS'); //ensure all create schema use "if not exists"
    //if target database does not contain any directus tables we just need to populate the base schema.
    const countTablesReq = `
            SELECT COUNT(*) 
            FROM information_schema.tables 
            WHERE table_schema = 'public' AND table_name LIKE 'directus_%';
        `;
    const countTables = await endDbClient.query(countTablesReq);
    if (Number(countTables.rows[0].count) === 0) {
      //we drop the extension and reapply the schema with directus
      console.info('Target database is empty ; populating it and exiting.');
      //note that finally block will be executed, even if we return
      await endDbClient.query(sqlSchemaWithExtension);
    }

    await pgClient.query(sqlSchemaWithExtension);
  } finally {
    await pgClient.end();
    await endDbClient.end();
  }

  //we calculate the diff
  const migrationStream = new Writable({
    write: (chunk, _encoding, next) => {
      sqlMigration += chunk.toString();
      next();
    },
  });
  console.info('calculating migration diff');
  const cli = new Cli();
  await cli.command(
    'npx',
    [
      'atlas',
      'schema',
      'diff',
      '--from',
      `postgres://${dbConfig.user}:${dbConfig.pwd}@${dbConfig.host}/${dbConfig.database}?sslmode=${dbConfig.ssl ? 'require' : 'disable'}`,
      '--to',
      `postgres://${dbConfig.user}:${dbConfig.pwd}@${dbConfig.host}/${dbConfig.database}_tmp_bis?sslmode=${dbConfig.ssl ? 'require' : 'disable'}`,
    ],
    {
      env: {
        ...process.env,
        ATLAS_NO_UPDATE_NOTIFIER: 'true', //if not set, atlas end a final line with "a new version of atlas is available"
      },
      stdout: migrationStream,
    },
  );
  if (sqlMigration.includes('no changes to be made')) {
    sqlMigration = '';
  }
  //we apply the diffs in schema and data in one transaction
  const pgTmpClient = new pg.Client(connectionProps);
  connectionProps.database = dbConfig.database;
  pgClient = new pg.Client(connectionProps);
  await Promise.all([pgClient.connect(), pgTmpClient.connect()]);
  try {
    await pgClient.query('BEGIN');
    console.info('apply schema');
    await pgClient.query(sqlMigration);
    console.info('apply data');
    //strategy to apply data :
    //- remove the constraint
    //- upsert the data
    //- apply the constraint

    //always be sure the ci user exists
    await pgClient.query(`
            INSERT INTO public.directus_users (id, first_name, last_name, email)
            VALUES ('49bcde5d-90aa-4be8-ab10-f9ae1a07546f', 'CI', 'Webcapsule', 'ci@webcapsule.io')
            ON CONFLICT DO NOTHING
        `);

    //for constraints see this :
    //https://confluence.atlassian.com/kb/how-to-drop-and-recreate-the-database-constraints-on-postgresql-776812450.html
    //we get all the constraints except the primary keys
    console.info('remove the constraints on the table');
    const constraints = await pgClient.query(`
            SELECT nspname, relname, conname, pg_get_constraintdef(pg_constraint.oid)
            FROM pg_constraint
            INNER JOIN pg_class ON conrelid=pg_class.oid
            INNER JOIN pg_namespace ON pg_namespace.oid=pg_class.relnamespace
            WHERE NOT nspname = 'pg_catalog' AND NOT contype = 'p'
            ORDER BY CASE WHEN contype='f' THEN 0 ELSE 1 END DESC,contype DESC,nspname DESC,relname DESC,conname DESC
        `);

    //remove the constraints
    //the query above is both for adding or dropping order. For dropping, we need to reverse the order
    for (let i = 0; i < constraints.rows.length; i++) {
      const constraint = constraints.rows[constraints.rows.length - 1 - i];
      await pgClient.query(`
                ALTER TABLE ${constraint.nspname}."${constraint.relname}" DROP CONSTRAINT "${constraint.conname}"
            `);
    }

    //replace data
    console.info('replacing with data');
    const csvFiles = await readdir('./sql/data');
    console.log(csvFiles);
    for (const file of csvFiles) {
      if (file.endsWith('.csv')) {
        const nonParsedTableName = file.slice(0, -4);
        const originalTableName = pg.escapeIdentifier(nonParsedTableName);
        let copyTableName = originalTableName;
        let existingRowsCanCauseConflict = false;
        if (['directus_files', 'directus_folders'].includes(nonParsedTableName)) {
          //delete all files and folders that are inside the "common" folder
          const commonFolderName = 'common';
          const folderKey: Record<string, string> = {
            directus_files: 'folder',
            directus_folders: 'parent',
          };
          await pgClient.query(` 
                        WITH RECURSIVE folder_tree AS (
                              -- Anchor: the "common" folder
                                  SELECT id
                                  FROM directus_folders
                                  WHERE name = '${commonFolderName}'
                              UNION
                            -- Recursive step: find subfolders
                            SELECT f.id
                            FROM directus_folders f
                            JOIN folder_tree ft ON f.parent = ft.id
                        )
                        DELETE FROM public.${copyTableName} AS t
                        WHERE t.${folderKey[nonParsedTableName]} IN (SELECT id FROM folder_tree);
                        `);
          if (nonParsedTableName === 'directus_folders') {
            existingRowsCanCauseConflict = true;
          }
        } else {
          await pgClient.query(`DELETE FROM public.${copyTableName}`);
        }
        if (existingRowsCanCauseConflict) {
          //we will import data in a temporary table, then do the insert
          copyTableName = pg.escapeIdentifier(`${nonParsedTableName}_wbce_tmp`);
          await pgClient.query(
            `CREATE TEMP TABLE ${copyTableName} ON COMMIT DROP AS SELECT * FROM public.${originalTableName} WITH NO DATA`,
          );
        }
        //read first line
        let firstLine = await readFirstLineOfFile(`./sql/data/${file}`);
        firstLine = firstLine
          .split(',')
          .map((c) => `"${c}"`)
          .join(',');
        const ingestStream = pgClient.query(
          copyFrom(
            `COPY ${copyTableName} (${firstLine})  FROM STDIN  DELIMITER ',' CSV HEADER`,
          ),
        );
        const sourceStream = fs.createReadStream(`./sql/data/${file}`);
        ingestStream.on('close', () => {
          console.info(`ingested ${file}`);
        });
        console.info(`ingesting ${file}`);

        await pipeline(sourceStream, ingestStream);
        if (existingRowsCanCauseConflict) {
          await pgClient.query(`
							DELETE FROM public.${originalTableName}
							WHERE id IN (SELECT id FROM ${copyTableName});
						`);
          await pgClient.query(`
							INSERT INTO public.${originalTableName}
							SELECT * FROM ${copyTableName};
						`);
        }
      }
    }

    //reestablish the constraints
    console.info('reestablish the constraints');
    for (const constraint of constraints.rows) {
      await pgClient.query(`
                ALTER TABLE ${constraint.nspname}."${constraint.relname}" ADD CONSTRAINT "${constraint.conname}"  ${constraint.pg_get_constraintdef}
            `);
    }

    //update the sequences
    //when adding with COPY, all sequences are not up to date
    //we need to find all sequences and then to find the max on the managed column and then to update the sequence

    console.info('find sequences');
    const sequences = await pgClient.query(`
            SELECT n.nspname as "schema",
                c.relname as "name",
                CASE c.relkind WHEN 'r' THEN 'table' WHEN 'v' THEN 'view' WHEN 'm' THEN 'materialized view' WHEN 'i' THEN 'index' WHEN 'S' THEN 'sequence' WHEN 's' THEN 'special' WHEN 't' THEN 'TOAST table' WHEN 'f' THEN 'foreign table' WHEN 'p' THEN 'partitioned table' WHEN 'I' THEN 'partitioned index' END as "Type",
                pg_catalog.pg_get_userbyid(c.relowner) as "Owner"
            FROM pg_catalog.pg_class c
                LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
            WHERE c.relkind IN ('S','')
                AND n.nspname <> 'pg_catalog'
                AND n.nspname !~ '^pg_toast'
                AND n.nspname <> 'information_schema'
            AND pg_catalog.pg_table_is_visible(c.oid)
            ORDER BY 1,2;
        `);

    for (const seq of sequences.rows) {
      console.info(`find column managed by ${seq.name}`);
      const relation = await pgClient.query(`
                SELECT d.refobjid::regclass as "table", a.attname as "field"
                FROM   pg_depend    d
                JOIN   pg_attribute a ON a.attrelid = d.refobjid
                                    AND a.attnum   = d.refobjsubid
                WHERE  d.objid = '${seq.schema}."${seq.name}"'::regclass
                AND    d.refobjsubid > 0
                AND    d.classid = 'pg_class'::regclass;
            `);
      console.info(
        `find max of ${relation.rows[0].table} ${relation.rows[0].field}`,
      );
      const max = await pgClient.query(`
                SELECT MAX(${relation.rows[0].field})
                FROM ${relation.rows[0].table}
            `);

      if (max.rows[0].max !== null) {
        console.info('alter the sequence');
        await pgClient.query(
          `alter sequence ${seq.schema}."${seq.name}" restart with ${max.rows[0].max + 1};`,
        );
      }
    }

    await pgClient.query('COMMIT');
    console.log('success');

  } catch (e) {
    await pgClient.query('ROLLBACK');
    console.log('error');

    throw e;
  } finally {
    await pgClient.end();
    await pgTmpClient.end();
    console.log('end of the query');
  }
}

