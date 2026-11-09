// auto_generated: false
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const files = fs.readdirSync(root).filter(f => f.endsWith('.js')).concat(fs.readdirSync(path.join(root, 'decks')).filter(f => f.endsWith('.js')).map(f => 'decks/' + f));
for (const file of files) execFileSync(process.execPath, ['--check', path.join(root, file)], { stdio: 'inherit' });
console.log(files.length + ' JavaScript-Dateien: Syntax korrekt.');
