<script setup lang="ts">
import "artalk/dist/Artalk.css";
import Artalk from "artalk";
import { watch, nextTick, ref, onMounted, computed } from "vue";
import { useData, useRouter, PageData, withBase, useRoute } from "vitepress";
import { ArttalkConfig } from "../constant";
const artalkEl = ref<HTMLElement>();
const route = useRoute();
const page = useData().page;
const articleLink = computed(() => {
  return `${window.location.host}${withBase(route.path)}`;
});
onMounted(async () => {
  await nextTick();
  initArtalk(page.value);
});

console.log("router path", articleLink.value, route.path);
watch(
  () => route.data.relativePath,
  async (path) => {
    console.log("page", page.value);
    await nextTick();
    if (artalkEl.value) {
      initArtalk(page.value);
    }
  },
);

function initArtalk(page: PageData) {
  const artalk = Artalk.init({
    pageKey: `${articleLink}`,
    pageTitle: page.title,
    el: artalkEl.value,
    ...ArttalkConfig,
  });

  // 夜间模式
  const darkMode = document.querySelector("html").classList.contains("dark");
  artalk.setDarkMode(darkMode);
  new MutationObserver((mList) => {
    mList.forEach((m) => {
      if (m.attributeName !== "class") return;
      // @ts-ignore
      const darkMode = m.target.classList.contains("dark");
      artalk.setDarkMode(darkMode);
    });
  }).observe(document.querySelector("html"), { attributes: true });
}
</script>
<template>
  <div id="Comments" ref="artalkEl" style="margin-top: 20px"></div>
</template>

<style></style>
