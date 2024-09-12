<script lang="ts">
  import "../../i18n";
  import { createEventDispatcher } from "svelte";
  import { t } from "svelte-i18n";
  import type { Project } from "$models/project";
  import Button from "$components/Button/Button.svelte";
  import FormLabel from "$components/FormLabel/FormLabel.svelte";
  import FormRow from "$components/FormRow/FormRow.svelte";
  import InputDate from "$components/InputDate/InputDate.svelte";
  import InputText from "$components/InputText/InputText.svelte";
  import Modal from "$components/Modal/Modal.svelte";
  import Select from "$components/Select/Select.svelte";
  import SelectOption from "$components/Select/SelectOption.svelte";

  export let projects: Project[] = [];
  export let showModal = false;
  export let description = "";
  export let isLoading = false;
  export let date = "";
  export let projectId = "";
  export let submitLabel;

  const dispatch = createEventDispatcher<{ close: void }>();
</script>

<Modal show={showModal} on:close>
  <form on:submit|preventDefault class="form">
    <h1 class="title">
      {$t("addTodo")}
    </h1>
    <FormRow>
      <FormLabel forId="description" text={$t("description")} />
      <InputText id="description" name="description" value={description} />
    </FormRow>
    <FormRow>
      <FormLabel forId="dueDate" text={$t("dueDate")} />
      <InputDate id="dueDate" name="dueDate" value={date} />
    </FormRow>
    <Select id="projects" value={projectId} required>
      <SelectOption value="" text={$t("selectProject")} />
      {#each projects as project}
        <SelectOption value={project.id} text={project.name} />
      {/each}
    </Select>

    <div class="buttons">
      <Button
        type="button"
        disabled={isLoading}
        on:click={() => dispatch("close")}>{$t("cancel")}</Button
      >
      <Button type="submit" {isLoading}>{submitLabel}</Button>
    </div>
  </form>
</Modal>

<style lang="scss">
  .form {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  .title {
    margin: 0;
    font-size: 1.5rem;
  }

  .buttons {
    display: flex;
    gap: 1em;
    justify-content: flex-end;
  }
</style>
