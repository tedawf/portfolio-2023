export default (
  projects: any[],
  {
    filterDrafts = true,
    filterFutureDates = true,
    sortByDate = true,
    limit = undefined as number | undefined,
  } = {}
) => {
  const filteredProjects = projects.reduce((acc: any, project: any) => {
    const { date, draft } = project.data;

    if (filterDrafts && draft) return acc;

    if (filterFutureDates && new Date(date) > new Date()) return acc;

    acc.push(project);

    return acc;
  }, []);

  if (sortByDate) {
    // https://github.com/microsoft/TypeScript/issues/5710
    filteredProjects.sort(
      (a: any, b: any) => +new Date(b.data.date) - +new Date(a.data.date)
    );
  } else {
    filteredProjects.sort(() => Math.random() - 0.5);
  }

  if (typeof limit === "number") {
    return filteredProjects.slice(0, limit);
  }

  return filteredProjects;
};
