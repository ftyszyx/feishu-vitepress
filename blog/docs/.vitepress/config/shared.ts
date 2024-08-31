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
    [
      "meta",
      {
        name: "baidu-site-verification",
        content: "codeva-KpXMMPlGpy",
      },
    ],
    [
      "meta",
      {
        name: "360-site-verification",
        content: "d8dbb00e86292f00d342f12e11ca613b",
      },
    ],
    [
      "meta",
      {
        name: "sogou_site_verification",
        content: "V0YDh3BMvX",
      },
    ],
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
    // const assert_path = path.join(siteconfig.root, siteconfig.assetsDir);
    // const out_path = path.join(siteconfig.outDir, siteconfig.assetsDir);
    // fs.readdirSync(assert_path, { withFileTypes: true }).forEach(
    //   function (dirent) {
    //     var filePath = path.join(assert_path, dirent.name);
    //     if (dirent.isFile && dirent.name.endsWith(".zip")) {
    //       var destpath = path.join(out_path, dirent.name);
    //       fs.copyFileSync(filePath, destpath);
    //       console.log(`copy zip file:${filePath}->${destpath}`);
    //     }
    //   },
    // );

    // coverurls.forEach((item) => {
    //   // console.log("item", item, siteconfig.root);
    //   const picpath = path.join(siteconfig.root, item);
    //   const picfile_name = path.basename(picpath);
    //   if (picfile_name === "normal_cover.png") return;
    //   const destpath = path.join(
    //     siteconfig.outDir,
    //     siteconfig.assetsDir,
    //     picfile_name,
    //   );
    //   // console.log("copy pic", picpath, destpath);
    //   fs.copyFileSync(picpath, destpath);
    // });
    //copy all asset file to dist
    const assetsrcpath = path.join(siteconfig.root, siteconfig.assetsDir);
    const items = fs.readdirSync(assetsrcpath, { withFileTypes: true });
    items.forEach((item) => {
      const srcpath = path.join(assetsrcpath, item.name);
      const destpath = path.join(
        siteconfig.outDir,
        siteconfig.assetsDir,
        item.name,
      );
      if (item.isFile) {
        // console.log("copy file", srcpath, destpath);
        fs.copyFileSync(srcpath, destpath);
      }
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
