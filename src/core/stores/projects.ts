import { derived, get, writable } from "svelte/store";
import type { Project } from "$models/project";
import type { ProjectDto } from "$services/todos/dtoTypes/api-get";
import { transformProject } from "$services/todos/transformers/project-transformer";

type ProjectsState = {
  projects: Project[];
  activeProjects: string[];
};

function createProjectsStore() {
  const store = writable<ProjectsState>();
  const { subscribe, set, update } = store;

  const activeProjects = derived(store, (state) => state.activeProjects);

  function setProjects(response: ProjectDto[]) {
    set({ projects: response.map(transformProject), activeProjects: [] });
  }

  function setActiveProject(slug: string) {
    const projects = new Set(get(store).activeProjects);

    if (projects.has(slug)) {
      projects.delete(slug);
    } else {
      projects.add(slug);
    }

    update((state) => ({
      ...state,
      activeProjects: Array.from(projects),
    }));
  }

  return {
    subscribe,
    activeProjects,
    setProjects,
    setActiveProject,
  };
}

// Prefer default export for single export module
export default createProjectsStore();
