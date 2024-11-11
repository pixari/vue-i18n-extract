#!/usr/bin/env node
// vim: set filetype=javascript:
 /* eslint-disable */
'use strict';
const cli = require('cac')();
const { createI18NReport, initCommand, resolveConfig } = require('../dist/vue-i18n-extract.umd.js');

cli
  .command('', 'Create a report from a glob of your Vue.js source files and your language files.')
  .option(
    '--vueFiles <vueFiles>',
    '[string] The Vue.js file(s) you want to extract i18n strings from. It can be a path to a folder or to a file. It accepts glob patterns. (ex. *, ?, (pattern|pattern|pattern)',
  )
  .option(
    '--languageFiles <languageFiles>',
    '[string] The language file(s) you want to compare your Vue.js file(s) to. It can be a path to a folder or to a file. It accepts glob patterns (ex. *, ?, (pattern|pattern|pattern) ',
  )
  .option(
    '--output [output]',
    '[string] Use if you want to create a json file out of your report. (ex. --output output.json)',
  )
  .option(
    '--add',
    '[boolean] Use if you want to add missing keys into your json language files.',
  )
  .option(
    '--remove',
    '[boolean] Use if you want to remove unused keys from your json language files.',
  )
  .option(
    '--ci',
    '[boolean] The process will exit with exitCode=1 if at least one translation-key is missing (useful expecially if it is part of a CI pipeline).',
  )
  .option(
    '--separator <separator>',
    'Use if you want to override the separator used when parsing locale identifiers. Default is `.`'
   )
  .option(
    '--exclude <key>',
    'Use if you want to exclude a key. It can be used multiple times to exclude any amount of keys on the output'
   )
  .option(
    '--noEmptyTranslation',
    'Use if you want to generate a default translated string by using the key itself'
   )
  .option(
    '--missingTranslationString',
    'Default string for missing translations.'
   )
  .option(
    '--jsonIndentation',
    'Indentation to be used when writing JSON files.'
   )
   .option(
    '--detect <detectionType>',
    '[string] The type of issues you want to detect (ex. --detect missing) ',
  )
  .action((options) => {
    createI18NReport(resolveConfig(options));
  });

cli
  .command('init', 'Create a default vue-i18n-extract config file.')
  .action(initCommand);

cli.help();
cli.version(require('../package.json').version);
cli.parse();
