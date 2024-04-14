import type {
  DocumentSearchOptions,
  IndexOptionsForDocumentSearch,
} from "flexsearch";
import { Document } from "flexsearch";
import { withBase } from "vuepress/client";

import { normalizeTextCase } from "./normalizeTextCase.js";
import type {
  PageIndexForFlexSearch,
  SearchIndexOptions,
  SearchQuery,
} from "./typings.js";

const getIndex = (lang: string): Promise<PageIndexForFlexSearch[]> =>
  // TODO: Add hash
  fetch(withBase(`/static/searchIndex.${lang}.json`)).then(
    (res) => <Promise<PageIndexForFlexSearch[]>>res.json(),
  );

export const createSearchIndex = async ({ lang }: SearchIndexOptions) => {
  const options: IndexOptionsForDocumentSearch<PageIndexForFlexSearch, true> = {
    document: {
      id: "routePath",
      index: ["normalizedTitle", "headers", "normalizedContent"],
      store: true,
    },
    tokenize: "strict",
    cache: 100,
    context: true,
    worker: true,
  };

  // Init Search Indexes
  // English Index
  const enIndex = new Document({ language: "en", ...options });
  const cjkIndex = new Document({ language: "cjk", ...options });
  const cyrilicIndex = new Document({ language: "cyrillic", ...options });

  const pageIndexes: PageIndexForFlexSearch[] = (await getIndex(lang)).map(
    (page) => ({
      ...page,
      normalizedContent: normalizeTextCase(page.content),
      headers: page.toc
        .map((header) => normalizeTextCase(header.text))
        .join(" "),
      normalizedTitle: normalizeTextCase(page.title),
    }),
  );

  pageIndexes.forEach((index) => {
    enIndex.add(index);
    cjkIndex.add(index);
    cyrilicIndex.add(index);
  });

  const search = async ({ keyword, limit }: SearchQuery) => {
    const searchParams: DocumentSearchOptions<true> = {
      query: keyword,
      limit,
      enrich: true,
      index: ["normalizedTitle", "headers", "normalizedContent"],
    };

    const searchResult = await Promise.all([
      enIndex?.search(searchParams),
      cjkIndex?.search(searchParams),
      cyrilicIndex.search(searchParams),
    ]);
    const flattenSearchResult = searchResult.flat(2).filter(Boolean);

    return [
      {
        index: "default",
        hits: flattenSearchResult,
      },
    ];
  };

  return { search };
};
