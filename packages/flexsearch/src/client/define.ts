import type {
  flexsearchCustomFieldFormatter,
  flexsearchHotKeyOptions,
  flexsearchLocaleConfig,
} from "../shared/index.js";

type flexsearchClientCustomFiledConfig = Record<
  string,
  flexsearchCustomFieldFormatter
>;

declare const SEARCH_PRO_ENABLE_AUTO_SUGGESTIONS: boolean;
declare const SEARCH_PRO_CUSTOM_FIELDS: flexsearchClientCustomFiledConfig;
declare const SEARCH_PRO_OPTIONS: {
  searchDelay: number;
  suggestDelay: number;
  queryHistoryCount: number;
  resultHistoryCount: number;
  hotKeys: flexsearchHotKeyOptions[];
  worker: string;
};
declare const SEARCH_PRO_LOCALES: flexsearchLocaleConfig;

export const flexsearchOptions = SEARCH_PRO_OPTIONS;

export const enableAutoSuggestions = SEARCH_PRO_ENABLE_AUTO_SUGGESTIONS;
export const flexsearchClientCustomFiledConfig = SEARCH_PRO_CUSTOM_FIELDS;
export const flexsearchHotKeys = flexsearchOptions.hotKeys;
export const flexsearchLocales = SEARCH_PRO_LOCALES;
