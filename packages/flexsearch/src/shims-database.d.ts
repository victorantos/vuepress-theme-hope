declare module "@temp/flexsearch/index.js" {
  export type SearchIndexStore = Record<
    string,
    () => Promise<{ default: string }>
  >;

  const database: SearchIndexStore;
  export default database;
}
