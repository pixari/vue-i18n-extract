#!/usr/bin/env node
// vim: set filetype=javascript:
 /* eslint-disable */
'use strict';
const program = require('commander');
const { reportCommand } = require('../dist/vue-i18n-extract.umd.js');

function increaseDynamic(dummyValue, previous) {
  return previous + 1;
}

program
  .command('report', { isDefault: true })
  .description('Create a report from a glob of your Vue.js source files and your language files.')
  .requiredOption(
    '-v, --vueFiles <vueFiles>',
    'The Vue.js file(s) you want to extract i18n strings from. It can be a path to a folder or to a file. It accepts glob patterns. (ex. *, ?, (pattern|pattern|pattern)',
  )
  .requiredOption(
    '-l, --languageFiles <languageFiles>',
    'The language file(s) you want to compare your Vue.js file(s) to. It can be a path to a folder or to a file. It accepts glob patterns (ex. *, ?, (pattern|pattern|pattern) ',
  )
  .option(
    '-o, --output <output>',
    'Use if you want to create a json file out of your report. (ex. -o output.json)',
  )
  .option(
    '-a, --add',
    'Use if you want to add missing keys into your json language files.',
  )
  .option(
    '-d, --dynamic',
    'Use if you want to ignore dynamic keys false-positive. Use it 2 times to get dynamic keys report',
    increaseDynamic,
    0
  )
  .option(
    '-s, --separator <separator>',
    'Use if you want to override the separator used when parsing locale identifiers. Default is `.`'
  )
  .action(reportCommand);

program.parseAsync(process.argv);
