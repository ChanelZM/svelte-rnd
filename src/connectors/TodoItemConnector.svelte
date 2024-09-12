<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Project } from "$models/project";
  import TodoItem from "$components/TodoList/TodoItem.svelte";
  import { deleteTodo, setTodoToDone } from "$services/todos";
  import asyncStore from "$stores/asyncStore";

  export let id: string;
  export let description: string;
  export let project: Project | undefined = undefined;
  export let done: boolean | undefined = undefined;
  export let dueDate: string | undefined = undefined;

  const dispatch = createEventDispatcher<{
    refresh: void;
  }>();

  const deleteStore = asyncStore();
  const doneStore = asyncStore();

  $: if ($deleteStore.status === "success") {
    dispatch("refresh");
    deleteStore.setStatus("idle");
  }
  $: if ($doneStore.status === "success") {
    dispatch("refresh");
    doneStore.setStatus("idle");
  }

  async function onDelete() {
    await deleteStore.execute(() => deleteTodo(id));
  }

  async function onDone() {
    await doneStore.execute(() => setTodoToDone(id, !done));
  }
</script>

<TodoItem
  {id}
  {description}
  {project}
  {dueDate}
  {done}
  isDeleting={$deleteStore.status === "pending"}
  isDoneChanging={$doneStore.status === "pending"}
  on:edit
  on:refresh
  on:delete={onDelete}
  on:done={onDone}
/>
