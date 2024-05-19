export const get_uami_id_by_host = (hostname: string) => {
  if (hostname.indexOf("bytefuse") > 0) {
    return SiteConfig.byte_fuse_website_id;
  }
  if (hostname.indexOf("github") > 0) {
    return SiteConfig.github_umami_website_id;
  }
  return "";
};
export const SiteConfig = {
  categorys: [
    {
      name: "hot",
    },
    {
      name: "daily_life",
    },
    {
      name: "sport",
    },
    {
      name: "skill",
    },
    {
      name: "financing",
    },
    {
      name: "product",
    },
  ],
  artalk: {
    site: "myblog",
    server: "https://arktalk_blog.qiancizhan.com/",
  },
  //lcoal test
  // umami_url: "http://localhost:3000",
  // umami_script: "http://localhost:3000/script.js",
  // umami_website_id: "132ba91a-f8e4-4a19-b316-20b6267923ad",
  //cloudflare
  // umami_url: "https://umami_blog.qiancizhan.com",
  // umami_script: "https://umami_blog.qiancizhan.com/script.js",
  // umami_website_id: "8cf20240-e118-4863-8665-598549bec563",
  //bytefuse
  umami_url: "https://umami.bytefuse.cn",
  umami_script: "https://umami.bytefuse.cn/script.js",
  byte_fuse_website_id: "8186755e-1054-407b-8f79-51d9692ff4f2",
  github_umami_website_id: "8cf20240-e118-4863-8665-598549bec563",
  get_umami_website_id: () => {
    const hostname = window.location.hostname;
    return get_uami_id_by_host(hostname);
  },
  github_url: "https://github.com/ftyszyx",
  twitter_url: "https://twitter.com/zhangyuxin_new",
};
