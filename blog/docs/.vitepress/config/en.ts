import { defineConfig } from "vitepress";
import sidebar from "../../en/sider.json";

export const en = defineConfig({
  title: "my blog2",
  lang: "en",
  description: "my blog",
  head: [
    ["link", { rel: "icon", href: "/logo.png" }],
    [
      "meta",
      {
        name: "keywords",
        content:
          "科技,旅行,生活方式,程序员,互联网,自媒体,摄影师,编程,前端,前端工程师,独立博客,LUOLEI,Vlog,YouTuber",
      },
    ],
  ],

  themeConfig: {
    nav: [{ text: "about", link: "https://github.com/ftyszyx" }],
    outlineTitle: "guide",
    lastUpdatedText: "last update time",
    editLink: {
      pattern: "https://github.com/vuejs/vitepress/edit/main/docs/:path",
      text: "edit on this page",
    },
    sidebar: sidebar,
    footer: {
      message: "MIT",
      copyright: `© 2019-${new Date().getFullYear()} zhang.yuxin`,
    },

    docFooter: {
      prev: "pre",
      next: "next",
    },

    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
  },
});
