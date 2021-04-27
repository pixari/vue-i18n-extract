<h1 align="center">
  <a href="https://github.com/pixari/vue-i18n-extract"><img align="center" width="70%"src=".github/img/vue-18n-extract-logo.png" alt="vue-i18n-logo"></a>
</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/vue-i18n-extract"><img src="https://img.shields.io/npm/v/vue-i18n-extract.svg?style=flat-square" alt="NPM Version"></a>
  <a href="https://www.npmjs.com/package/vue-i18n-extract"><img src="https://img.shields.io/npm/dm/vue-i18n-extract.svg?style=flat-square" alt="Downloads"></a>
  <a href="https://snyk.io/test/github/pixari/vue-i18n-extract?targetFile=package.json"><img src="https://snyk.io/test/github/pixari/vue-i18n-extract/badge.svg?targetFile=package.json" alt="Known Vulnerabilities"></a>
  <a href="https://codeclimate.com/github/pixari/vue-i18n-extract/maintainability"><img src="https://api.codeclimate.com/v1/badges/d21f341c33b2bfb6fe0e/maintainability" alt="Maintainability"></a>
  <img src="https://github.com/pixari/vue-i18n-extract/workflows/Test/badge.svg?branch=master" alt="Tests">
</p>

`vue-i18n-extract` is built to work with your Vue.js projects using the library [vue-i18n](https://kazupon.github.io/vue-i18n/). It run static analysis on your Vue.js source code looking for any `vue-i18n` usage, in order to:

- Report all **missing keys** in your language files.
- Report all **unused keys** in your language files.
- Optionally write every **missing keys** into your language files.

<p align="center">
  <img align="center" width="80%" src=".github/img/vue-i18n-extract-screenshot.png">
</p>

# Usage

You can run `vue-i18n-extract` with npx

```sh
npx vue-i18n-extract report -v './path/to/your/vue-files/**/*.?(js|vue)' -l './path/to/your/language-files/*.?(json|yml|yaml)'
```

**Or** you can download into your project and run as an `package.json` script.

```sh
npm install --save-dev vue-i18n-extract
```

Add the following section to your `package.json`:
```json
{
  "scripts": {
    "vue-i18n-extract": "vue-i18n-extract report -v './path/to/your/vue-files/**/*.?(js|vue)' -l './path/to/your/language-files/*.?(json|yml|yaml|js)'"
  }
}
```

Finally, run:

```sh
npm run vue-i18n-extract
```

This will print out a table of missing keys in your language files, as well as unused keys in your language files.

# Config

```js
-v, --vueFiles (required)
// The Vue.js file(s) you want to extract i18n strings from. It can be a path to a folder or to a file. It accepts glob patterns. Example: ./path/to/your/vue-files/**/*.?(js|vue)

-l, --languageFiles (required)
// The language file(s) you want to compare your Vue.js file(s) to. It can be a path to a folder or to a file. It accepts glob patterns. Example: ./path/to/your/language-files/*.?(json|yml|yaml)

-o, --output
// Use if you want to create a json file out of your report. Example: `-o output.json`

-a, --add
// Use if you want to add missing keys into your language files.

-d, --dynamic
// Use if you want to add missing keys into your language files.

--ci
// The process will exit with exitCode=1 if at least one translation key is missing (useful if it is part of a CI pipeline).
```

## Config File

Optionally you can add a `vue-i18n-extract.config.js` file to the root of your project. Run `npx vue-i18n-extract init` to quickly bootstrap a config file. Available configuration is found [here](src/init-command/vue-i18n-extract.config.js)

# Supported `vue-i18n` Formats

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
```
> Note: As of right now there is no support for binding in path like `:path="condition ? 'string1' : 'string2'"` there is just support strings as shown above.

- v-t directive with string literal:
```html
<p v-t="'key.directive'"></p>
```
> Note: As of right now there is no object support to reference that path from component data.

# Usage in NodeJS
Make sure you have `vue-i18n-extract` installed locally and import the library.

```js
const VueI18NExtract = require('vue-i18n-extract');

const report = VueI18NExtract.createI18NReport('./path/to/vue-files/**/*.?(js|vue)', './path/to/language-files/*.?(json|yml|yaml|js)');
```

# Why?

Setting up a Vue.js app with internationalization (i18n) support is easy nowadays: Once you have installed the plugin and injected into the Vue instance, you can just put `$t(‘Hello World’)` inside Vue.js component templates to use the plugin.
However, in our personal experience we found it very difficult to keep the language files and the `.vue` files in sync.

That's why we wrote `vue-i18n-extract`. We needed a way to analyze and compare our language files to our Vue.js source files, then report the result in a useful way.
# Contribution

Please make sure to read the [Contributing Guide](.github/CONTRIBUTING.md) before making a pull request.

# License

[MIT](http://opensource.org/licenses/MIT)

<h2>Core Team</h2>

<table>
  <tbody>
    <tr>
      <td align="center" valign="top">
        <img width="150" height="150" src="https://github.com/Spittal.png?s=150">
        <br>
        <a href="https://github.com/Spittal">Jamie Spittal</a>
      </td>
      <td align="center" valign="top">
        <img width="150" height="150" src="https://github.com/Pixari.png?s=150">
        <br>
        <a href="https://github.com/Pixari">Raffaele Pizzari</a>
      </td>
     </tr>
  </tbody>
</table>
