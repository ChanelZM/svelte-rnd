import type { LayoutLoad } from "./$types";
import initializeQueryClient from "$examples/svelte-query/utils/initializeQueryClient";

export const load: LayoutLoad = async () => {
  const queryClient = initializeQueryClient();

  return { queryClient };
};
