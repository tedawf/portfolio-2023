import type { MarkdownInstance } from "astro";

export default (projects: MarkdownInstance<Record<string, any>>[], {
  filterDrafts = true, filterFutureDates = true, sortByDate = true, limit = undefined as number | undefined
} = {}) => {
  const filteredProjects = projects.reduce((acc, project) => {
    const { date, draft } = project.frontmatter;

    if (filterDrafts && draft) return acc;

    if (filterFutureDates && new Date(date) > new Date()) return acc;

    acc.push(project);

    return acc;
  }, [] as MarkdownInstance<Record<string, any>>[]);

  if (sortByDate) {
    // https://github.com/microsoft/TypeScript/issues/5710
    filteredProjects.sort((a: any, b: any) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date));
  } else {
    filteredProjects.sort(() => Math.random() - 0.5);
  }

  if (typeof limit === "number") {
    return filteredProjects.slice(0, limit);
  }

  return filteredProjects;
}