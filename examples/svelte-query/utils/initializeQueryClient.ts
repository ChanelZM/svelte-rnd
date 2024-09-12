import { QueryClient } from "@tanstack/svelte-query";
import { browser } from "$app/environment";

export default function initializeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
        staleTime: 60 * 1000,
      },
    },
  });
}
