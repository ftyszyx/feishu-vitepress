import { createContentLoader, defineConfig, HeadConfig } from "vitepress";
import { BlogConfig } from "../theme/constant.js";
import { copyFileSync } from "fs";
import path from "path";
import "dotenv/config";
export interface ArtTalk {
  site: string;
  server: string;
}
export const arttalk: ArtTalk = {
  site: "myblog",
  server: "http://8.134.157.107:8080/",
};

export const github_url = "https://github.com/ftyszyx";
export const twitter_url = "https://twitter.com/zhangyuxin_new";
export const shared = defineConfig({
  title: BlogConfig.name,
  description: BlogConfig.desc,
  cleanUrls: true,
  appearance: true,
  ignoreDeadLinks: true,
  base: process.env.BLOG_BASE_URL || "/",
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
