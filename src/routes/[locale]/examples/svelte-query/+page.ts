import {
  PROJECTS_QUERY_KEYS,
  TODOS_QUERY_KEYS,
} from "$examples/svelte-query/core/services/todos/queries/keys";
import { fetchProjects, fetchTodos } from "$services/todos/index";
import projectsStore from "$stores/projects";
import type { PageLoad } from "../../$types";

export const load: PageLoad = async ({ parent, fetch }) => {
  const { queryClient } = await parent();

  await queryClient.prefetchQuery({
    queryKey: [PROJECTS_QUERY_KEYS.PROJECTS_ALL],
    queryFn: fetchProjects({ fetch }),
  });

  await queryClient.prefetchQuery({
    queryKey: [TODOS_QUERY_KEYS.TODOS_ALL],
    queryFn: fetchTodos({ fetch }),
  });
  projectsStore.setProjects([]);
};
