import { createContentLoader, defineConfig, HeadConfig } from "vitepress";
import { copyFileSync } from "fs";
import path from "path";
import "dotenv/config";

export const github_url = "https://github.com/ftyszyx";
export const twitter_url = "https://twitter.com/zhangyuxin_new";
export const shared = defineConfig({
  cleanUrls: true,
  appearance: true,
  ignoreDeadLinks: true,
  base: process.env.BLOG_BASE_URL || "/",
  head: [
    [
      "script",
      {
        src: "http://8.134.157.107:8030/script.js",
        "data-website-id": "6692d45c-9b38-482e-93e9-90c7941b736e",
      },
    ],
    ["link", { rel: "icon", href: "/logo.png" }],
    [
      "meta",
      {
        name: "keywords",
        content:
          "科技,旅行,生活方式,程序员,互联网,自媒体,摄影师,编程,前端,前端工程师,独立博客,Vlog",
      },
    ],
  ],
  buildEnd: async (siteconfig) => {
    const coverurls: string[] = await createContentLoader("/*.md", {
      excerpt: true,
      includeSrc: false,
      render: false,
      transform: (rawData) => {
        return rawData
          .filter(({ frontmatter }) => frontmatter.cover)
          .map(({ frontmatter }) => {
            return frontmatter.cover;
          });
      },
    }).load();
    coverurls.forEach((item) => {
      const picpath = path.join(siteconfig.root, item);
      const picfile_name = path.basename(picpath);
      const destpath = path.join(
        siteconfig.outDir,
        siteconfig.assetsDir,
        picfile_name,
      );
      // console.log("write", picpath, destpath);
      copyFileSync(picpath, destpath);
    });
  },
  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: true,
    },
    config: (md) => {},
  },
  transformHead: ({ pageData }) => {
    const head: HeadConfig[] = [];
    head.push([
      "meta",
      { property: "og:title", content: pageData.frontmatter.title },
    ]);
    head.push([
      "meta",
      { property: "og:description", content: pageData.frontmatter.title },
    ]);

    return head;
  },
  themeConfig: {
    search: {
      provider: "local",
    },
    logo: "./logo.png",
    socialLinks: [
      { icon: "twitter", link: twitter_url },
      { icon: "github", link: github_url },
    ],
  },
});
