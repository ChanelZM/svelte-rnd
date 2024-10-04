<script>
  import ComponentShowCase from "$components/ComponentShowCase/ComponentShowCase.svelte";
  import Details from "$components/Details/Details.svelte";
  import Text from "$components/Text/Text.svelte";
  import { details } from "$src/constants/dummy-data";
</script>

<main class="container">
  <Text variant="h1" styling="heading1" class="heading">Components</Text>
  <div class="content">
    <ComponentShowCase title="Details">
      <Details {details} />
    </ComponentShowCase>
  </div>
</main>

<style>
  main {
    padding: var(--spacing-large);
  }

  .container :global(.heading) {
    margin-bottom: var(--spacing-large);
  }

  .content {
    display: grid;
    gap: var(--spacing-large);
  }
</style>
