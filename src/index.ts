import yargs from 'yargs';
import VueI18NExtract from './Api';
import { I18NReport } from './library/models';
import path from 'path';
import fs from 'fs';

const api = new VueI18NExtract();

const vueFilesOptions: yargs.Options = {
  // tslint:disable-next-line:max-line-length
  describe: 'The Vue.js file(s) you want to extract i18n strings from. It can be a path to a folder or to a file. It accepts glob patterns. (ex. *, ?, (pattern|pattern|pattern)',
  demand: true,
  alias: 'v',
};

const languageFilesOptions: yargs.Options = {
  // tslint:disable-next-line:max-line-length
  describe: 'The language file(s) you want to compare your Vue.js file(s) to. It can be a path to a folder or to a file. It accepts glob patterns (ex. *, ?, (pattern|pattern|pattern) ',
  demand: true,
  alias: 'l',
};

const outputOptions: yargs.Options = {
  // tslint:disable-next-line:max-line-length
  describe: 'Use if you want to create a json file out of your report. (ex. -o output.json)',
  demand: false,
  alias: 'o',
};

const argv = yargs
.command('report', 'Create a report from a glob of your Vue.js source files and your language files.', {
  vueFiles: vueFilesOptions,
  languageFiles: languageFilesOptions,
  output: outputOptions,
})
.help()
.demandCommand(1, '')
.showHelpOnFail(true);

export async function run (): Promise<any> {
  const command = argv.argv;

  switch (command._[0]) {
    case 'report':
      report(command);
      break;
  }
}

async function report (command: any): Promise<any> {
  const { vueFiles, languageFiles, output } = command;

  const resolvedVueFiles = path.resolve(process.cwd(), vueFiles);
  const resolvedLanguageFiles = path.resolve(process.cwd(), languageFiles);

  const i18nReport: I18NReport = await api.createI18NReport(resolvedVueFiles, resolvedLanguageFiles);
  api.logI18NReport(i18nReport);

  if (output) {
    const reportString = JSON.stringify(i18nReport);
    fs.writeFile(
      path.resolve(process.cwd(), output),
      JSON.stringify(i18nReport),
      (err) => {
        if (err) {
          throw err;
        }
        // tslint:disable-next-line
        console.log(`The report has been has been saved to ${output}`);
      }
    );
  }
}

export default api;