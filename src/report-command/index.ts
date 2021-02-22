import path from 'path';
import Dot from 'dot-object';

import { ReportOptions, I18NReport } from '../types';
import { parseVueFiles } from './vue-files';
import { parseLanguageFiles, writeMissingToLanguage } from './language-files';
import { extractI18NReport, VueI18NExtractReportTypes, writeReportToFile } from './report';

export function createI18NReport (vueFiles: string, languageFiles: string, command: ReportOptions, dot: DotObject.Dot = Dot): I18NReport {
  const resolvedVueFiles = path.resolve(process.cwd(), vueFiles);
  const resolvedLanguageFiles = path.resolve(process.cwd(), languageFiles);

  const parsedVueFiles = parseVueFiles(resolvedVueFiles);
  const parsedLanguageFiles = parseLanguageFiles(resolvedLanguageFiles, dot);

  const reportType = command.dynamic ? VueI18NExtractReportTypes.All : (VueI18NExtractReportTypes.Missing + VueI18NExtractReportTypes.Unused);

  return extractI18NReport(parsedVueFiles, parsedLanguageFiles, reportType);
}

export async function reportCommand (command: ReportOptions): Promise<void> {
  const { vueFiles, languageFiles, output, add, dynamic } = command;

  const dot = typeof command.separator === 'string' ? new Dot(command.separator) : Dot
  const report = createI18NReport(vueFiles, languageFiles, command, dot);

  if (report.missingKeys) console.info('missing keys: '), console.table(report.missingKeys);
  if (report.unusedKeys) console.info('unused keys: '), console.table(report.unusedKeys);
  if (report.dynamicKeys && dynamic && dynamic > 1) console.info('dynamic detected keys: '), console.table(report.dynamicKeys);

  if (output) {
    await writeReportToFile(report, path.resolve(process.cwd(), output));
    console.log(`The report has been has been saved to ${output}`);
  }

  if (add && report.missingKeys && report.missingKeys.length > 0) {
    const resolvedLanguageFiles = path.resolve(process.cwd(), languageFiles);
    writeMissingToLanguage(resolvedLanguageFiles, report.missingKeys, dot);
    console.log('The missing keys have been added to your languages files');
  }
}

export * from './vue-files';
export * from './language-files';
export * from './report';
