// @ts-nocheck
import api from "$services/todos/api";
import projectsStore from "$stores/projects";
import type { PageLoad } from "./$types";

export const load = async ({ fetch }: Parameters<PageLoad>[0]) => {
  const projects = await api.get("/projects", { fetch });
  projectsStore.setProjects(projects);

  return {
    projects,
  };
};
