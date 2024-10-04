<script>
  import ComponentShowCase from "$components/ComponentShowCase/ComponentShowCase.svelte";
  import Details from "$components/Details/Details.svelte";
  import DetailsContainer from "$components/Details/DetailsContainer.svelte";
  import Text from "$components/Text/Text.svelte";

  const details = [
    {
      id: 1,
      title: "Finibus Bonorum et Malorum",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 2,
      title: "Finibus Bonorum et Malorum",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 3,
      title: "Finibus Bonorum et Malorum",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];
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
