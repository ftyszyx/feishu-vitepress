import { createContentLoader, defineConfig, HeadConfig } from "vitepress";
import { copyFileSync } from "fs";
import path, { basename } from "path";
import { SiteConfig } from "../theme/site_config";

const base_url = process.env.BASE_URL || "/";
export const shared = defineConfig({
  cleanUrls: true,
  appearance: true,
  ignoreDeadLinks: true,
  base: base_url,
  head: [
    [
      "script",
      {
        src: SiteConfig.umami_script || "",
        "data-website-id": SiteConfig.umami_website_id || "",
      },
    ],
    // [
    //   "script",
    //   {},
    //   '(function(c,l,a,r,i,t,y){ c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)}; t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i; y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y); })(window, document, "clarity", "script", "lqpzet81i6");',
    // ],
    ["link", { rel: "icon", href: `${base_url}logo.png` }],
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
      // console.log("write", picpath, destpath, siteconfig.root);
      copyFileSync(picpath, destpath);
    });
  },
  markdown: {
    lineNumbers: true,
    math: true,
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
    if (pageData.frontmatter.keywords) {
      head.push([
        "meta",
        { name: "keywords", content: pageData.frontmatter.keywords },
      ]);
    }
    return head;
  },
  themeConfig: {
    aside: true,
    outline: {
      level: [2, 6],
    },
    search: {
      provider: "local",
    },
    logo: "./logo.png",
    socialLinks: [
      { icon: "twitter", link: SiteConfig.twitter_url },
      { icon: "github", link: SiteConfig.github_url },
    ],
  },
});
