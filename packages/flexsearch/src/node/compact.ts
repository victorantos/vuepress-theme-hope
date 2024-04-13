import { createConverter } from "vuepress-shared/node";

import type { flexsearchPluginOptions } from "./options.js";

/** @deprecated */
export const convertOptions = (
  options: flexsearchPluginOptions & Record<string, unknown>,
): void => {
  const { deprecatedLogger } = createConverter("flexsearch");

  deprecatedLogger({
    options,
    old: "fullIndex",
    new: "indexContent",
  });
  deprecatedLogger({
    options,
    old: "historyCount",
    new: "resultHistoryCount",
  });
  deprecatedLogger({
    options,
    old: "delay",
    new: "searchDelay",
  });
};
