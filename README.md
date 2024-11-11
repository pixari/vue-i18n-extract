<h1 align="center">
  <a href="https://github.com/Spittal/vue-i18n-extract"><img align="center" width="70%"src=".github/img/vue-18n-extract-logo.png" alt="vue-i18n-logo"></a>
</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/vue-i18n-extract"><img src="https://img.shields.io/npm/v/vue-i18n-extract.svg?style=flat-square" alt="NPM Version"></a>
  <a href="https://www.npmjs.com/package/vue-i18n-extract"><img src="https://img.shields.io/npm/dm/vue-i18n-extract.svg?style=flat-square" alt="Downloads"></a>
  <a href="https://snyk.io/test/github/Spittal/vue-i18n-extract?targetFile=package.json"><img src="https://snyk.io/test/github/Spittal/vue-i18n-extract/badge.svg?targetFile=package.json" alt="Known Vulnerabilities"></a>
  <a href="https://codeclimate.com/github/Spittal/vue-i18n-extract/maintainability"><img src="https://api.codeclimate.com/v1/badges/d21f341c33b2bfb6fe0e/maintainability" alt="Maintainability"></a>
  <img src="https://github.com/Spittal/vue-i18n-extract/workflows/Test/badge.svg?branch=master" alt="Tests">
</p>

`vue-i18n-extract` is built to work with your Vue.js projects using the library [vue-i18n](https://kazupon.github.io/vue-i18n/). It runs static analysis on your Vue.js source code looking for any `vue-i18n` usage, in order to:

- Report all **missing keys** in your language files.
- Report all **unused keys** in your language files.
- Optionally write every missing key into your language files.

<p align="center">
  <img align="center" width="80%" src=".github/img/vue-i18n-extract-screenshot.png">
</p>

## Content

- [Usage](#usage)
  - [From the command line](#from-the-command-line)
  - [As part of a project](#as-part-of-a-project)
  - [As part of a Node.js script](#as-part-of-a-node.js-script)
- [Configuration](#configuration)
  - [`vueFiles`](#vuefiles)
  - [`languageFiles`](#languagefiles)
  - [`output`](#output)
  - [`add`](#add)
  - [`remove`](#remove)
  - [`ci`](#ci)
  - [`separator`](#separator)
  - [`exclude`](#exclude)
  - [`noEmptyTranslation`](#noemptytranslation)
  - [`missingtranslationstring`](#missingtranslationstring)
  - [`jsonIndentation`](#jsonIndentation)
- [Supported `vue-i18n` Formats](#supported-vue-i18n-formats)
- [Why?](#why)
- [Contribution](#contribution)
- [License](#license)

## Usage

### From the command line

Run from the command line:

```sh
npx vue-i18n-extract report --vueFiles './path/to/source-files/**/*.?(js|vue)' --languageFiles './path/to/language-files/*.?(json|yml|yaml)'
```

### As part of a project

Install the package in your project:

```sh
npm install --save-dev vue-i18n-extract
```

Use it via an npm script in your `package.json` file:

```json
{
  "scripts": {
    "vue-i18n-extract": "vue-i18n-extract report --vueFiles './path/to/source-files/**/*.?(js|vue)' --languageFiles './path/to/language-files/*.?(json|yml|yaml|js)'"
  }
}
```

Finally, run:

```sh
npm run vue-i18n-extract
```

This will print out a table of missing keys in your language files, as well as unused keys in your language files.

### As part of a Node.js script

Install the package in your project:

```sh
npm install --save-dev vue-i18n-extract
```

Import the module and use it like this:

```js
const VueI18NExtract = require('vue-i18n-extract');

const report = VueI18NExtract.createI18NReport({
  vueFiles: './path/to/vue-files/**/*.?(js|vue)',
  languageFiles: './path/to/language-files/*.?(json|yml|yaml|js)',
});
```

## Configuration

You can use the following configuration options via the vue-i18n-extract command line utility or a `vue-i18n-extract.config.js` configuration file.

You can generate a default configuration file using `npx vue-i18n-extract init` (it uses the following options: [`vue-i18n-extract.config.ts`](src/config-file/vue-i18n-extract.config.ts)). Once you have a configuration file, you can run `npx vue-i18n-extract`.

### `vueFiles`

* Name: `vueFiles`
* CLI argument: `--vue-files`, `--vueFiles`
* Required: Yes
* Type: `string`
* Description: A path to the directory of files from which you want to extract translation keys from. Can be a path to a file. Can include glob patterns (using [glob](https://www.npmjs.com/package/glob)). **Note for Windows users**: use forward slashes in paths.
* Examples:
  * `./path/to/source-files/**/*.?(js|vue)`
  * `./tests/fixtures/**/*.?(vue|js)`

### `languageFiles`

* Name: `languageFiles`
* CLI argument: `--language-files`, `--languageFiles`
* Required: Yes
* Type: `string`
* Description: The language file(s) you want to compare your source file(s) to. It can be a path to a folder or a file. Can include glob patterns (using [glob](https://www.npmjs.com/package/glob)). **Note for Windows users**: use forward slashes in paths.
* Examples:
  * `./path/to/language-files/*.?(json|yml|yaml)`
  * `./tests/fixtures/lang/**/*.json`

### `output`

* Name: `output`
* CLI argument: `--output`
* Required: No
* Default: — (no report is saved by default)
* Type: `string`
* Description: Saves a report in JSON format containing all missing and unused translation keys at the given file path (the directory must exist for this to work).
* Examples:
  * `output.json`

### `add`

* Name: `add`
* CLI argument: `--add`
* Required: No
* Default: `false`
* Type: `boolean`
* Description: Adds missing translation keys to your language files.

### `remove`

* Name: `remove`
* CLI argument: `--remove`
* Required: No
* Default: `false`
* Type: `boolean`
* Description: Removes unused translation keys to your language files.

### `ci`

* Name: `ci`
* CLI argument: `--ci`
* Required: No
* Default: `false`
* Type: `boolean`
* Description: Causes the process to exit with exit code 1 if at least one translation key is missing or unused (useful if it is part of a CI pipeline).

### `separator`

* Name: `separator`
* CLI argument: `--separator`
* Required: No
* Default: `'.'`
* Type: `string`
* Description: Changes the default separator used in translation keys for nested translation paths.

### `exclude`

* Name: `exclude`
* CLI argument: `--exclude`
* Required: No
* Default: `[]`
* Type: `string` or array of `string`s
* Description: Excludes the provided translation keys from the report. When using sub segments of dot notation paths (e.g. `company.meta` in `company.meta.motto`), the entire node of the object indicated by the sub segment will be excluded.
* Examples:
  * Configuration option: `exclude: ['translation_key_1', 'translation_key_2']`
  * CLI argument: `--exclude translation_key_1 --exclude translation_key_2`

### `detect`

* Name: `detect`
* CLI argument: `--detect`
* Required: No
* Default: `['missing', 'unused', 'dynamic']`
* Type: `string` or array of `string`s
* Description: Defines what do detect (and include) in the report.
* Examples:
  * Configuration option: `detect: ['missing', 'unused']`
  * CLI argument: `--detect missing --detect unused`

### `noEmptyTranslation`

* Name: `noEmptyTranslation`
* CLI argument: `--no-empty-translation`, `--noEmptyTranslation`
* Required: No
* Default: `''`
* Type: `string`
* Description: Generates a default translation for each translation key with no translation. The default translation will be the translation key itself.
* Examples:
  * `'*'`: Generate empty default translation for all locales.
  * `'en'`: Generate empty default translation for locale `'en'`.
  * `'en-US'`: Generate empty default translation for locale `'en-US'`.

### `missingTranslationString`

* Name: `missingTranslationString`
* CLI argument: `--missing-translation-string`, `--missingTranslationString`
* Required: No
* Default: `''`
* Type: `string` or `null`
* Description: Text to use when missing translations are added to the translation files.
* Examples:
  * `'Translation missing'`: Use "Translation missing" as default key.
  * `null`: Add the translation key to the file, but don't add a default translation. This will trigger `vue-i18n`'s the missingHandler.

### `jsonIndentation`

* Name: `jsonIndentation`
* CLI argument: `--json-indentation`, `--jsonIndentation`
* Required: No
* Default: `2`
* Type: `number` or `null`
* Description: Number of spaces to use when writing JSON files.
* Examples:
  * `4`

## Supported `vue-i18n` Formats

- Static in template or script:
```js
// Single or double quote, and template literals
$t('key.static') $t("key.static") $t(`key.static`)

// Without dollar sign
t('key.static') t("key.static") t(`key.static`)

// $tc Support for use with plurals
$tc('key.static', 0) $tc("key.static", 1) $tc(`key.static`, 2)

// Without dollar sign
tc('key.static', 0) tc("key.static", 1) tc(`key.static`, 2)
```

- i18n component:
```html
<i18n path="key.component"></i18n>
<i18n-t keypath="key.component"></i18n-t>
<Translate keypath="key.component"></Translate>
```

> Note: As of right now there is no support for binding in a path like `:path="condition ? 'string1' : 'string2'"` there is just support for strings as shown above.

- i18n component in code:
```js
const TranslationComponentInCode = h(Translation, {
  keypath: 'Translation component in code.',
  tag: 'p',
});
```

- v-t directive with string literal:
```html
<p v-t="'key.directive'"></p>
<p v-t.preserve="'key.directive'"></p>
```
> Note: As of right now there is no object support to reference a path from component data.

## Why?

Setting up a Vue.js app with internationalization (i18n) support is easy nowadays: Once you have installed the plugin and injected into the Vue instance, you can just put `$t('Hello World')` inside Vue.js component templates to use the plugin.
However, in our personal experience we found it very difficult to keep the language files and the `.vue` files in sync.

That's why we wrote `vue-i18n-extract`. We needed a way to analyze and compare our language files to our Vue.js source files, then report the result in a useful way.

## Contribution

Please make sure to read the [Contributing Guide](.github/CONTRIBUTING.md) before making a pull request.

## License

[MIT](http://opensource.org/licenses/MIT)
