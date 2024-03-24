import { defineConfig, HeadConfig } from "vitepress";
import { BlogConfig } from "./theme/constant.js";
import markdownImagePlugin from "./markdownPlugin";
import { config } from "process";

export default defineConfig({
  title: BlogConfig.name,
  description: BlogConfig.desc,
  cleanUrls: true,
  appearance: false,
  // assetsDir: "assets",
  ignoreDeadLinks: true,
  base: "/",
  // buildEnd: rss,
  markdown: {
    lineNumbers: true,
    config: (md) => {
      md.use(markdownImagePlugin);
    },
  },
  head: [
    [
      "meta",
      {
        name: "keywords",
        content:
          "ZUOLUOTV,科技,旅行,生活方式,程序员,互联网,自媒体,摄影师,编程,前端,前端工程师,罗磊,独立博客,LUOLEI,Vlog,YouTuber",
      },
    ],
  ],
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
    logo: "./logo.png",
    nav: [{ text: "关于", link: BlogConfig.github }],
    socialLinks: [
      { icon: "twitter", link: BlogConfig.twitter },
      { icon: "github", link: BlogConfig.github },
    ],

    sidebar: [],
    outlineTitle: "本文导览",
    lastUpdatedText: "最后更新时间",
    footer: {
      message: `Powered By <a href="${BlogConfig.github}">VitePress</a>`,
    },
  },
});
