import api from "$services/todos/api";
import projectsStore from "$stores/projects";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
  const projects = await api.get("/projects", { fetch });
  projectsStore.setProjects(projects);

  return {
    projects,
  };
};
