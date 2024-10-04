<script lang="ts">
  import Detail from "./Detail.svelte";
  import DetailsContainer from "./DetailsContainer.svelte";

  export let details: { title: string; content: string; id: number }[] = [];
</script>

<DetailsContainer>
  {#each details as { title, content, id }}
    <Detail {id} {title} {content} />
  {/each}
</DetailsContainer>
