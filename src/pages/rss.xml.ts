import rss, { pagesGlobToRssItems } from "@astrojs/rss";
import filterProjects from "../utils/filterProjects";
import { CollectionEntry, getCollection } from "astro:content";

export async function get() {
  const projects = await getCollection("projects");
  const filteredProjects: CollectionEntry<"projects">[] =
    filterProjects(projects);

  return rss({
    stylesheet: "/rss/styles.xsl",
    title: "Ted's Portfolio",
    description: "My personal portfolio created with the Astro framework",
    site: import.meta.env.SITE,
    items: filteredProjects.map((project) => ({
      title: project.data.title,
      pubDate: project.data.date,
      description: project.data.description,
      customData: `<author>${project.data.author}</author>`,
      link: `/projects/${project.slug}/`,
    })),
  });
}
