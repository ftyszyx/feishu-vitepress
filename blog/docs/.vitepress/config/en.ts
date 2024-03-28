import { createRequire } from "module";
import { defineConfig, type DefaultTheme } from "vitepress";
const require = createRequire(import.meta.url);
const pkg = require("vitepress/package.json");
export const zh = defineConfig({
  lang: "zh-Hans",
  description: "由 Vite 和 Vue 驱动的静态站点生成器",

  themeConfig: {
    nav: [{ text: "关于", link: "https://github.com/ftyszyx" }],
    sidebar: {
      "/zh/guide/": { base: "/zh/guide/", items: sidebarGuide() },
      "/zh/reference/": { base: "/zh/reference/", items: sidebarReference() },
    },

    editLink: {
      pattern: "https://github.com/vuejs/vitepress/edit/main/docs/:path",
      text: "在 GitHub 上编辑此页面",
    },

    footer: {
      message: "基于 MIT 许可发布",
      copyright: `版权所有 © 2019-${new Date().getFullYear()} 尤雨溪`,
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    outline: {
      label: "页面导航",
    },

    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },

    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
  },
});
