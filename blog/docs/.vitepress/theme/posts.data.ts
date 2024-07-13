import { createContentLoader } from "vitepress";
import { formatShowDate } from "./utils";
import { LangDef, Post } from "./type_def";
declare const data: Post[];
export { data };
export default createContentLoader(["/*.md", "/en/*.md"], {
  render: true,
  excerpt: true,
  transform(raw): Post[] {
    return raw
      .filter(({ frontmatter }) => !frontmatter.hide)
      .map(({ url, frontmatter, excerpt }) => {
        // console.log("formater2", frontmatter.cover, url);
        const lan = url.startsWith("/en/") ? "en" : "zh";
        return {
          lanuage: lan,
          ...frontmatter,
          categories: frontmatter.categories || [],
          url,
          hit: 0,
          cover: frontmatter.cover || "/normal_cover.png",
          excerpt,
          date: formatDate(lan, frontmatter.create_time),
        } as Post;
      })
      .sort((a, b) => b.date.time - a.date.time);
  },
});

export function formatDate(lan: LangDef, create_time: number): Post["date"] {
  const date = new Date(create_time * 1000);
  date.setUTCHours(12);
  return {
    time: create_time,
    formatShowDate: formatShowDate(lan, date),
    string: date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
}
