import type { InjectionKey, Ref } from "vue";
import { provide, ref } from "vue";

declare const __VUEPRESS_DEV__: boolean;

export const searchModalSymbol: InjectionKey<Ref<boolean>> = Symbol(
  __VUEPRESS_DEV__ ? "flexsearch" : "",
);

export const setupSearchModal = (): void => {
  const isActive = ref(false);

  provide(searchModalSymbol, isActive);
};
