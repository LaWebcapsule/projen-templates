import * as fs from 'fs';
import * as path from 'path';

const VALID_TYPES = ['interface', 'display', 'layout', 'module', 'panel', 'endpoint', 'hook', 'operation'];

const name = process.env.NAME;
const type = process.env.TYPE;

if (!name || !type) {
  console.error('Usage: NAME=my-ext TYPE=hook npx projen create-extension');
  console.error(`Valid types: ${VALID_TYPES.join(', ')}`);
  process.exit(1);
}

if (!VALID_TYPES.includes(type)) {
  console.error(`Invalid type: ${type}`);
  console.error(`Valid types: ${VALID_TYPES.join(', ')}`);
  process.exit(1);
}

// The config file path is passed as an argument
const configPath = process.argv[2];
if (!configPath) {
  console.error('Config path argument is required');
  process.exit(1);
}

const fullPath = path.resolve(configPath);

// Read existing config or start fresh
let extensions: Array<{ name: string; type: string }> = [];
if (fs.existsSync(fullPath)) {
  extensions = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
}

// Check for duplicates
if (extensions.some(e => e.name === name)) {
  console.error(`Extension '${name}' already exists`);
  process.exit(1);
}

extensions.push({ name, type });

fs.mkdirSync(path.dirname(fullPath), { recursive: true });
fs.writeFileSync(fullPath, JSON.stringify(extensions, null, 2) + '\n');
console.log(`Added extension: ${name} (${type})`);
