import path from 'path';
import { reportCommand, reportFromConfigCommand } from '@/report-command';
import { ReportOptions } from '@/types';
import { expectedI18NReport } from '../ZZ_fixtures/expected-values';
import { vueFiles, languageFiles } from '../ZZ_fixtures/resolved-sources';
import * as report from '@/report-command/report';
import * as languageFileActions from '@/report-command/language-files';

describe('file: report-command/index', () => {
  describe('function: reportCommand', () => {
    let consoleTableSpy: jest.SpyInstance<unknown>;
    let consoleLogSpy: jest.SpyInstance<unknown>;
    let consoleInfoSpy: jest.SpyInstance<unknown>;
    let command: ReportOptions;


    beforeEach(() => {
      command = {
        vueFiles,
        languageFiles,
      }

      consoleTableSpy = jest.spyOn(console, 'table');
      consoleLogSpy = jest.spyOn(console, 'log');
      consoleInfoSpy = jest.spyOn(console, 'info');
      consoleTableSpy.mockImplementation(() => jest.fn());
      consoleLogSpy.mockImplementation(() => jest.fn());
      consoleInfoSpy.mockImplementation(() => jest.fn());
    });

    it('Log report to console', () => {
      reportCommand(command);
      expect(consoleTableSpy).toHaveBeenCalledTimes(2);
      expect(consoleTableSpy.mock.calls[0][0]).toEqual(expectedI18NReport.missingKeys);
      expect(consoleTableSpy.mock.calls[1][0]).toEqual(expectedI18NReport.unusedKeys);
    });

    it('Write report to file at output path', async () => {
      command.output = './test';
      const writeReportSpy: jest.SpyInstance<unknown> = jest.spyOn(report, 'writeReportToFile');
      writeReportSpy.mockImplementation(() => jest.fn());
      await reportCommand(command);
      expect(writeReportSpy).toHaveBeenCalledWith(
        expectedI18NReport,
        path.resolve(process.cwd(), command.output),
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(`The report has been has been saved to ${command.output}`)
    });

    it('Write missing keys to language files', async () => {
      command.add = true;
      const writeMissingSpy: jest.SpyInstance<unknown> = jest.spyOn(languageFileActions, 'writeMissingToLanguage');
      writeMissingSpy.mockImplementation(() => jest.fn());
      await reportCommand(command);
      expect(writeMissingSpy).toHaveBeenCalledWith(
        command.languageFiles,
        expectedI18NReport.missingKeys,
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(`The missing keys have been added to your languages files`)
    });
  });
});
