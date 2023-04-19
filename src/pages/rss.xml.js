import rss, { pagesGlobToRssItems } from '@astrojs/rss';
import filterProjects from "../utils/filterProjects";

const postImportResult = await pagesGlobToRssItems(import.meta.glob("./projects/**/*.md", { eager: true }));
const posts = filterProjects(Object.values(postImportResult));

export const get = () => rss({
  stylesheet: "/rss/styles.xsl",
  title: "Ted's Portfolio",
  description: "My personal portfolio created with the Astro framework"
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