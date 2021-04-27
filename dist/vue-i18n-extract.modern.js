import fs from 'fs';
import path from 'path';
import isValidGlob from 'is-valid-glob';
import glob from 'glob';
import dot from 'dot-object';
import yaml from 'js-yaml';

function initCommand() {
  fs.writeFileSync(path.resolve(process.cwd(), './vue-i18n-extract.config.js'), fs.readFileSync(path.resolve(__dirname, './vue-i18n-extract.config.js'), 'utf8'));
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function readVueFiles(src) {
  if (!isValidGlob(src)) {
    throw new Error(`vueFiles isn't a valid glob pattern.`);
  }

  const targetFiles = glob.sync(src);

  if (targetFiles.length === 0) {
    throw new Error('vueFiles glob has no files.');
  }

  return targetFiles.map(f => {
    const fileName = f.replace(process.cwd(), '');
    return {
      fileName,
      path: f,
      content: fs.readFileSync(f, 'utf8')
    };
  });
}

function* getMatches(file, regExp, captureGroup = 1) {
  while (true) {
    const match = regExp.exec(file.content);

    if (match === null) {
      break;
    }

    const line = (file.content.substring(0, match.index).match(/\n/g) || []).length + 1;
    yield {
      path: match[captureGroup],
      line,
      file: file.fileName
    };
  }
}
/**
 * Extracts translation keys from methods such as `$t` and `$tc`.
 *
 * - **regexp pattern**: (?:[$ .]tc?)\(
 *
 *   **description**: Matches the sequence t( or tc(, optionally with either “$”, “.” or “ ” in front of it.
 *
 * - **regexp pattern**: (["'`])
 *
 *   **description**: 1. capturing group. Matches either “"”, “'”, or “`”.
 *
 * - **regexp pattern**: ((?:[^\\]|\\.)*?)
 *
 *   **description**: 2. capturing group. Matches anything except a backslash
 *   *or* matches any backslash followed by any character (e.g. “\"”, “\`”, “\t”, etc.)
 *
 * - **regexp pattern**: \1
 *
 *   **description**: matches whatever was matched by capturing group 1 (e.g. the starting string character)
 *
 * @param file a file object
 * @returns a list of translation keys found in `file`.
 */


function extractMethodMatches(file) {
  const methodRegExp = /(?:[$ .]tc?)\(\s*?(["'`])((?:[^\\]|\\.)*?)\1/g;
  return [...getMatches(file, methodRegExp, 2)];
}

function extractComponentMatches(file) {
  const componentRegExp = /(?:<i18n)(?:.|\n)*?(?:[^:]path=("|'))(.*?)\1/gi;
  return [...getMatches(file, componentRegExp, 2)];
}

function extractDirectiveMatches(file) {
  const directiveRegExp = /v-t="'(.*?)'"/g;
  return [...getMatches(file, directiveRegExp)];
}

function extractI18nItemsFromVueFiles(sourceFiles) {
  return sourceFiles.reduce((accumulator, file) => {
    const methodMatches = extractMethodMatches(file);
    const componentMatches = extractComponentMatches(file);
    const directiveMatches = extractDirectiveMatches(file);
    return [...accumulator, ...methodMatches, ...componentMatches, ...directiveMatches];
  }, []);
}

function parseVueFiles(vueFilesPath) {
  const filesList = readVueFiles(vueFilesPath);
  return extractI18nItemsFromVueFiles(filesList);
}

function readLangFiles(src) {
  if (!isValidGlob(src)) {
    throw new Error(`languageFiles isn't a valid glob pattern.`);
  }

  const targetFiles = glob.sync(src);

  if (targetFiles.length === 0) {
    throw new Error('languageFiles glob has no files.');
  }

  return targetFiles.map(f => {
    const langPath = path.resolve(process.cwd(), f);
    const extension = langPath.substring(langPath.lastIndexOf('.')).toLowerCase();
    const isJSON = extension === '.json';
    const isYAML = extension === '.yaml' || extension === '.yml';
    let langObj;

    if (isJSON) {
      langObj = JSON.parse(fs.readFileSync(langPath, 'utf8'));
    } else if (isYAML) {
      langObj = yaml.load(fs.readFileSync(langPath, 'utf8'));
    } else {
      langObj = eval(fs.readFileSync(langPath, 'utf8'));
    }

    const fileName = f.replace(process.cwd(), '');
    return {
      fileName,
      path: f,
      content: JSON.stringify(langObj)
    };
  });
}

function extractI18nItemsFromLanguageFiles(languageFiles) {
  return languageFiles.reduce((accumulator, file) => {
    const language = file.fileName.substring(file.fileName.lastIndexOf('/') + 1, file.fileName.lastIndexOf('.'));

    if (!accumulator[language]) {
      accumulator[language] = [];
    }

    const flattenedObject = dot.dot(JSON.parse(file.content));
    Object.keys(flattenedObject).forEach((key, index) => {
      accumulator[language].push({
        line: index,
        path: key,
        file: file.fileName
      });
    });
    return accumulator;
  }, {});
}

function writeMissingToLanguage(resolvedLanguageFiles, missingKeys) {
  const languageFiles = readLangFiles(resolvedLanguageFiles);
  languageFiles.forEach(languageFile => {
    const languageFileContent = JSON.parse(languageFile.content);
    missingKeys.forEach(item => {
      if (item.language && languageFile.fileName.includes(item.language) || !item.language) {
        dot.str(item.path, '', languageFileContent);
      }
    });
    const fileExtension = languageFile.fileName.substring(languageFile.fileName.lastIndexOf('.') + 1);
    const filePath = languageFile.path;
    const stringifiedContent = JSON.stringify(languageFileContent, null, 2);

    if (fileExtension === 'json') {
      fs.writeFileSync(filePath, stringifiedContent);
    } else if (fileExtension === 'js') {
      const jsFile = `export default ${stringifiedContent}; \n`;
      fs.writeFileSync(filePath, jsFile);
    } else if (fileExtension === 'yaml' || fileExtension === 'yml') {
      const yamlFile = yaml.dump(languageFileContent);
      fs.writeFileSync(filePath, yamlFile);
    }
  });
}
function parseLanguageFiles(languageFilesPath) {
  const filesList = readLangFiles(languageFilesPath);
  return extractI18nItemsFromLanguageFiles(filesList);
}

var VueI18NExtractReportTypes;

(function (VueI18NExtractReportTypes) {
  VueI18NExtractReportTypes[VueI18NExtractReportTypes["None"] = 0] = "None";
  VueI18NExtractReportTypes[VueI18NExtractReportTypes["Missing"] = 1] = "Missing";
  VueI18NExtractReportTypes[VueI18NExtractReportTypes["Unused"] = 2] = "Unused";
  VueI18NExtractReportTypes[VueI18NExtractReportTypes["Dynamic"] = 4] = "Dynamic";
  VueI18NExtractReportTypes[VueI18NExtractReportTypes["All"] = 7] = "All";
})(VueI18NExtractReportTypes || (VueI18NExtractReportTypes = {}));

const mightBeUsedDynamically = function mightBeUsedDynamically(languageItem, dynamicKeys) {
  return dynamicKeys.some(dynamicKey => languageItem.path.includes(dynamicKey.path));
};

function extractI18NReport(parsedVueFiles, parsedLanguageFiles, reportType = VueI18NExtractReportTypes.Missing + VueI18NExtractReportTypes.Unused) {
  const missingKeys = [];
  const unusedKeys = [];
  const dynamicKeys = [];
  const dynamicReportEnabled = reportType & VueI18NExtractReportTypes.Dynamic;
  Object.keys(parsedLanguageFiles).forEach(language => {
    let languageItems = parsedLanguageFiles[language];
    parsedVueFiles.forEach(vueItem => {
      const usedByVueItem = function usedByVueItem(languageItem) {
        return languageItem.path === vueItem.path || languageItem.path.startsWith(vueItem.path + '.');
      };

      if (dynamicReportEnabled && (vueItem.path.includes('${') || vueItem.path.endsWith('.'))) {
        dynamicKeys.push(_extends({}, vueItem, {
          language
        }));
        return;
      }

      if (!parsedLanguageFiles[language].some(usedByVueItem)) {
        missingKeys.push(_extends({}, vueItem, {
          language
        }));
      }

      languageItems = languageItems.filter(languageItem => dynamicReportEnabled ? !mightBeUsedDynamically(languageItem, dynamicKeys) && !usedByVueItem(languageItem) : !usedByVueItem(languageItem));
    });
    unusedKeys.push(...languageItems.map(item => _extends({}, item, {
      language
    })));
  });
  let extracts = {};

  if (reportType & VueI18NExtractReportTypes.Missing) {
    extracts = Object.assign(extracts, {
      missingKeys
    });
  }

  if (reportType & VueI18NExtractReportTypes.Unused) {
    extracts = Object.assign(extracts, {
      unusedKeys
    });
  }

  if (dynamicReportEnabled) {
    extracts = Object.assign(extracts, {
      dynamicKeys
    });
  }

  return extracts;
}
async function writeReportToFile(report, writePath) {
  const reportString = JSON.stringify(report);
  return new Promise((resolve, reject) => {
    fs.writeFile(writePath, reportString, err => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

function createI18NReport(vueFiles, languageFiles, command) {
  const resolvedVueFiles = path.resolve(process.cwd(), vueFiles);
  const resolvedLanguageFiles = path.resolve(process.cwd(), languageFiles);
  const parsedVueFiles = parseVueFiles(resolvedVueFiles);
  const parsedLanguageFiles = parseLanguageFiles(resolvedLanguageFiles);
  const reportType = command.dynamic ? VueI18NExtractReportTypes.All : VueI18NExtractReportTypes.Missing + VueI18NExtractReportTypes.Unused;
  return extractI18NReport(parsedVueFiles, parsedLanguageFiles, reportType);
}
function reportFromConfigCommand() {
  try {
    const configFile = eval(fs.readFileSync(path.resolve(process.cwd(), 'vue-i18n-extract.config.js'), 'utf8'));
    return reportCommand(_extends({
      vueFiles: configFile.vueFilesPath,
      languageFiles: configFile.languageFilesPath
    }, configFile.options.output && {
      output: configFile.options.output
    }, configFile.options.add && {
      add: Boolean(configFile.options.add)
    }, configFile.options.dynamic && {
      dynamic: [false, 'ignore', 'report'].findIndex(e => e === configFile.options.dynamic)
    }));
  } catch (err) {
    console.error(err);
  }
}
async function reportCommand(command) {
  const {
    vueFiles,
    languageFiles,
    output,
    add,
    dynamic,
    ci
  } = command;
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

export { VueI18NExtractReportTypes, createI18NReport, extractI18NReport, initCommand, parseLanguageFiles, parseVueFiles, readVueFiles, reportCommand, reportFromConfigCommand, writeMissingToLanguage, writeReportToFile };
//# sourceMappingURL=vue-i18n-extract.modern.js.map
