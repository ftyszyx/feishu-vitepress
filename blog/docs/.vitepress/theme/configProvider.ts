import {
  Component,
  defineComponent,
  h,
  inject,
  InjectionKey,
  provide,
  Ref,
  ref,
} from "vue";
const currentPageKey: InjectionKey<Ref<number>> = Symbol("currentPage");
const currentCategoryKey: InjectionKey<Ref<string>> = Symbol("currentCategory");

export function customConfigProvider(App: Component) {
  return defineComponent({
    name: "ConfigProvider",
    setup(props, { slots }) {
      const defaultPageKey = ref(1);
      provide(currentPageKey, defaultPageKey);
      const currentCategory = ref("");
      provide(currentCategoryKey, currentCategory);
      return () => h(App, null, slots);
    },
  });
}

export function useCurrentPageKey() {
  return inject(currentPageKey);
}

export function useCurrentCategoryKey() {
  return inject(currentCategoryKey);
}
