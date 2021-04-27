import path from 'path';
import fs from 'fs';

import { ReportOptions, I18NReport } from '../types';
import { parseVueFiles } from './vue-files';
import { parseLanguageFiles, writeMissingToLanguage } from './language-files';
import { extractI18NReport, VueI18NExtractReportTypes, writeReportToFile } from './report';

export function createI18NReport (vueFiles: string, languageFiles: string, command: ReportOptions): I18NReport {
  const resolvedVueFiles = path.resolve(process.cwd(), vueFiles);
  const resolvedLanguageFiles = path.resolve(process.cwd(), languageFiles);

  const parsedVueFiles = parseVueFiles(resolvedVueFiles);
  const parsedLanguageFiles = parseLanguageFiles(resolvedLanguageFiles);

  const reportType = command.dynamic ? VueI18NExtractReportTypes.All : (VueI18NExtractReportTypes.Missing + VueI18NExtractReportTypes.Unused);

  return extractI18NReport(parsedVueFiles, parsedLanguageFiles, reportType);
}

export function reportFromConfigCommand(): Promise<void> | void {
  try {
    const configFile = eval(fs.readFileSync(path.resolve(process.cwd(), 'vue-i18n-extract.config.js'), 'utf8'));
    return reportCommand({
      vueFiles: configFile.vueFilesPath,
      languageFiles: configFile.languageFilesPath,
      ...(configFile.options.output && {output: configFile.options.output }),
      ...(configFile.options.add && { add: Boolean(configFile.options.add) }),
      ...(configFile.options.dynamic && {dynamic: [false, 'ignore', 'report'].findIndex(e => e === configFile.options.dynamic) }),
    });
  } catch (err) {
    console.error(err);
  }
}

export async function reportCommand (command: ReportOptions): Promise<void> {
  const { vueFiles, languageFiles, output, add, dynamic, ci } = command;
  const report = createI18NReport(vueFiles, languageFiles, command);

  if (report.missingKeys) console.info('missing keys: '), console.table(report.missingKeys);
  if (report.unusedKeys) console.info('unused keys: '), console.table(report.unusedKeys);
  if (report.dynamicKeys && dynamic && dynamic > 1) console.info('dynamic detected keys: '), console.table(report.dynamicKeys);

  if (output) {
    await writeReportToFile(report, path.resolve(process.cwd(), output));
    console.log(`The report has been has been saved to ${output}`);
  }

  if (add && report.missingKeys && report.missingKeys.length > 0) {
    const resolvedLanguageFiles = path.resolve(process.cwd(), languageFiles);
    writeMissingToLanguage(resolvedLanguageFiles, report.missingKeys);
    console.log('The missing keys have been added to your languages files');
  }

  if (ci && Object.prototype.hasOwnProperty.call(report, 'missingKeys') && report.missingKeys !== undefined) {
    const exitCode = report.missingKeys.length > 0 ? 1 : 0;
    console.log(`[vue-i18n-extract] ${report.missingKeys.length} missing keys found.`);
    process.exit(exitCode);
  }
}

export * from './vue-files';
export * from './language-files';
export * from './report';
