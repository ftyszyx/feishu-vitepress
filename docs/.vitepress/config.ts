import { defineConfig, HeadConfig } from "vitepress";
import { RSSOptions } from "vitepress-plugin-rss";
import { rss } from "./genFeed";
import { BlogConfig } from "./theme/constant.js";
import markdownImagePlugin from "./markdownPlugin";

const RSS: RSSOptions = {
  title: BlogConfig.name,
  baseUrl: BlogConfig.baseUrl,
  copyright: BlogConfig.copyright,
  filename: "rss.xml",
};

export default defineConfig({
  title: BlogConfig.name,
  description: BlogConfig.desc,
  cleanUrls: true,
  appearance: false,
  ignoreDeadLinks: true,
  base: "/",
  buildEnd: rss,
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
    [
      "meta",
      {
        name: "description",
        content:
          "我叫罗磊，来自中国深圳，程序员，前端工程师，视频节目 ZUOLUOTV 制作人，旅行摄影玩家和内容创作者，中文 Vlog 拍摄者，内容主题涉及科技、数码、互联网、摄影、旅行、生活方式等领域。",
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
    logo: "./logo.svg",
    nav: [
      { text: "ZUOLUOTV™", link: "https://youtube.com/zuoluotv" },
      {
        text: "视频",
        items: [
          { text: "YouTube", link: "https://youtube.com/zuoluotv" },
          { text: "哔哩哔哩", link: "https://space.bilibili.com/7388950" },
        ],
      },
      { text: "关于", link: "https://github.com/foru17" },
    ],
    socialLinks: [
      { icon: "twitter", link: "https://x.com/luoleiorg" },
      { icon: "github", link: "https://github.com/foru17" },
    ],

    outlineTitle: "本文导览",
    lastUpdatedText: "最后更新时间",
    footer: {
      message: `Powered By <a href="https://github.com/foru17/luoleiorg">VitePress</a>`,
      copyright: `Copyright © 2024 | <a href="https://luolei.org/">LUOLEI.ORG</a><br/>
      <a href="http://beian.miit.gov.cn/" target="_blank" rel="nofollow" class="d-none d-lg-inline-block">粤ICP备14004235号</a>
      `,
    },
  },
});
