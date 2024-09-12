// @ts-nocheck
import type { LayoutLoad } from "./$types";
import initializeQueryClient from "$examples/svelte-query/utils/initializeQueryClient";

export const load = async () => {
  const queryClient = initializeQueryClient();

  return { queryClient };
};
;null as any as LayoutLoad;