<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useData, useRoute, withBase } from "vitepress";
import { get_lang_text } from "../constant";
const { frontmatter, lang, page } = useData();
const { create_time } = frontmatter.value;
const route = useRoute();
const title = computed(() => frontmatter.value.title);
const date = computed(() => {
  return new Date(create_time * 1000).toLocaleDateString();
});
const cur_lang = computed(() => {
  return lang.value;
});
console.log("article right", page.value);
const author = computed(
  () => frontmatter.value.author || get_lang_text("author", cur_lang.value),
);
const articleLink = computed(() => {
  return `${window.location.host}${withBase(route.path)}`;
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
          <span class="mr-1 font-medium"
            >{{ get_lang_text("autor_lan", lang) }}:</span
          >
          <span> {{ author }} </span>
        </div>

        <div>
          <span class="mr-1 font-medium"
            >{{ get_lang_text("title", lang) }}:</span
          >
          <span> {{ title }} </span>
        </div>
        <div>
          <span class="mr-1 font-medium"
            >{{ get_lang_text("create_time", lang) }}:</span
          >
          <span>
            <span> {{ date }} </span>
          </span>
        </div>
        <div>
          <span class="mr-1 font-medium"
            >{{ get_lang_text("url_link", lang) }}:</span
          >
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
../site_config
