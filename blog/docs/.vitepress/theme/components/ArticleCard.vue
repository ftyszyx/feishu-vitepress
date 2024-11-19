<script setup lang="ts">
import { useData, withBase } from "vitepress";
import { ref, onMounted, computed } from "vue";
import { getFormatNumber } from "../utils";
import { Post } from "../type_def";
const props = defineProps<{
  url: string;
  title: string;
  cover: string;
  date: Post["date"];
  edit_time: Post["edit_time"];
  categories: string[];
  hit: number;
  isArticleListHitsFetched: boolean;
}>();

const hotArticleViews = 5000;
const imgRef = ref<HTMLImageElement | null>(null);

const imageLoaded = ref(false);
const imageError = ref(false);

const onImageLoad = () => {
  imageError.value = false;
  imageLoaded.value = true;
};

const onImageError = () => {
  imageError.value = true;
  imageLoaded.value = true; // 也设置图片为已加载，隐藏加载动画
};

const articleUrl = computed(() => {
  return withBase(props.url);
});
const previewImageUrl = computed(() => {
  if (props.cover) return withBase(props.cover);
  return "";
});

onMounted(() => {});
</script>

<template>
  <div
    class="flex-1 h-64 overflow-hidden duration-300 ease-in-out bg-white rounded-t shadow-lg dark:bg-zinc-800 hover:shadow-2xl"
  >
    <div class="flex flex-col no-underline hover:no-underline align-middle">
      <a
        :href="articleUrl"
        class="relative overflow-hidden w-[376px] h-[160px] bg-zinc-100 dark:bg-neutral-900"
      >
        <img
          v-if="previewImageUrl != ''"
          :title="title"
          :alt="title"
          ref="imgRef"
          :src="previewImageUrl"
          @load="onImageLoad"
          @error="onImageError"
          :class="[
            'absolute',
            'object-cover',
            'duration-300',
            'ease-in',
            'w-full',
            'h-full',
            'rounded-t',
            'hover:scale-105',
          ]"
        />
      </a>
      <div class="w-[376px] px-6 mt-5">
        <a
          :href="articleUrl"
          class="h-auto text-base antialiased font-medium text-gray-800 break-normal md:h-12 sd:text-lg md:text-base dark:text-slate-300 line-clamp-2 font-fira"
        >
          {{ title }}
        </a>
      </div>
    </div>
  </div>
  <div
    class="flex-none h-12 px-6 py-3 mt-auto overflow-hidden bg-white rounded-t-none rounded-b shadow-lg dark:bg-zinc-800"
  >
    <div class="flex items-center justify-between">
      <p
        class="text-sm text-gray-400 dark:text-slate-400 sd:text-sm md:text-sm"
      >
        <svg
          class="h-3 w-3 inline-block -mt-0.5"
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
          <rect x="8" y="15" width="2" height="2" />
        </svg>
        {{ edit_time.formatShowDate }}
      </p>

      <div class="flex items-center justify-items-end">
        <svg
          v-if="isArticleListHitsFetched && hit <= hotArticleViews"
          class="inline-block w-3 h-3 mr-1 text-gray-400 dark:text-slate-400"
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
        <svg
          v-if="isArticleListHitsFetched && hit > hotArticleViews"
          class="-mt-0 text-red-400 icon dark:text-red-500 fill-blue-600"
          viewBox="0 0 1024 1024"
          width="14"
          height="14"
        >
          <path
            d="M750.4 308.8c-4.8-4.8-12.8-1.6-12.8 4.8 0 40 16 97.6-49.6 123.2 0 0 9.6-268.8-281.6-310.4-6.4-1.6-11.2 4.8-9.6 11.2 11.2 38.4 32 156.8-72 230.4-6.4 4.8-11.2 8-17.6 12.8-30.4-38.4-75.2-52.8-94.4-56-3.2-1.6-6.4 3.2-4.8 6.4 28.8 80-27.2 168-27.2 168h1.6c-36.8 54.4-51.2 118.4-25.6 209.6 0 0 51.2 152 243.2 188.8l-6.4-6.4s-116.8-118.4-65.6-256c28.8-73.6 89.6-113.6 89.6-113.6s-28.8 96 38.4 124.8c0 0-11.2-144 112-195.2 0 0-14.4 75.2 48 163.2 64 89.6 107.2 200 22.4 272-3.2 1.6-4.8 4.8-8 6.4 94.4-24 153.6-78.4 193.6-132.8 60.8-84.8 88-275.2-73.6-451.2z"
            fill="currentColor"
            p-id="10161"
          ></path>
        </svg>

        <p
          v-if="isArticleListHitsFetched && hit > 0"
          class="ml-px text-sm text-gray-400 sd:text-sm md:text-sm"
          :class="{
            'text-red-400 dark:text-red-500': hit > hotArticleViews,
          }"
        >
          {{ getFormatNumber(hit) }}
        </p>
      </div>
    </div>
  </div>
</template>
