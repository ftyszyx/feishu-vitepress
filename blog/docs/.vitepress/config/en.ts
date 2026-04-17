import { defineConfig } from "vitepress";
import sidebar from "../../en/sider.json";

export const en = defineConfig({
  title: "yuxin's blog",
  lang: "en",
  description:
    "A personal blog about software, AI tools, automation, product experiments and daily notes.",
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
      copyright: `© 2019-${new Date().getFullYear()} `,
    },

    docFooter: {
      prev: "pre",
      next: "next",
    },

    langMenuLabel: "Language",
    returnToTopLabel: "Back to top",
    sidebarMenuLabel: "Menu",
    darkModeSwitchLabel: "Theme",
    lightModeSwitchTitle: "Switch to light mode",
    darkModeSwitchTitle: "Switch to dark mode",
  },
});
