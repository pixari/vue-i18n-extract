import { parseVueFiles } from '@/report-command/vue-files';
import { expectedFromParsedVueFiles } from '../ZZ_fixtures/expected-values';
import { vueFiles } from '../ZZ_fixtures/resolved-sources';
import path from 'path';

describe('file: report-command/vue-files', () => {
  describe('function: parseVueFiles', () => {
    it('Parse the file glob into and I18Nvue object', () => {
      const results = parseVueFiles(vueFiles);
      expect(results).toEqual(expectedFromParsedVueFiles);
    });

    it('Throws an error if it is not a valid glob', () => {
      const breakingVueFiles = '';
      expect(() => parseVueFiles(breakingVueFiles)).toThrow(`vueFiles isn't a valid glob pattern.`);
    });

    it('Throws an error if it does not find any file', () => {
      const breakingVueFiles = path.resolve(__dirname, '../fixtures/vue-files/**/*.txt');
      expect(() => parseVueFiles(breakingVueFiles)).toThrow('vueFiles glob has no files.');
    });
  });
})

