import { createQuery } from "@tanstack/svelte-query";
import { PROJECTS_QUERY_KEYS } from "./keys";
import { fetchProjects } from "$services/todos";

type ProjectsQueriesParamType = {
  enabled?: boolean;
};

const projectsQueries = {
  getAllProjects: ({
    enabled = true,
  }: Partial<ProjectsQueriesParamType> = {}) =>
    createQuery({
      queryKey: [PROJECTS_QUERY_KEYS.PROJECTS_ALL],
      queryFn: fetchProjects,
      enabled,
    }),
};

export default projectsQueries;
