<script lang="ts">
  import QueryLayout from "$examples/svelte-query/layouts/QueryLayout.svelte";

  export let data;
</script>

<QueryLayout {data}>
  <slot />
</QueryLayout>
