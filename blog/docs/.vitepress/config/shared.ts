import { createContentLoader, defineConfig, HeadConfig } from "vitepress";
import path from "path";
import fs from "fs";
import { get_uami_id_by_host, SiteConfig } from "../theme/site_config";

const base_url = process.env.BASE_URL || "/";
console.log("get env", process.env.HOST_NAME, process.env.BASE_URL);
const host_name = process.env.HOST_NAME || "https://blog.bytefuse.cn/";
export const shared = defineConfig({
  cleanUrls: true,
  appearance: true,
  sitemap: {
    hostname: host_name,
  },
  ignoreDeadLinks: true,
  base: base_url,
  head: [
    [
      "script",
      {
        src: SiteConfig.umami_script || "",
        "data-website-id": get_uami_id_by_host(host_name) || "",
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
    const assert_path = path.join(siteconfig.root, siteconfig.assetsDir);
    const out_path = path.join(siteconfig.outDir, siteconfig.assetsDir);
    fs.readdirSync(assert_path, { withFileTypes: true }).forEach(
      function (dirent) {
        var filePath = path.join(assert_path, dirent.name);
        if (dirent.isFile && dirent.name.endsWith(".zip")) {
          var destpath = path.join(out_path, dirent.name);
          fs.copyFileSync(filePath, destpath);
          console.log(`copy zip file:${filePath}->${destpath}`);
        }
      },
    );

    coverurls.forEach((item) => {
      const picpath = path.join(siteconfig.root, item);
      const picfile_name = path.basename(picpath);
      if (picfile_name === "normal_cover.png") return;
      const destpath = path.join(
        siteconfig.outDir,
        siteconfig.assetsDir,
        picfile_name,
      );
      console.log("copy pic", picpath, destpath);
      fs.copyFileSync(picpath, destpath);
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
      level: [1, 6],
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
