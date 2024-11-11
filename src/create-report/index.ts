import path from 'path';
import { ReportOptions, I18NReport, DetectionType } from '../types';
import { readVueFiles, extractI18NItemsFromVueFiles } from './vue-files';
import { readLanguageFiles, extractI18NLanguageFromLanguageFiles, removeUnusedFromLanguageFiles, writeMissingToLanguageFiles } from './language-files';
import { extractI18NReport,  writeReportToFile } from './report';
import Dot from 'dot-object';

export async function createI18NReport (options: ReportOptions): Promise<I18NReport> {
  const {
    vueFiles: vueFilesGlob,
    languageFiles: languageFilesGlob,
    output,
    add,
    remove,
    exclude = [],
    ci,
    separator,
    noEmptyTranslation = '',
    missingTranslationString = '',
    jsonIndentation = 2,
    detect = [DetectionType.Missing, DetectionType.Unused, DetectionType.Dynamic]
  } = options;

  if (!vueFilesGlob) throw new Error('Required configuration vueFiles is missing.');
  if (!languageFilesGlob) throw new Error('Required configuration languageFiles is missing.');

  let issuesToDetect = Array.isArray(detect) ? detect : [detect];
  const invalidDetectOptions = issuesToDetect.filter(item => !Object.values(DetectionType).includes(item));
  if (invalidDetectOptions.length) {
    throw new Error(`Invalid 'detect' value(s): ${invalidDetectOptions}`);
  }

  const dot = typeof separator === 'string' ? new Dot(separator) : Dot;
  const vueFiles = readVueFiles(path.resolve(process.cwd(), vueFilesGlob));
  const languageFiles = readLanguageFiles(path.resolve(process.cwd(), languageFilesGlob));

  const I18NItems = extractI18NItemsFromVueFiles(vueFiles);
  const I18NLanguage = extractI18NLanguageFromLanguageFiles(languageFiles, dot);

  const report = extractI18NReport(I18NItems, I18NLanguage, issuesToDetect);

  report.unusedKeys = report.unusedKeys.filter(key =>
      !exclude.filter(excluded => key.path.startsWith(excluded)).length)

  if (report.missingKeys.length) console.info('\nMissing Keys'), console.table(report.missingKeys);
  if (report.unusedKeys.length) console.info('\nUnused Keys'), console.table(report.unusedKeys);
  if (report.maybeDynamicKeys.length) console.warn('\nSuspected Dynamic Keys Found\nvue-i18n-extract does not compile Vue templates and therefore can not infer the correct key for the following keys.'), console.table(report.maybeDynamicKeys);

  if (output) {
    await writeReportToFile(report, path.resolve(process.cwd(), output));
    console.info(`\nThe report has been has been saved to ${output}`);
  }

  if (remove && report.unusedKeys.length) {
    removeUnusedFromLanguageFiles(languageFiles, report.unusedKeys, dot);
    console.info('\nThe unused keys have been removed from your language files.');
  }

  if (add && report.missingKeys.length) {
    writeMissingToLanguageFiles(languageFiles, report.missingKeys, dot, noEmptyTranslation, missingTranslationString, jsonIndentation);
    console.info('\nThe missing keys have been added to your language files.');
  }

  if (ci && report.missingKeys.length) {
    throw new Error(`${report.missingKeys.length} missing keys found.`);
  }

  if (ci && report.unusedKeys.length) {
    throw new Error(`${report.unusedKeys.length} unused keys found.`);
  }

  return report;
}

export * from './vue-files';
export * from './language-files';
export * from './report';
