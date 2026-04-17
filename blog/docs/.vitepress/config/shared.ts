import { createContentLoader, defineConfig, HeadConfig } from "vitepress";
import * as path from "path";
import * as fs from "fs";
import { SiteConfig } from "../theme/site_config";

const base_url = process.env.BASE_URL || "/";
const host_name = process.env.HOST_NAME || "https://blog.bytefuse.cn/";
const defaultSiteKeywords =
  "技术博客,AI,工具开发,自动化,编程,项目记录,生活随想,独立博客";
const defaultSiteDescription =
  "记录技术实践、AI 工具、项目开发、自动化探索与生活随想的个人博客。";
const defaultEnDescription =
  "A personal blog about software, AI tools, automation, product experiments and daily notes.";

type SeoPageMeta = {
  title?: string;
  description?: string;
  keywords?: string;
  cover?: string;
  createTime?: number;
  editTime?: number;
};

let pageSeoMetaPromise: Promise<Record<string, SeoPageMeta>> | undefined;

export const shared = defineConfig({
  cleanUrls: true,
  appearance: true,
  sitemap: {
    hostname: host_name,
    transformItems: async (items) => {
      const pageSeoMeta = await loadPageSeoMeta();
      return items.map((item) => {
        const relativePath = urlToRelativePath(
          new URL(item.url, host_name).pathname,
        );
        const seoMeta = pageSeoMeta[relativePath];
        const lastmod = seoMeta?.editTime ?? seoMeta?.createTime;
        if (!lastmod) {
          return item;
        }
        return {
          ...item,
          lastmod: new Date(lastmod * 1000).toISOString(),
        };
      });
    },
  },
  ignoreDeadLinks: true,
  base: base_url,
  head: [
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
  ],
  buildEnd: async (siteconfig) => {
    await createContentLoader("/*.md", {
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

    const assetsrcpath = path.join(siteconfig.root, siteconfig.assetsDir);
    const items = fs.readdirSync(assetsrcpath, { withFileTypes: true });
    items.forEach((item: fs.Dirent) => {
      const srcpath = path.join(assetsrcpath, item.name);
      const destpath = path.join(
        siteconfig.outDir,
        siteconfig.assetsDir,
        item.name,
      );
      if (item.isFile()) {
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
    config: (_md) => {},
  },
  transformPageData: async (pageData) => {
    const pageSeoMeta = await loadPageSeoMeta();
    const seoMeta = pageSeoMeta[pageData.relativePath];
    const title =
      normalizeTitle(
        pageData.frontmatter.title ??
          pageData.frontmatter.Title ??
          seoMeta?.title ??
          pageData.title,
      ) || pageData.title;
    const description =
      seoMeta?.description ??
      getDefaultDescription(pageData.relativePath, title);
    const keywords =
      seoMeta?.keywords ??
      normalizeKeywords(pageData.frontmatter.keywords) ??
      defaultSiteKeywords;

    return {
      title,
      description,
      frontmatter: {
        ...pageData.frontmatter,
        title,
        description,
        keywords,
      },
    };
  },
  transformHead: async ({ pageData, siteData }) => {
    const pageSeoMeta = await loadPageSeoMeta();
    const seoMeta = pageSeoMeta[pageData.relativePath];
    const title =
      normalizeTitle(
        pageData.frontmatter.title ??
          pageData.frontmatter.Title ??
          seoMeta?.title ??
          pageData.title,
      ) || pageData.title;
    const description =
      pageData.description ||
      seoMeta?.description ||
      getDefaultDescription(pageData.relativePath, title);
    const keywords =
      seoMeta?.keywords ??
      normalizeKeywords(pageData.frontmatter.keywords) ??
      defaultSiteKeywords;
    const canonicalUrl = toAbsolutePageUrl(pageData.relativePath);
    const coverUrl = toAbsoluteAssetUrl(
      seoMeta?.cover ??
        (typeof pageData.frontmatter.cover === "string"
          ? pageData.frontmatter.cover
          : "/normal_cover.png"),
    );
    const locale = pageData.relativePath.startsWith("en/") ? "en_US" : "zh_CN";
    const robots = pageData.isNotFound
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large";
    const ogType = pageData.frontmatter.layout === "home" ? "website" : "article";
    const head: HeadConfig[] = [];

    head.push(["link", { rel: "canonical", href: canonicalUrl }]);
    head.push(["meta", { name: "robots", content: robots }]);
    head.push(["meta", { property: "og:type", content: ogType }]);
    head.push(["meta", { property: "og:site_name", content: siteData.title }]);
    head.push(["meta", { property: "og:url", content: canonicalUrl }]);
    head.push(["meta", { property: "og:locale", content: locale }]);
    head.push(["meta", { property: "og:title", content: title }]);
    head.push(["meta", { property: "og:description", content: description }]);
    head.push(["meta", { name: "twitter:card", content: "summary_large_image" }]);
    head.push(["meta", { name: "twitter:title", content: title }]);
    head.push(["meta", { name: "twitter:description", content: description }]);
    if (coverUrl) {
      head.push(["meta", { property: "og:image", content: coverUrl }]);
      head.push(["meta", { name: "twitter:image", content: coverUrl }]);
    }
    if (keywords) {
      head.push(["meta", { name: "keywords", content: keywords }]);
    }
    if (ogType === "article" && pageData.frontmatter.create_time) {
      head.push([
        "meta",
        {
          property: "article:published_time",
          content: new Date(
            Number(pageData.frontmatter.create_time) * 1000,
          ).toISOString(),
        },
      ]);
    }
    if (ogType === "article" && pageData.frontmatter.edit_time) {
      head.push([
        "meta",
        {
          property: "article:modified_time",
          content: new Date(
            Number(pageData.frontmatter.edit_time) * 1000,
          ).toISOString(),
        },
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

function loadPageSeoMeta(): Promise<Record<string, SeoPageMeta>> {
  if (!pageSeoMetaPromise) {
    pageSeoMetaPromise = createContentLoader(["/*.md", "/en/*.md"], {
      includeSrc: true,
      render: false,
      transform: (rawData) => {
        const pageMeta: Record<string, SeoPageMeta> = {};
        rawData.forEach(({ frontmatter, src, url }) => {
          const relativePath = urlToRelativePath(url);
          const title = normalizeTitle(frontmatter.title ?? frontmatter.Title);
          pageMeta[relativePath] = {
            title,
            description: resolveDescription(
              frontmatter.description,
              src,
              title,
              relativePath,
            ),
            keywords: normalizeKeywords(frontmatter.keywords),
            cover:
              typeof frontmatter.cover === "string"
                ? frontmatter.cover
                : "/normal_cover.png",
            createTime: toTimestamp(frontmatter.create_time),
            editTime: toTimestamp(frontmatter.edit_time),
          };
        });
        return pageMeta;
      },
    }).load();
  }
  return pageSeoMetaPromise;
}

function urlToRelativePath(url: string): string {
  const pathname = stripBasePath(url).replace(/^\/+/, "");
  if (!pathname) {
    return "index.md";
  }
  if (pathname.endsWith("/")) {
    return `${pathname}index.md`;
  }
  return `${pathname}.md`;
}

function stripBasePath(url: string): string {
  const pathname = url.startsWith("http")
    ? new URL(url).pathname
    : new URL(url, host_name).pathname;
  const basePath = new URL(host_name).pathname.replace(/\/+$/, "");
  if (basePath && pathname.startsWith(basePath)) {
    const trimmed = pathname.slice(basePath.length);
    return trimmed || "/";
  }
  return pathname || "/";
}

function toAbsolutePageUrl(relativePath: string): string {
  return new URL(relativePathToRoute(relativePath), host_name).toString();
}

function relativePathToRoute(relativePath: string): string {
  if (relativePath === "index.md") {
    return "";
  }
  return relativePath.replace(/index\.md$/, "").replace(/\.md$/, "");
}

function toAbsoluteAssetUrl(assetPath: string): string {
  if (/^https?:\/\//i.test(assetPath)) {
    return assetPath;
  }
  return new URL(assetPath.replace(/^\/+/, ""), host_name).toString();
}

function normalizeTitle(title: unknown): string {
  if (typeof title !== "string") {
    return "";
  }
  return title.replace(/\s+/g, " ").trim();
}

function normalizeKeywords(keywords: unknown): string | undefined {
  if (Array.isArray(keywords)) {
    const values = keywords
      .map((item) => (typeof item === "string" ? item.trim() : ""))
      .filter(Boolean);
    return values.length > 0 ? values.join(", ") : undefined;
  }
  if (typeof keywords === "string") {
    const normalized = keywords.replace(/\s+/g, " ").trim();
    return normalized || undefined;
  }
  return undefined;
}

function toTimestamp(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string" && value.trim()) {
    const timestamp = Number(value);
    if (Number.isFinite(timestamp)) {
      return timestamp;
    }
  }
  return undefined;
}

function resolveDescription(
  frontmatterDescription: unknown,
  source: string | undefined,
  title: string | undefined,
  relativePath: string,
): string {
  if (typeof frontmatterDescription === "string") {
    const normalized = normalizeDescription(frontmatterDescription);
    if (normalized) {
      return normalized;
    }
  }
  const extracted = source ? extractDescriptionFromSource(source) : "";
  if (extracted) {
    return extracted;
  }
  return getDefaultDescription(relativePath, title);
}

function getDefaultDescription(
  relativePath: string,
  title: string | undefined,
): string {
  if (relativePath.startsWith("en/")) {
    return title ? `${title}. ${defaultEnDescription}` : defaultEnDescription;
  }
  return title ? `${title}。${defaultSiteDescription}` : defaultSiteDescription;
}

function extractDescriptionFromSource(source: string): string {
  const withoutFrontmatter = source.replace(
    /^---\s*[\r\n]+[\s\S]*?[\r\n]+---\s*[\r\n]*/u,
    "",
  );
  const sanitized = withoutFrontmatter
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/~~~[\s\S]*?~~~/g, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ");
  const parts: string[] = [];

  for (const line of sanitized.split(/\r?\n/)) {
    if (parts.join(" ").length >= 150) {
      break;
    }
    const normalizedLine = normalizeMarkdownLine(line);
    if (!normalizedLine) {
      continue;
    }
    parts.push(normalizedLine);
  }

  return trimDescription(parts.join(" "));
}

function normalizeMarkdownLine(line: string): string {
  const trimmed = line.trim();
  if (!trimmed) {
    return "";
  }
  if (
    trimmed.startsWith("#") ||
    trimmed.startsWith("![](") ||
    trimmed.startsWith("<img") ||
    trimmed.startsWith("<Image") ||
    /^https?:\/\/\S+$/i.test(trimmed) ||
    /^[-*_]{3,}$/u.test(trimmed) ||
    trimmed.startsWith("|")
  ) {
    return "";
  }

  const plainText = trimmed
    .replace(/^>\s*/g, "")
    .replace(/^[-*+]\s+/g, "")
    .replace(/^\d+\.\s+/g, "")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[`*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return plainText.length < 2 ? "" : plainText;
}

function normalizeDescription(description: string): string {
  return trimDescription(description.replace(/\s+/g, " ").trim());
}

function trimDescription(description: string): string {
  const trimmed = description.trim();
  if (!trimmed) {
    return "";
  }
  if (trimmed.length <= 160) {
    return trimmed;
  }
  return `${trimmed.slice(0, 157).trimEnd()}...`;
}
