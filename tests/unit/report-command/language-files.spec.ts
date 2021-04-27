import path from 'path';
import fs from 'fs';
import dot from 'dot-object';
import { parseLanguageFiles, writeMissingToLanguage } from '@/report-command/language-files';
import { expectedFromParsedLanguageFiles, expectedI18NReport } from '../ZZ_fixtures/expected-values';
import { languageFiles } from '../ZZ_fixtures/resolved-sources';

describe('file: report-command/language-files', () => {
  describe('function: parseLanguageFiles', () => {
    it('Parse the file glob into and I18NLanguage object', () => {
      const results = parseLanguageFiles(languageFiles);
      expect(results).toEqual(expectedFromParsedLanguageFiles);
    });

    it('Throws an error if it is not a valid glob', () => {
      const brokenLanguageSource = '';
      expect(() => parseLanguageFiles(brokenLanguageSource)).toThrow(`languageFiles isn't a valid glob pattern.`);
    });

    it('Throws an error if it does not find any file', () => {
      const brokenLanguageSource = path.resolve(__dirname, '../fixtures/language-files/**/*.txt');
      expect(() => parseLanguageFiles(brokenLanguageSource)).toThrow('languageFiles glob has no files.');
    });
  });

  describe('function: writeMissingToLanguage', () => {
    let writeFileSyncSpy: jest.SpyInstance<unknown>;

    beforeEach(() => {
      writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync');
      writeFileSyncSpy.mockImplementation(() => jest.fn());
    });

    it('Create fails if language files are not valid JSON', () => {
      const dotStrSpy = jest.spyOn(dot, 'str');
      writeMissingToLanguage(languageFiles, expectedI18NReport.missingKeys);
      expect(dotStrSpy).toHaveBeenCalledTimes(99);
      expect(writeFileSyncSpy).toHaveBeenCalledTimes(4);
      expect(writeFileSyncSpy.mock.calls[0][1]).toContain('missing');
    });
  });
})

