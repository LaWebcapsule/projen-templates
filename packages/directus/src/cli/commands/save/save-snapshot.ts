import { createWriteStream, readFileSync } from 'fs';
import { mkdir, readFile, rm, writeFile } from 'fs/promises';
import { pipeline } from 'stream/promises';
import * as pg from 'pg';
import { to as copyTo } from 'pg-copy-streams';
import { Cli } from './cli';
import { logger } from '../../logger';
import { d9ToCedar } from '../cedar/d9-to-cedar';

async function formateSerial() {
  //this can be removed once this is fixed :
  //https://github.com/ariga/atlas/issues/2492
  const sqlSchema = (await readFile('./sql/schema.sql')).toString();
  let pattern =
        /(".*")\s+integer\s+NOT\s+NULL\s+DEFAULT\s+nextval\(.*::regclass\)/g;
  let replacement = '$1 serial NOT NULL';
  let endSchema = sqlSchema.replace(pattern, replacement);
  pattern = /(".*")\s+integer\s+DEFAULT\s+nextval\(.*::regclass\)/g;
  replacement = '$1 serial';
  endSchema = endSchema.replace(pattern, replacement);
  await writeFile('./sql/schema.sql', endSchema);
}

export async function saveSQLSnapshot(dbConfig: {
  host: string;
  user: string;
  pwd: string;
  database: string;
  ssl?: boolean;
}, opts: { cedar?: boolean } = {}) {
  const connectionProps: pg.ClientConfig = {
    user: dbConfig.user,
    host: dbConfig.host,
    password: dbConfig.pwd,
    database: dbConfig.database,
    ...(dbConfig.ssl ? { ssl: { rejectUnauthorized: false } } : {}),
  };
  const cli = new Cli();
  await rm('./sql/data', { recursive: true, force: true }); //we make sure we have an empty data set
  await Promise.all([await mkdir('sql/data', { recursive: true })]); //with recursive, there is no error if folder already exists

  //atlas documentation : https://atlasgo.io/
  logger.info('Dumping the schema with atlas into ./sql/schema.sql');
  const writeFileStream = createWriteStream('./sql/schema.sql');
  await cli.command(
    'npx',
    [
      'atlas',
      'schema', //schema only
      'inspect',
      '-u',
      `postgres://${dbConfig.user}:${dbConfig.pwd}@${dbConfig.host}/${dbConfig.database}?sslmode=${dbConfig.ssl ? 'require' : 'disable'}`, //output file
      '--format',
      '{{ sql . "  " }}',
    ],
    {
      env: {
        ...process.env,
        ATLAS_NO_UPDATE_NOTIFIER: 'true', //if not set, atlas end a final line with "a new version of atlas is available"
      },
      stdout: writeFileStream,
    },
  );
  await formateSerial();
  let customTablesToDump : string[] = [];
  let customTablesNotToDump : string[] = [];
  try {
    customTablesToDump = readFileSync('./sql/tables_to_dump.txt')
      .toString()
      .split('\n');
    logger.info(`Using sql/tables_to_dump.txt (${customTablesToDump.length} tables)`);
  } catch (e) {
    logger.debug('no sql/tables_to_dump.txt');
  }
  try {
    customTablesNotToDump = readFileSync('./sql/tables_not_to_dump.txt')
      .toString()
      .split('\n');
    logger.info(`Using sql/tables_not_to_dump.txt (${customTablesNotToDump.length} tables)`);
  } catch (e) {
    logger.debug('no sql/tables_not_to_dump.txt');
  }
  const pgClient = new pg.Client(connectionProps);
  await pgClient.connect();
  try {
    logger.info('Dumping the data into ./sql/data');
    let dumpedTables = 0;
    const tables = await pgClient.query(`
          SELECT table_name
          FROM information_schema.tables
          WHERE table_schema='public'
          AND table_type='BASE TABLE';
      `);

    const foreignKeysToUser = await pgClient.query(`
          SELECT
              conname AS foreign_key_name,
              conrelid::regclass AS table_name,
              a.attname AS column_name,
              confrelid::regclass AS referenced_table,
              af.attname AS referenced_column
          FROM
              pg_constraint AS c
          JOIN
              pg_attribute AS a ON a.attnum = ANY(c.conkey) AND a.attrelid = c.conrelid
          JOIN
              pg_attribute AS af ON af.attnum = ANY(c.confkey) AND af.attrelid = c.confrelid
          WHERE
              confrelid = 'directus_users'::regclass
      `);

    const tableHasFgKey: Record<string, Record<string, boolean>> = {};
    for (const foreignKey of foreignKeysToUser.rows) {
      tableHasFgKey[foreignKey.table_name] = {
        ...tableHasFgKey[foreignKey.table_name],
        [foreignKey.column_name]: true,
      };
    }

    for (const table of tables.rows) {
      //the table is not in tables_not_to_dump.txt
      //either : is a directus_ table
      //either : the table is in tables_to_dump.txt
      if (
        !customTablesNotToDump.includes(table.table_name) &&
              ((table.table_name.startsWith('directus_') &&
                  !(table.table_name === 'directus_users') &&
                  !(table.table_name === 'directus_sessions') &&
                  !(table.table_name === 'directus_revisions') &&
                  !(table.table_name === 'directus_activity') &&
                  !(table.table_name === 'directus_presets')) ||
                  customTablesToDump.includes(table.table_name))
      ) {
        //We can not dump the user table
        //so for all table pointing to the user table
        //we point to a fictif ci user.
        //for this, we find all the foreign keys pointing to directus_user (id)
        //and we format the copy

        const fields = await pgClient.query(`
                  SELECT column_name
                  FROM information_schema.columns
                  WHERE table_name = '${table.table_name}'
                  ORDER BY column_name;
              `);
        const primaryKeys = await pgClient.query(`
                  SELECT a.attname AS pk, format_type(a.atttypid, a.atttypmod) AS data_type
                  FROM   pg_index i
                  JOIN   pg_attribute a ON a.attrelid = i.indrelid
                  AND a.attnum = ANY(i.indkey)
                  WHERE  i.indrelid = '"${table.table_name}"'::regclass
              `);
        const primaryKeyColumnName = primaryKeys.rows[0].pk;

        //sql statement will look like
        /**
               * SELECT id, message, '' AS user_created, '' AS user_updated
               * FROM directus_revisions
               */

        const wbceCiUserId = '49bcde5d-90aa-4be8-ab10-f9ae1a07546f';

        let sqlSelectStatement = 'SELECT ';
        for (const field of fields.rows) {
          if (
            tableHasFgKey?.[table.table_name]?.[field.column_name]
          ) {
            sqlSelectStatement += `CASE WHEN (t."${field.column_name}" IS NULL)   
                  THEN t."${field.column_name}"
                  ELSE '${wbceCiUserId}' 
                  END AS "${field.column_name}"`;
          } else {
            sqlSelectStatement += `t."${field.column_name}"`;
          }
          sqlSelectStatement += ', ';
        }
        //remove last comma
        sqlSelectStatement = sqlSelectStatement.slice(0, -2);
        //finish statement
        sqlSelectStatement += `  FROM "${table.table_name}" AS t`;
        //for directus_files and directus_folders, we only want to keep some but not all files.
        //for now, we keep all files included in the "common" folder
        if (['directus_files', 'directus_folders'].includes(table.table_name)) {
          const commonFolderName = 'common';
          let recursiveStatement = `
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
                  `;
          const folderKey : Record<string, string> = {
            directus_files: 'folder',
            directus_folders: 'parent',
          };
          sqlSelectStatement += ` WHERE t.${folderKey[table.table_name]} IN (SELECT id FROM folder_tree) `;
          if (table.table_name === 'directus_folders') {
            //also include folders targetted by a field (for example, a file field whose file will be placed on a specific folder)
            // and their parents

            recursiveStatement += ` , 
                      folder_from_fields_tree AS (
                              -- Anchor: Get the initial folder IDs from field options
                              -- We cast to UUID to ensure compatibility with the folders table
                              SELECT (options::json->>'folder')::uuid AS id
                              FROM directus_fields                                                                                    
                              WHERE options IS NOT NULL AND options::json->>'folder' IS NOT NULL
                              UNION
                            
                              -- Recursive step: find the parent of each folder
                              -- This "climbs" the tree by matching the ID we just found 
                              -- to a row and selecting its parent
                              SELECT f.parent
                              FROM directus_folders f
                              JOIN folder_from_fields_tree ft ON f.id = ft.id
                              WHERE f.parent IS NOT NULL
                          )
                      `;
            sqlSelectStatement += ' OR t.id IN (SELECT id FROM folder_from_fields_tree) ';
            sqlSelectStatement += ` OR t.name = '${commonFolderName}' `; //also include the common folder
          }
          sqlSelectStatement = recursiveStatement + sqlSelectStatement;
        }

        sqlSelectStatement += ` ORDER BY t."${primaryKeyColumnName}"`;

        const dbStream = pgClient.query(
          copyTo(
            `COPY (${sqlSelectStatement}) TO STDOUT DELIMITER ',' CSV HEADER;`,
          ),
        );
        const fileStream = createWriteStream(
          `./sql/data/${table.table_name}.csv`,
        );
        await pipeline(dbStream, fileStream);
        logger.debug(`dumped ${table.table_name}`);
        dumpedTables++;
      }
    }
    logger.info(`Dumped ${dumpedTables} tables into ./sql/data`);
  } catch (e) {
    logger.error('Error while dumping the data');
    throw e;
  } finally {
    await pgClient.end();
  }
  if (opts.cedar !== false) {
    logger.info('Generating the Cedar policies into ./permissions');
    await d9ToCedar({ permissionPath: './permissions', sqlPath: './sql/data' });
  }
}