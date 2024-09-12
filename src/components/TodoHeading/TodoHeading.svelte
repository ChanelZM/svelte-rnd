<script lang="ts">
  import "../../i18n";
  import { t } from "svelte-i18n";
  import type { Project } from "$models/project";
  import TodoForm from "$components/TodoForm/TodoForm.svelte";
  import Button from "../Button/Button.svelte";
  import Text from "../Text/Text.svelte";
  import VectorGraphic from "$components/VectorGraphic/VectorGraphic.svelte";

  export let projects: Project[] = [];
  export let isLoading = false;
  export let wasSuccessful = false;

  let showModal: boolean = false;

  $: if (wasSuccessful) {
    closeModal();
  }

  function closeModal() {
    showModal = false;
  }

  function openModal() {
    showModal = true;
  }
</script>

<div class="heading">
  <Text variant="h1" styling="heading1">{$t("title")}</Text>

  <div class="actions">
    <Button on:click={openModal}>
      {$t("addTodo")}
      <VectorGraphic name="icon-add" />
    </Button>
  </div>

  <TodoForm
    on:close={closeModal}
    on:submit
    submitLabel={$t("add")}
    {showModal}
    {isLoading}
    {projects}
  />
</div>

<style lang="scss">
  @use "$styles/base/variables" as *;

  .heading {
    display: flex;
    align-items: center;

    width: 100%;
    height: 5rem;
    margin-bottom: var(--spacing-large);
  }

  .actions {
    margin-left: auto;
  }
</style>
