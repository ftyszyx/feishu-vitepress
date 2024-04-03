<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from "vue";
import { useData, withBase, useRoute, useRouter } from "vitepress";
import { getFormatNumber } from "../utils";
import { SiteConfig } from "../site_config";
const { frontmatter } = useData();
const route = useRoute();
const router = useRouter();
const title = computed(() => frontmatter.value.title);
const date = computed(() => frontmatter.value.date);
const showHit = computed(() => !!SiteConfig.umami_website_id);
const bannerImageUrl = computed(() => {
  if (frontmatter.value.cover) return withBase(frontmatter.value.cover);
  return "";
});

const pageHits = ref<number>(0);
const isPageHitsFetched = ref<boolean>(false);

const fetchPageHits = async () => {
  if (showHit.value == false) {
    isPageHitsFetched.value = true;
    return;
  }
  try {
    const response = await fetch(
      `${SiteConfig.umami_url}/api/websites/${SiteConfig.umami_website_id}/blogpage?url=${route.path}`,
    );
    const { views } = await response.json();
    // console.log("get hit views", route.path, views);
    if (views) {
      pageHits.value = views[0].num;
    }
    isPageHitsFetched.value = true;
  } catch (error) {
    console.error("Error fetching page hits:", error);
  }
};

onMounted(() => {
  fetchPageHits();
});

watch(
  () => router.route.data.relativePath,
  () => {
    isPageHitsFetched.value = false;
    fetchPageHits();
  },
);
</script>

<template>
  <div class="w-auto">
    <div
      class="h-64 overflow-hidden bg-center bg-cover rounded-md"
      :style="`
        background-image: url(${bannerImageUrl})`"
    >
      <div class="flex items-center h-full bg-gray-900 bg-opacity-30">
        <div class="max-w-xl px-5 md:px-10">
          <h2
            class="text-3xl font-bold text-white break-normal line-clamp-4 sd:line-clamp-3 md:line-clamp-2"
          >
            {{ title }}
          </h2>
          <p class="inline-block mt-2 mr-5 text-sm md:text-sm text-slate-200">
            <svg
              class="h-3 w-3 inline-block -mt-0.5 mr-1"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <rect x="4" y="5" width="16" height="16" rx="2" />
              <line x1="16" y1="3" x2="16" y2="7" />
              <line x1="8" y1="3" x2="8" y2="7" />
              <line x1="4" y1="11" x2="20" y2="11" />
              <rect x="8" y="15" width="2" height="2" /></svg
            >{{ date }}
          </p>

          <p
            class="inline-block mt-2 text-sm md:inline-block md:text-sm text-slate-200"
          >
            <svg
              class="inline-block w-3 h-3 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <i v-if="isPageHitsFetched && pageHits > 0" class="not-italic">{{
              getFormatNumber(pageHits)
            }}</i>
          </p>

          <p class="mt-2 text-white"></p>
        </div>
      </div>
    </div>
  </div>
</template>
