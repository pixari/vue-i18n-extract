import fs from 'fs';
import { extractI18NReport, writeReportToFile } from '@/report-command/report';
import { parseVueFiles } from '@/report-command/vue-files';
import { parseLanguageFiles } from '@/report-command/language-files';
import { expectedI18NReport } from '../ZZ_fixtures/expected-values';
import { vueFiles, languageFiles } from '../ZZ_fixtures/resolved-sources';
import { I18NReport, I18NLanguage, I18NItem } from '@/types';

describe('file: report-command/report', () => {
  let parsedVueFiles: I18NItem[];
  let parsedLanguageFiles: I18NLanguage;
  let report: I18NReport;

  beforeAll(() => {
    parsedVueFiles = parseVueFiles(vueFiles);
    parsedLanguageFiles = parseLanguageFiles(languageFiles);
    report = extractI18NReport(parsedVueFiles, parsedLanguageFiles);
  });

  describe('function: extractI18NReport', () => {
    it('Generate accurate report', () => {
      expect(report).toEqual(expectedI18NReport);
    });
  });

  describe('function: writeReportToFile', () => {
    it('Write report to specified file output path', async () => {
      const outputPath = './path/to/output.json';

      const spyWriteFile = jest.spyOn(fs, 'writeFile');
      spyWriteFile.mockImplementationOnce((writePath, reportString, callback) => {
        callback(null);
      });

      await writeReportToFile(report, outputPath);

      expect(spyWriteFile).toHaveBeenCalledTimes(1);
      expect(spyWriteFile.mock.calls[0][0]).toEqual(outputPath);
      expect(spyWriteFile.mock.calls[0][1]).toEqual(JSON.stringify(report));
    });
  });
});
