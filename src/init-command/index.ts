import fs from 'fs';
import path from 'path';

export function initCommand(): void {
  fs.writeFileSync(
    path.resolve(process.cwd(), './vue-i18n-extract.config.js'),
    fs.readFileSync(path.resolve(__dirname, './vue-i18n-extract.config.js'), 'utf8'),
  );
}

