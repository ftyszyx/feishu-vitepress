<script setup lang="ts">
import { computed, ref, watch, onMounted } from "vue";
import { useData, useRouter, withBase } from "vitepress";
import { useBrowserLocation } from "@vueuse/core";
import { data } from "../posts.data.js";
import { useCurrentCategoryKey, useCurrentPageKey } from "../configProvider";
import ArticleCard from "./ArticleCard.vue";
import { Post } from "../type_def.js";
import { get_lang_text, get_true_lan } from "../constant";
import { SiteConfig } from "../site_config";

const { lang } = useData();
const router = useRouter();
const location = useBrowserLocation();
// 获得当前页面的分类
// const posts = page;
const categoryKey = useCurrentCategoryKey()!;
const isArticleListHitsFetched = ref<boolean>(false);
const currentCategory = computed(() => categoryKey.value);
const pageSize = 12;

const posts = computed(() => {
  const true_lan = get_true_lan(lang.value);
  return data.filter((post) => post.lanuage == true_lan);
});

const filteredPosts = computed(() => {
  // console.log("get posts", posts.value, "curtag", currentCategory.value);
  if (currentCategory.value === "hot" && isArticleListHitsFetched.value) {
    return sortPostsByHit(posts.value);
  } else {
    var filter_posts = currentCategory.value
      ? posts.value.filter((post) =>
          post.categories.includes(currentCategory.value),
        )
      : posts.value;
    return filter_posts.sort((a, b) => {
      return b.date.time - a.date.time;
    });
  }
});

const pageTotal = computed(() =>
  Math.ceil(filteredPosts.value.length / pageSize),
);

// 获得当前页面的页码
const pageKey = useCurrentPageKey()!;
const articleList = computed(() => {
  const start = (pageKey.value - 1) * pageSize;
  const end = start + pageSize;
  return filteredPosts.value.slice(start, end);
});

const hasNextPage = computed(() => pageKey.value < pageTotal.value);
const hasPrevPage = computed(() => pageKey.value > 1);
const showHit = computed(() => {
  return !!SiteConfig.get_umami_website_id();
});

const scrollToTop = () => {
  if (typeof window !== "undefined") {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};

const sortPostsByHit = (posts: Post[]) => {
  return posts.filter((post) => post.hit > 0).sort((a, b) => b.hit - a.hit);
};

const changePage = (page: number) => {
  const { searchParams } = new URL(window.location.href);
  pageKey.value = page;
  searchParams.delete("page");
  searchParams.append("page", page.toString());
  router.go(
    `${location.value.origin}${router.route.path}?${searchParams.toString()}`,
  );
  scrollToTop();
};

const prevPage = () => {
  if (pageKey.value > 1) {
    changePage(pageKey.value - 1);
  }
};

const nextPage = () => {
  if (pageKey.value < pageTotal.value) {
    changePage(pageKey.value + 1);
  }
};

const fetchArticleListHits = async () => {
  if (!showHit) {
    isArticleListHitsFetched.value = true;
    return;
  }
  try {
    const response = await fetch(
      `${SiteConfig.umami_url}/api/websites/${SiteConfig.get_umami_website_id()}/blogpage`,
    );
    const { views } = await response.json();
    // console.log("get views", views);
    views.forEach((item) => {
      const post = posts.value.find((p) => {
        const page_url = withBase(p.url);
        // console.log("item url", p.url, page_url);
        return page_url == item.url_path;
      });
      if (post) {
        post.hit = item.num;
      }
    });
    isArticleListHitsFetched.value = true;
  } catch (error) {
    console.error("Error fetching page hits:", error);
  }
};

watch(
  location,
  () => {
    if (location.value.href) {
      const { searchParams } = new URL(location.value.href);
      if (searchParams.has("page")) {
        pageKey.value = Number(searchParams.get("page"));
      } else {
        pageKey.value = 1;
      }
    }
  },
  { immediate: true },
);

onMounted(() => {
  fetchArticleListHits();
});
</script>

<template>
  <div class="px-4 mx-auto -mt-4 md:px-0 max-w-7xl">
    <div
      class="w-full text-xl leading-normal text-gray-800 rounded-t md:text-2xl"
    >
      <ul class="flex flex-wrap pt-6 mx-3 sd:mx-1 md:mx-0">
        <li
          class="flex flex-col px-4 py-3"
          v-for="{ url, title, date, cover, categories, hit } of articleList"
          :key="url"
        >
          <ArticleCard
            :url="url"
            :title="title || ''"
            :date="date"
            :cover="cover || ''"
            :categories="categories || []"
            :hit="hit || 0"
            :isArticleListHitsFetched="isArticleListHitsFetched"
          />
        </li>
      </ul>
    </div>
    <div class="flex justify-center mt-6 space-x-6 dark:text-gray-100">
      <button
        @click="prevPage()"
        type="button"
        :class="
          hasPrevPage
            ? 'bg-white dark:bg-zinc-800 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-zinc-800'
            : 'bg-gray-100 dark:bg-zinc-900 text-neutral-300'
        "
        class="inline-block bg-white dark:text-slate-300 shadow-md rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out"
      >
        {{
          !hasPrevPage
            ? get_lang_text("home_first", lang)
            : get_lang_text("home_prev", lang)
        }}
      </button>
      <p class="text-center font-medium md:text-sm mt-2.5 w-12">
        <a class="inline-block underline">{{ pageKey }}</a
        ><span>/</span><a class="inline-block underline">{{ pageTotal }}</a>
      </p>
      <button
        type="button"
        :disabled="!hasNextPage"
        @click="nextPage()"
        :class="{
          'cursor-not-allowed': !hasNextPage,
          'bg-gray-100 dark:bg-zinc-900  text-neutral-300': !hasNextPage,
          'bg-white dark:bg-zinc-800 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-zinc-800 ':
            hasNextPage,
        }"
        class="inline-block bg-white rounded dark:text-slate-300 shadow-md px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out"
      >
        {{
          !hasNextPage
            ? get_lang_text("home_end", lang)
            : get_lang_text("home_next", lang)
        }}
      </button>
    </div>
  </div>
</template>
