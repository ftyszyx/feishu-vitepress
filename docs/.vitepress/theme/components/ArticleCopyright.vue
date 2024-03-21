<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useData, useRoute } from "vitepress";
import { BlogConfig } from "../constant";
const { frontmatter } = useData();
const route = useRoute();
const title = computed(() => frontmatter.value.title);
const date = computed(() => frontmatter.value.date);
const authorLink = computed(() => {
  return `${BlogConfig.baseUrl}`;
});

const articleLink = computed(() => {
  return `${BlogConfig.baseUrl}${route.path}`;
});

onMounted(() => {});
</script>

<template>
  <div class="w-auto">
    <div
      class="relative px-5 py-5 border rounded-md md:px-5 md:py-5 border-zinc-300 dark:border-zinc-500"
    >
      <section class="flex flex-col gap-y-[8px] text-sm md:text-sm">
        <svg
          class="absolute w-4 h-4 md:h-6 md:w-6 text-black-100 right-3 md:right-5"
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
          <circle cx="12" cy="12" r="9" />
          <path d="M14.5 9a3.5 4 0 1 0 0 6" />
        </svg>
        <div>
          <span class="mr-1 font-medium">作者:</span>
          <span>
            <a
              :href="authorLink"
              class="text-blue-600 dark:text-blue-300 hover:text-blue-500"
              rel="noreferrer"
              target="_blank"
            >
              {{ BlogConfig.author }}
            </a>
          </span>
        </div>

        <div>
          <span class="mr-1 font-medium">文章标题:</span>
          <span> {{ title }} </span>
        </div>
        <div>
          <span class="mr-1 font-medium">发表时间:</span>
          <span>
            <span> {{ date }} </span>
          </span>
        </div>
        <div>
          <span class="mr-1 font-medium">文章链接:</span>
          <span>
            <a
              :href="articleLink"
              class="text-blue-600 dark:text-blue-300 hover:text-blue-500"
              rel="noreferrer"
              target="_blank"
            >
              {{ articleLink }}
            </a>
          </span>
        </div>
      </section>
    </div>
  </div>
</template>
