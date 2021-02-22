export type ReportOptions = {
  vueFiles: string;
  languageFiles: string;
  output?: string;
  add?: boolean;
  dynamic?: number;
  separator?: string;
}

export type SimpleFile = {
  fileName: string;
  path: string;
  content: string;
}

export type I18NItem = {
  line?: number;
  path: string;
  file?: string;
  language?: string;
}

export type I18NLanguage = {
  [language: string]: I18NItem[];
}

export type I18NReport = {
  missingKeys?: I18NItem[];
  unusedKeys?: I18NItem[];
  dynamicKeys?: I18NItem[];
}
