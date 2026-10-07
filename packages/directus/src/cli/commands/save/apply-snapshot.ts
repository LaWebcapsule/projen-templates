import * as fs from 'fs';
import { pipeline as streamPipeline, Writable } from 'stream';
import { promisify } from 'util';
import * as pg from 'pg';
import { from as copyFrom } from 'pg-copy-streams';
import { Cli } from './cli';
import { readFirstLineOfFile } from './utils';
import { ensureAtlas } from '../../atlas';
import { logger } from '../../logger';

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
  logger.info(`Creating the temporary database ${dbConfig.database}_tmp_bis`);
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
    logger.info('Loading the target schema into the temporary database');
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
    //if target database does not contain any d9 tables we just need to populate the base schema.
    const countTablesReq = `
            SELECT COUNT(*) 
            FROM information_schema.tables 
            WHERE table_schema = 'public' AND table_name LIKE 'directus_%';
        `;
    const countTables = await endDbClient.query(countTablesReq);
    if (Number(countTables.rows[0].count) === 0) {
      //we drop the extension and reapply the schema with d9
      logger.info('Target database has no d9 tables: creating the schema directly');
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
  logger.info('Computing the schema diff with atlas');
  const cli = new Cli();
  await cli.command(
    await ensureAtlas(),
    [
      'schema',
      'diff',
      '--from',
      `postgres://${encodeURIComponent(dbConfig.user)}:${encodeURIComponent(dbConfig.pwd)}@${dbConfig.host}/${dbConfig.database}?sslmode=${dbConfig.ssl ? 'require' : 'disable'}`,
      '--to',
      `postgres://${encodeURIComponent(dbConfig.user)}:${encodeURIComponent(dbConfig.pwd)}@${dbConfig.host}/${dbConfig.database}_tmp_bis?sslmode=${dbConfig.ssl ? 'require' : 'disable'}`,
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
  if (sqlMigration.trim()) {
    const statements = sqlMigration.split('\n').filter((line) => line.trim().endsWith(';')).length;
    logger.info(`Schema migration: ${statements} statements`);
    logger.debug(sqlMigration);
  } else {
    logger.info('Schema is up to date');
  }
  //we apply the diffs in schema and data in one transaction
  const pgTmpClient = new pg.Client(connectionProps);
  connectionProps.database = dbConfig.database;
  pgClient = new pg.Client(connectionProps);
  await Promise.all([pgClient.connect(), pgTmpClient.connect()]);
  try {
    await pgClient.query('BEGIN');
    logger.info('Applying the schema migration');
    await pgClient.query(sqlMigration);
    //strategy to apply data :
    //- remove the constraint
    //- upsert the data
    //- apply the constraint

    //always be sure the ci user exists
    await pgClient.query(`
            INSERT INTO public.directus_users (id, first_name, last_name, email)
            VALUES ('49bcde5d-90aa-4be8-ab10-f9ae1a07546f', 'CI', 'D9-plumbing', 'd9@webcapsule.io')
            ON CONFLICT DO NOTHING
        `);

    //for constraints see this :
    //https://confluence.atlassian.com/kb/how-to-drop-and-recreate-the-database-constraints-on-postgresql-776812450.html
    //we get all the constraints except the primary keys
    const constraints = await pgClient.query(`
            SELECT nspname, relname, conname, pg_get_constraintdef(pg_constraint.oid)
            FROM pg_constraint
            INNER JOIN pg_class ON conrelid=pg_class.oid
            INNER JOIN pg_namespace ON pg_namespace.oid=pg_class.relnamespace
            WHERE NOT nspname = 'pg_catalog' AND NOT contype = 'p'
            ORDER BY CASE WHEN contype='f' THEN 0 ELSE 1 END DESC,contype DESC,nspname DESC,relname DESC,conname DESC
        `);

    //remove the constraints
    logger.info(`Dropping ${constraints.rows.length} constraints`);
    //the query above is both for adding or dropping order. For dropping, we need to reverse the order
    for (let i = 0; i < constraints.rows.length; i++) {
      const constraint = constraints.rows[constraints.rows.length - 1 - i];
      await pgClient.query(`
                ALTER TABLE ${constraint.nspname}."${constraint.relname}" DROP CONSTRAINT "${constraint.conname}"
            `);
    }

    //replace data
    const csvFiles = await readdir('./sql/data');
    logger.info(`Importing ${csvFiles.filter((file) => file.endsWith('.csv')).length} CSV files from ./sql/data`);
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
          logger.debug(`ingested ${file}`);
        });
        logger.debug(`ingesting ${file}`);

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
    logger.info(`Restoring ${constraints.rows.length} constraints`);
    for (const constraint of constraints.rows) {
      await pgClient.query(`
                ALTER TABLE ${constraint.nspname}."${constraint.relname}" ADD CONSTRAINT "${constraint.conname}"  ${constraint.pg_get_constraintdef}
            `);
    }

    //update the sequences
    //when adding with COPY, all sequences are not up to date
    //we need to find all sequences and then to find the max on the managed column and then to update the sequence

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

    logger.info(`Resetting ${sequences.rows.length} sequences`);
    for (const seq of sequences.rows) {
      logger.debug(`find column managed by ${seq.name}`);
      const relation = await pgClient.query(`
                SELECT d.refobjid::regclass as "table", a.attname as "field"
                FROM   pg_depend    d
                JOIN   pg_attribute a ON a.attrelid = d.refobjid
                                    AND a.attnum   = d.refobjsubid
                WHERE  d.objid = '${seq.schema}."${seq.name}"'::regclass
                AND    d.refobjsubid > 0
                AND    d.classid = 'pg_class'::regclass;
            `);
      logger.debug(
        `find max of ${relation.rows[0].table} ${relation.rows[0].field}`,
      );
      const max = await pgClient.query(`
                SELECT MAX(${relation.rows[0].field})
                FROM ${relation.rows[0].table}
            `);

      if (max.rows[0].max !== null) {
        logger.debug(`restart ${seq.name} at ${max.rows[0].max + 1}`);
        await pgClient.query(
          `alter sequence ${seq.schema}."${seq.name}" restart with ${max.rows[0].max + 1};`,
        );
      }
    }

    await pgClient.query('COMMIT');
    logger.info('Transaction committed');

  } catch (e) {
    logger.error('Error while applying the snapshot, rolling back the transaction');
    await pgClient.query('ROLLBACK');

    throw e;
  } finally {
    await pgClient.end();
    await pgTmpClient.end();
  }
  //schema (collections, fields, relations) is always cached (CACHE_SCHEMA), permissions only when CACHE_ENABLED: a purge is enough.
  //flows, operations and webhooks are loaded in memory at startup and only reloaded by their own services: a restart is needed.
  logger.warn('Purge the d9 cache (POST /utils/cache/clear) to take the new schema (and permissions, if CACHE_ENABLED) into account. If flows, operations or webhooks changed, also restart d9.');
}

