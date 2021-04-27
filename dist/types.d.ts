export declare type ReportOptions = {
    vueFiles: string;
    languageFiles: string;
    output?: string;
    add?: boolean;
    dynamic?: number;
    ci?: boolean;
};
export declare type SimpleFile = {
    fileName: string;
    path: string;
    content: string;
};
export declare type I18NItem = {
    line?: number;
    path: string;
    file?: string;
    language?: string;
};
export declare type I18NLanguage = {
    [language: string]: I18NItem[];
};
export declare type I18NReport = {
    missingKeys?: I18NItem[];
    unusedKeys?: I18NItem[];
    dynamicKeys?: I18NItem[];
};
