<script setup lang="ts">
import Giscus, { AvailableLanguage, Mapping, Repo } from "@giscus/vue";
import { useData } from "vitepress";
import { SiteConfig } from "../site_config";
const lang = useData().lang;
</script>
<template>
  <div id="Comments" ref="artalkEl" style="margin-top: 20px"></div>
  <Giscus
    id="giscus-comment"
    :repo="SiteConfig.giscus.repo as Repo"
    :repoId="SiteConfig.giscus.repoId"
    :category="SiteConfig.giscus.category"
    :categoryId="SiteConfig.giscus.categoryId"
    :mapping="SiteConfig.giscus.data_mapping as Mapping"
    term="welcome"
    reactions-enabled="1"
    emit-metadata="0"
    input-position="top"
    loading="lazy"
    :lang="lang as AvailableLanguage"
  />
</template>

<style></style>
