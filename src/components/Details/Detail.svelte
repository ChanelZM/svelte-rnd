<script lang="ts">
  import { getContext } from "svelte";
  import { detailKey } from "./DetailsContainer.svelte";
  import type { Writable } from "svelte/store";
  export let id: number;
  export let title: string;
  export let content: string;

  const activeDetail: Writable<number | null> = getContext(detailKey);

  function onToggle(event: Event) {
    const target = event.target as HTMLDetailsElement;
    activeDetail.set(target?.open ? id : $activeDetail);
  }
</script>

<details class="detail" open={$activeDetail === id} on:toggle={onToggle}>
  <summary class="title">{title}</summary>
  <p>{content}</p>
</details>

<style lang="scss">
  .detail {
    border-bottom: 1px solid var(--tc-decoration);
    margin-bottom: var(--spacing-medium);
    padding-bottom: var(--spacing-small);
  }
  .title {
    cursor: pointer;
  }
</style>
