import { useLocalStorage } from "@vueuse/core";
import type { Ref } from "vue";

import { flexsearchOptions } from "../define.js";

const SEARCH_PRO_HISTORY_QUERY_STORAGE = "SEARCH_PRO_QUERY_HISTORY";

export interface SearchQueryHistory {
  enabled: boolean;
  queryHistory: Ref<string[]>;
  addQueryHistory: (item: string) => void;
  removeQueryHistory: (index: number) => void;
}

const flexsearchQueryStorage = useLocalStorage<string[]>(
  SEARCH_PRO_HISTORY_QUERY_STORAGE,
  [],
);

export const useSearchQueryHistory = (): SearchQueryHistory => {
  const { queryHistoryCount } = flexsearchOptions;
  const enabled = queryHistoryCount > 0;

  const addQueryHistory = (item: string): void => {
    if (enabled)
      flexsearchQueryStorage.value = Array.from(
        new Set([
          item,
          ...flexsearchQueryStorage.value.slice(0, queryHistoryCount - 1),
        ]),
      );
  };

  const removeQueryHistory = (index: number): void => {
    flexsearchQueryStorage.value = [
      ...flexsearchQueryStorage.value.slice(0, index),
      ...flexsearchQueryStorage.value.slice(index + 1),
    ];
  };

  return {
    enabled,
    queryHistory: flexsearchQueryStorage,
    addQueryHistory,
    removeQueryHistory,
  };
};
