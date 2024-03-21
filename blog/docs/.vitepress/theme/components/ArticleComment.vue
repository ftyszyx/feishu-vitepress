<script setup lang="ts">
import "artalk/dist/Artalk.css";
import Artalk from "artalk";
import { BlogConfig } from "../constant";
import { watch, nextTick, ref, onMounted } from "vue";
import { useData, useRouter, PageData } from "vitepress";
const artalkEl = ref<HTMLElement>();
const router = useRouter();
const page = useData().page;

onMounted(async () => {
  await nextTick();
  initArtalk(page.value);
});

console.log("router path", router.route.data.relativePath);
watch(
  () => router.route.data.relativePath,
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
    pageKey: `${BlogConfig.baseDom}${location.pathname}/`,
    pageTitle: page.title,
    el: artalkEl.value,
    ...BlogConfig.arttalk,
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
