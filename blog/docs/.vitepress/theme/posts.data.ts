import { createContentLoader } from "vitepress";
import { formatShowDate } from "./utils";
import { Post } from "./type_def";
declare const data: Post[];
export { data };
export default createContentLoader("/*.md", {
  render: true,
  excerpt: true,
  transform(raw): Post[] {
    // console.log("transform ");
    return raw
      .filter(({ frontmatter }) => !frontmatter.hide)
      .map(
        ({ url, frontmatter, excerpt }) =>
          ({
            ...frontmatter,
            url,
            hit: 0,
            cover: frontmatter.cover || "/normal_cover.png",
            excerpt,
            date: formatDate(frontmatter.create_time),
          }) as Post,
      )
      .sort((a, b) => b.date.time - a.date.time);
  },
});

export function formatDate(create_time: number): Post["date"] {
  const date = new Date(create_time * 1000);
  date.setUTCHours(12);
  return {
    time: create_time,
    formatShowDate: formatShowDate(date),
    string: date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
}
