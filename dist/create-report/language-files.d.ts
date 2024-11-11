/// <reference types="dot-object" />
import { SimpleFile, I18NLanguage, I18NItem } from '../types';
export declare function readLanguageFiles(src: string): SimpleFile[];
export declare function extractI18NLanguageFromLanguageFiles(languageFiles: SimpleFile[], dot?: DotObject.Dot): I18NLanguage;
export declare function writeMissingToLanguageFiles(parsedLanguageFiles: SimpleFile[], missingKeys: I18NItem[], dot?: DotObject.Dot, noEmptyTranslation?: string, missingTranslationString?: string, jsonIndentation?: number): void;
export declare function removeUnusedFromLanguageFiles(parsedLanguageFiles: SimpleFile[], unusedKeys: I18NItem[], dot?: DotObject.Dot, jsonIndentation?: number): void;
export declare function parselanguageFiles(languageFiles: string, dot?: DotObject.Dot): I18NLanguage;
