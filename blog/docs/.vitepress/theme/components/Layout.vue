<script setup lang="ts">
import { onMounted, onUnmounted, watch, nextTick } from "vue";
import DefaultTheme from "vitepress/theme";
import { useRoute, useRouter, withBase } from "vitepress";
import mediumZoom from "medium-zoom";
import CategoryNav from "./CategoryNav.vue";
import ArticleMeta from "./ArticleMeta.vue";
import ArticleList from "./ArticleList.vue";
import ArticleComment from "./ArticleComment.vue";
import ArticleCopyright from "./ArticleCopyright.vue";
const { Layout } = DefaultTheme;

const router = useRouter();
const route = useRoute();
const initImagesZoom = () => {
  mediumZoom(".main img", {
    background: "var(--vp-c-bg)",
  });
};

onMounted(() => {
  nextTick(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Whenever the user explicitly chooses light mode
    localStorage.theme = "light";

    // Whenever the user explicitly chooses dark mode
    localStorage.theme = "dark";
    // Whenever the user explicitly chooses to respect the OS preference
    localStorage.removeItem("theme");
    initImagesZoom();
  });
});
watch(router.route, () => {
  // 清除上一次的监听
  nextTick(() => {
    initImagesZoom();
  });
});
onUnmounted(() => {});
</script>

<template>
  <Layout>
    <!-- 文章顶部模块 -->
    <template #doc-before>
      <ArticleMeta />
    </template>
    <template #doc-bottom> </template>
    <template #doc-footer-before>
      <ArticleCopyright />
    </template>
    <!-- 文章尾部 -->
    <template #doc-after>
      <!-- 评论模块 -->
      <ArticleComment />
    </template>
    <template #aside-outline-before> </template>
    <template #home-hero-before>
      <CategoryNav />
    </template>
    <!-- 主页模块 -->
    <template #home-hero-after>
      <!-- 首页文章列表模块 -->
      <ArticleList />
    </template>
  </Layout>
</template>
