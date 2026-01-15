<script setup lang="ts">
import { useBusuanzi } from "../utils/useBusuanzi";

const { pagePv, pageUv, sitePv, siteUv, isFetched } = useBusuanzi("GET");
</script>

<template>
  <div class="busuanzi-stats" role="status" aria-live="polite">
    <template v-if="isFetched">
      <span class="busuanzi-badge">
        <span class="busuanzi-label">本文阅读量</span>
        <span class="busuanzi-value">{{ pagePv }}</span>
      </span>
      <span class="busuanzi-badge">
        <span class="busuanzi-label">本文访客量</span>
        <span class="busuanzi-value">{{ pageUv }}</span>
      </span>
      <span class="busuanzi-badge">
        <span class="busuanzi-label">本站访问量</span>
        <span class="busuanzi-value">{{ sitePv }}</span>
      </span>
      <span class="busuanzi-badge">
        <span class="busuanzi-label">本站访客数</span>
        <span class="busuanzi-value">{{ siteUv }}</span>
      </span>
    </template>

    <template v-else>
      <span class="busuanzi-badge busuanzi-skeleton" />
      <span class="busuanzi-badge busuanzi-skeleton" />
      <span class="busuanzi-badge busuanzi-skeleton" />
      <span class="busuanzi-badge busuanzi-skeleton" />
    </template>
  </div>
</template>

<style scoped>
.busuanzi-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 10px;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
}

.busuanzi-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
}

.busuanzi-label {
  opacity: 0.9;
}

.busuanzi-value {
  color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums;
}

.busuanzi-skeleton {
  width: 120px;
  height: 30px;
  background: linear-gradient(
    90deg,
    var(--vp-c-bg-soft) 0%,
    rgba(127, 127, 127, 0.12) 50%,
    var(--vp-c-bg-soft) 100%
  );
  background-size: 200% 100%;
  animation: busuanzi-loading 1.2s ease-in-out infinite;
}

@keyframes busuanzi-loading {
  0% {
    background-position: 0% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
