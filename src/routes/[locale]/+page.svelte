<script lang="ts">
  import "../../i18n";
  import { onMount } from "svelte";
  import { t } from "svelte-i18n";
  import type { TodoDto } from "$services/todos/dtoTypes/api-get.js";
  import LanguageSwitcher from "$components/LanguageSwitcher/LanguageSwitcher.svelte";
  import ProjectList from "$components/ProjectList/ProjectList.svelte";
  import TodoForm from "$components/TodoForm/TodoForm.svelte";
  import TodoList from "$components/TodoList/TodoList.svelte";
  import { fetchTodos, updateTodo } from "$services/todos";
  import asyncStore from "$stores/asyncStore.js";
  import projectsStore from "$stores/projects";
  import TodoHeadingConnector from "../../connectors/TodoHeadingConnector.svelte";

  export let data;

  let editTodoId = "";

  const todosStore = asyncStore<TodoDto[]>();
  const updateStore = asyncStore();
  const { setActiveProject, activeProjects } = projectsStore;

  $: unfilteredTodos = $todosStore.data || [];
  $: editTodo = unfilteredTodos.find((todo) => todo.id === editTodoId);
  $: if ($updateStore.status === "success") {
    updateInterface();
    cancelEditing();
    updateStore.setStatus("idle");
  }
  $: todos =
    $activeProjects.length > 0
      ? unfilteredTodos.filter((todo) =>
          $activeProjects.includes(todo.project?.slug || ""),
        )
      : unfilteredTodos;

  async function onSubmit(event: Event) {
    const form = event.target as HTMLFormElement;
    const project = data.projects.find(
      (projectObj) => projectObj.id === form.projects.value,
    );

    await updateStore.execute(() =>
      updateTodo({
        description: form.description.value,
        dueDate: form.dueDate.value,
        project,
        id: editTodoId,
      }),
    );
  }

  async function getTodos() {
    await todosStore.execute(() => fetchTodos());
  }

  function openEditing(e: CustomEvent<string>) {
    editTodoId = e.detail;
  }

  function cancelEditing() {
    editTodoId = "";
  }

  async function updateInterface() {
    await getTodos();
  }

  onMount(getTodos);
</script>

<svelte:head>
  <title>Svelte Boilerplate</title>
</svelte:head>

<div class="wrapper">
  <aside class="filter">
    <ProjectList
      on:toggle-project={(e) => setActiveProject(e.detail)}
      projects={data.projects}
      activeProjects={$projectsStore.activeProjects}
    />
  </aside>

  <div class="list">
    <TodoHeadingConnector
      projects={data.projects}
      on:refresh={updateInterface}
    />

    {#if $todosStore.status === "pending" || ($todosStore.status === "idle" && !$todosStore.data)}
      <span>Loading todos...</span>
    {:else if $todosStore.status === "error"}
      <span>Error: {$todosStore.error}</span>
    {:else}
      <TodoList {todos} on:edit={openEditing} on:refresh={updateInterface} />
    {/if}
  </div>

  <TodoForm
    on:close={cancelEditing}
    on:submit={onSubmit}
    showModal={!!editTodoId}
    isLoading={$updateStore.status === "pending"}
    projects={data.projects}
    description={editTodo?.description}
    date={editTodo?.dueDate
      ? new Date(editTodo.dueDate).toISOString().split("T")[0]
      : ""}
    projectId={editTodo?.project?.id}
    submitLabel={$t("update")}
  />
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    justify-content: center;
  }

  .filter {
    min-width: 20rem;
    margin-top: 5rem;
  }

  .list {
    width: 100%;
  }
</style>
