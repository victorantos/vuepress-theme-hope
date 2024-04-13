import type { FunctionalComponent } from "vue";
import { h } from "vue";

import { LoadingIcon } from "./icons.js";

export const SearchLoading: FunctionalComponent<{ hint: string }> = ({
  hint,
}) =>
  h("div", { class: "flexsearch-result-wrapper loading" }, [
    h(LoadingIcon),
    hint,
  ]);

SearchLoading.displayName = "SearchLoading";
