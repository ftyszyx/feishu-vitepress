<script setup lang="ts">
import { useBusuanzi } from "../utils/useBusuanzi";

const { pagePv, pageUv, sitePv, siteUv, isFetched } = useBusuanzi("GET");
</script>

<template>
  <div class="busuanzi-stats">
    <span v-if="isFetched" class="busuanzi-item">本文阅读量 {{ pagePv }}</span>
    <span v-if="isFetched" class="busuanzi-item">本文访客量 {{ pageUv }}</span>
    <span v-if="isFetched" class="busuanzi-item">本站访问量 {{ sitePv }}</span>
    <span v-if="isFetched" class="busuanzi-item">本站访客数 {{ siteUv }}</span>
  </div>
</template>

<style scoped>
.busuanzi-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  font-size: 12px;
  line-height: 20px;
  opacity: 0.9;
}

.busuanzi-item {
  display: inline-flex;
  gap: 4px;
}
</style>
