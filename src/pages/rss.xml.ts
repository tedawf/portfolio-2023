import rss, { pagesGlobToRssItems } from "@astrojs/rss";
import filterProjects from "../utils/filterProjects";
import type { CollectionEntry } from "astro:content";

const postImportResult = await pagesGlobToRssItems(
  import.meta.glob("./projects/**/*.md", { eager: true })
);
const projects: CollectionEntry<"projects">[] = filterProjects(
  Object.values(postImportResult)
);

export const get = () =>
  rss({
    stylesheet: "/rss/styles.xsl",
    title: "Ted's Portfolio",
    description: "My personal portfolio created with the Astro framework",
    site: import.meta.env.SITE,
    items: projects.map((project) => ({
      link: project.slug,
      title: project.data.title,
      pubDate: project.data.date,
      description: project.data.description,
      customData: `
    <author>${project.data.author}</author>
    `,
    })),
  });
