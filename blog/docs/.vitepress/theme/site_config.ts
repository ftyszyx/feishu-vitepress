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
      name: "leyi",
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
    {
      name: "other_platform",
    },
  ],
  giscus: {
    repo: "ftyszyx/feishu-vitepress",
    repoId: "R_kgDOLgKBTQ",
    category: "General",
    categoryId: "DIC_kwDOLgKBTc4CjQRM",
    data_mapping: "pathname",
  },
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
