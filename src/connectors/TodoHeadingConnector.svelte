<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Project } from "$models/project";
  import TodoHeading from "$components/TodoHeading/TodoHeading.svelte";
  import { addTodo } from "$services/todos";
  import asyncStore from "$stores/asyncStore";

  export let projects: Project[] = [];

  const dispatch = createEventDispatcher<{ refresh: void }>();

  const addTodoStore = asyncStore();
  $: if ($addTodoStore.status === "success") {
    dispatch("refresh");
  }

  async function onSubmit(event: Event) {
    const form = event.target as HTMLFormElement;
    const project = projects.find(
      (projectObj) => projectObj.id === form.projects.value,
    );
    await addTodoStore.execute(() =>
      addTodo({
        description: form.description.value,
        dueDate: form.dueDate.value,
        project,
      }),
    );
  }
</script>

<TodoHeading
  {projects}
  on:refresh
  on:submit={onSubmit}
  isLoading={$addTodoStore.status === "pending"}
  wasSuccessful={$addTodoStore.status === "success"}
/>
