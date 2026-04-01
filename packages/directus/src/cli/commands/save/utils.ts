import * as fs from 'fs';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);

export const deepCopy = (src: Record<string, any>, dest: Record<string, any>) => {
  for (const key in src) {
    if (typeof src[key] !== 'object') {
      //est une feuille
      dest[key] = src[key];
    } else {
      if (!dest[key]) {
        if (Array.isArray(src[key])) {
          dest[key] = [];
        } else {
          dest[key] = {};
        }
      }
      deepCopy(src[key], dest[key]);
    }
  }
};

export const testPath = (obj: any, ...args: string[]) => {
  for (const key of args) {
    if (obj && obj[key] !== undefined) {
      // false positive : https://semgrep.dev/r?q=javascript.lang.security.audit.prototype-pollution.prototype-pollution-loop.prototype-pollution-loop
      // we are read-only here
      obj = obj[key]; // nosemgrep
    } else {
      return;
    }
  }
  return obj;
};

export type BasicType =
	| 'string'
	| 'number'
	| 'bigint'
	| 'boolean'
	| 'symbol'
	| 'undefined'
	| 'object'
	| 'function'
	| 'array'
	| 'date'
	| 'buffer';

export const getBasicType = (object: any): BasicType => {
  let currentType: BasicType = typeof object;
  if (currentType === 'object') {
    if (object instanceof Date) {
      currentType = 'date';
    }
    if (Array.isArray(object)) {
      currentType = 'array';
    }
    if (Buffer.isBuffer(object)) {
      currentType = 'buffer';
    }
  }
  return currentType;
};

export const getStackTracePaths: () => string[] = () => {
  /**
     * The pattern of an error is :
     * Error: this is a test to see stack traces!
        at __decorate (/home/louis/webcapsule/app/app-api/src/actions/action-manager.ts:5:95)
        at Object.<anonymous> (/home/louis/webcapsule/app/app-api/src/actions/action-manager.ts:601:27)
        at Module._compile (node:internal/modules/cjs/loader:1105:14)
     *
     */
  const error = new Error();
  const stacks = error.stack!.split('\n');
  stacks.shift();
  const result : string[] = [];
  for (let i = 0; i < stacks.length; i++) {
    const line = stacks[i];
    const pattern = /at[^(]+(?:\(([^)]+):[0-9]+:[0-9]+\)|(.*))/;
    result.push(pattern.exec(line)![1]);
  }
  return result;
};

export const readFirstLineOfFile: (filePath: string) => Promise<string> = (
  filePath: string,
) => {
  return new Promise<string>((resolve, reject) => {
    const rs = fs.createReadStream(filePath);
    let acc = '';
    let pos = 0;
    let index;
    rs
      .on('data', (chunk: string | Buffer) => {
        acc += chunk;
        index = chunk.indexOf('\n');
        if (index === -1) {
          pos += chunk.length;
        } else {
          pos += index;
          rs.close();
        }
      })
      .on('close', () =>
        resolve(acc.slice(acc.charCodeAt(0) === 0xfeff ? 1 : 0, pos)),
      )
      .on('error', (err: Error) => reject(err));
  });
};

export const readCsvFile: (filePath: string) => Promise<
  {
    [key: string]: string;
  }[]
> = async (filePath) => {
  const result: { [key: string]: string }[] = [];
  const fileContent = (await readFile(filePath)).toString();
  const lines = fileContent
    .split('\n')
    .map((line: string) => line.trim())
    .filter((line: string) => line); // Trim and remove empty lines;
  const firstLine = lines[0].split(',').map((key: string) => key.trim());
  const otherLines = lines.slice(1);
  for (const line of otherLines) {
    const values = line.split(',');
    const item: Record<string, string> = {};
    for (let i = 0; i < values.length; i++) {
      const key = firstLine[i];
      const value = values[i];
      item[key] = value;
    }
    result.push(item);
  }
  return result;
};