import rss from '@astrojs/rss';
import filterProjects from "../utils/filterProjects";

const postImportResult = import.meta.glob("./projects/**/*.md", { eager: true });
const posts = filterProjects(Object.values(postImportResult));

export const get = () => rss({
  stylesheet: "/rss/styles.xsl",
  title: "Ted's Portfolio",
  description: "A website displaying all of my developer work"
  , site: import.meta.env.SITE,
  items: posts.map((post) => ({
    link: post.url,
    title: post.frontmatter.title,
    pubDate: post.frontmatter.date,
    description: post.frontmatter.description,
    customData: `
    <author>${post.frontmatter.author}</author>
    `
  })),
});