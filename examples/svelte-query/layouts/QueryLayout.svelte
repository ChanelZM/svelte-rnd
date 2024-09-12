<script lang="ts">
  import { QueryClientProvider } from "@tanstack/svelte-query";
  import { SvelteQueryDevtools } from "@tanstack/svelte-query-devtools";

  import "$styles/global.scss";

  export let data;
</script>

<QueryClientProvider client={data.queryClient}>
  <main>
    <slot />
  </main>
  <SvelteQueryDevtools />
</QueryClientProvider>
