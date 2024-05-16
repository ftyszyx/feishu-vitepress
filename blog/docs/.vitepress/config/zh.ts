import { defineConfig } from "vitepress";
import sidebar from "../../sider.json";
export const zh = defineConfig({
  title: "超级小朋友日常",
  lang: "zh-Hans",
  description: "个人博客",

  themeConfig: {
    nav: [{ text: "关于", link: "https://github.com/ftyszyx" }],
    outlineTitle: "本文导览",
    lastUpdatedText: "最后更新时间",
    editLink: {
      pattern: "https://github.com/vuejs/vitepress/edit/main/docs/:path",
      text: "在 GitHub 上编辑此页面",
    },
    sidebar: sidebar,
    footer: {
      message: "基于 MIT 许可发布",
      copyright: `版权所有 © 2019-${new Date().getFullYear()} 张雨鑫<br/>
          <a href="http://beian.miit.gov.cn/" target="_blank" rel="nofollow" class="d-none d-lg-inline-block">
粤ICP备2024236057号</a>
      `,
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
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
