export interface Header {
  id: string;
  text: string;
  depth: number;
  charIndex: number;
}

export interface PageIndexInfo {
  id: number;
  title: string;
  path: string;
  toc: Header[];
  content: string;
  frontmatter: Record<string, unknown>;
  lang: string;
}

export interface PageIndexForFlexSearch extends PageIndexInfo {
  normalizedContent: string;
  headers: string;
  normalizedTitle: string;
}

export interface SearchIndexOptions {
  lang: string;
  group: (path: string) => string;
}

export interface SearchQuery {
  keyword: string;
  limit: number;
}

export interface NormalizedSearchResultItem {
  hits: PageIndexInfo[];
  index: string;
}

export type NormalizedSearchResult = NormalizedSearchResultItem[];
