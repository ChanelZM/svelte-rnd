<script context="module" lang="ts">
  export const detailKey: Writable<number> | null = null;
</script>

<script lang="ts">
  import { setContext } from "svelte";
  import type { Writable } from "svelte/store";
  import { writable } from "svelte/store";
  setContext(detailKey, writable(null));
</script>

<slot />
