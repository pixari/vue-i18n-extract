import path from 'path';
import fs from 'fs';
import glob from 'glob';
import Dot from 'dot-object';
import yaml from 'js-yaml';
import isValidGlob from 'is-valid-glob';
import { SimpleFile, I18NLanguage, I18NItem } from '../types';

function readLangFiles (src: string): SimpleFile[] {
  if (!isValidGlob(src)) {
    throw new Error(`languageFiles isn't a valid glob pattern.`);
  }

  const targetFiles = glob.sync(src);

  if (targetFiles.length === 0) {
    throw new Error('languageFiles glob has no files.');
  }

  return targetFiles.map(f => {
    const langPath = path.resolve(process.cwd(), f);

    const extension = langPath.substring(langPath.lastIndexOf('.')).toLowerCase();
    const isJSON = extension === '.json';
    const isYAML = extension === '.yaml' || extension === '.yml';

    let langObj;
    if (isJSON) {
      langObj = JSON.parse(fs.readFileSync(langPath, 'utf8'));
    } else if (isYAML) {
      langObj = yaml.safeLoad(fs.readFileSync(langPath, 'utf8'));
    } else {
      langObj = eval(fs.readFileSync(langPath, 'utf8'));
    }

    const fileName = f.replace(process.cwd(), '');

    return { fileName, path: f, content: JSON.stringify(langObj) };
  });
}

function extractI18nItemsFromLanguageFiles (languageFiles: SimpleFile[], dot: DotObject.Dot = Dot): I18NLanguage {
  return languageFiles.reduce((accumulator, file) => {
    const language = file.fileName.substring(file.fileName.lastIndexOf('/') + 1, file.fileName.lastIndexOf('.'));

    if (!accumulator[language]) {
      accumulator[language] = [];
    }

    const flattenedObject = dot.dot(JSON.parse(file.content));
    Object.keys(flattenedObject).forEach((key, index) => {
      accumulator[language]?.push({
        line: index,
        path: key,
        file: file.fileName,
      });
    });

    return accumulator;
  }, {});
}

export function writeMissingToLanguage (resolvedLanguageFiles: string, missingKeys: I18NItem[], dot: DotObject.Dot = Dot): void {
  const languageFiles = readLangFiles(resolvedLanguageFiles);
  languageFiles.forEach(languageFile => {
    const languageFileContent = JSON.parse(languageFile.content);

    missingKeys.forEach(item => {
      if (item.language && languageFile.fileName.includes(item.language) || !item.language) {
        dot.str(item.path, '', languageFileContent);
      }
    });

    const fileExtension = languageFile.fileName.substring(languageFile.fileName.lastIndexOf('.') + 1);
    const filePath = languageFile.path;
    const stringifiedContent = JSON.stringify(languageFileContent, null, 2);

    if (fileExtension === 'json') {
      fs.writeFileSync(filePath, stringifiedContent);
    } else if (fileExtension === 'js') {
      const jsFile = `export default ${stringifiedContent}; \n`;
      fs.writeFileSync(filePath, jsFile);
    } else if (fileExtension === 'yaml' || fileExtension === 'yml') {
      const yamlFile = yaml.safeDump(languageFileContent);
      fs.writeFileSync(filePath, yamlFile);
    }
  });
}

export function parseLanguageFiles (languageFilesPath: string, dot: DotObject.Dot = Dot): I18NLanguage {
  const filesList = readLangFiles(languageFilesPath);
  return extractI18nItemsFromLanguageFiles(filesList, dot);
}
