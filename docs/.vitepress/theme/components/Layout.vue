<script setup lang="ts">
import { onMounted, onUnmounted, watch, nextTick } from "vue";
import DefaultTheme from "vitepress/theme";
import { useRouter } from "vitepress";
import mediumZoom from "medium-zoom";
import CategoryNav from "./CategoryNav.vue";
import ArticleMeta from "./ArticleMeta.vue";
import ArticleList from "./ArticleList.vue";
import ArticleComment from "./ArticleComment.vue";
import ArticleBottomNav from "./ArticleBottomNav.vue";
import ArticleCopyright from "./ArticleCopyright.vue";
import { getFaviconUrl } from "../utils";
const { Layout } = DefaultTheme;

const router = useRouter();
const initImagesZoom = () => {
  mediumZoom(".main img", {
    background: "var(--vp-c-bg)",
  });
};

const addFavicon = () => {
  // 选择所有的 a 标签,不包括  .tweet-card 里面的 a 标签
  const aTags = document.querySelectorAll(".main a:not(.tweet-card a)");
  aTags.forEach((aTag) => {
    const domain = aTag.getAttribute("href")?.split("/")[2];
    // 如果域名存在且无 favicon 的 img 标签
    if (domain && !aTag.querySelector("img.favicon")) {
      aTag.classList.add("pending-favicon");
      const faviconUrl = getFaviconUrl(domain);
      const faviconImg = document.createElement("img");
      faviconImg.src = faviconUrl;
      faviconImg.className = "favicon";
      aTag.prepend(faviconImg);
      // 监听图片加载完成后移除 pending-favicon 类名
      faviconImg.onload = () => {
        aTag.classList.remove("pending-favicon");
        aTag.classList.add("has-favicon");
      };
      // 加载失败时也移除 pending-favicon 类名
      faviconImg.onerror = () => {
        aTag.classList.remove("pending-favicon");
        aTag.classList.add("err-favicon");
      };
    }
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
    addFavicon();
  });
});
watch(router.route, () => {
  // 清除上一次的监听
  nextTick(() => {
    initImagesZoom();
    addFavicon();
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
      <ArticleBottomNav />
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
