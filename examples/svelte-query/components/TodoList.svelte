<script lang="ts">
  import "../../../src/i18n";
  import { t } from "svelte-i18n";
  import type { Todo } from "$models/todo";
  import sortTodosByDueDate from "$utils/sortTodosByDueDate";
  import TodoItemConnector from "$examples/svelte-query/components/TodoItemConnector.svelte";

  export let todos: Todo[];

  $: sortedTodos = sortTodosByDueDate(todos);
  $: unCompletedTodos = sortedTodos.filter((todo) => !todo.done) || [];
  $: completedTodos = sortedTodos.filter((todo) => todo.done) || [];
</script>

<ul class="list">
  {#each unCompletedTodos as todo}
    <li class="list-item">
      <TodoItemConnector
        id={todo.id}
        description={todo.description}
        project={todo.project}
        dueDate={todo.dueDate}
        done={todo.done}
        on:edit
      />
    </li>
  {:else}
    <p>{$t("nothingFound")}</p>
  {/each}

  <hr class="line" />

  {#each completedTodos as todo}
    <li class="list-item">
      <TodoItemConnector
        id={todo.id}
        description={todo.description}
        project={todo.project}
        dueDate={todo.dueDate}
        done={todo.done}
        on:edit
      />
    </li>
  {/each}
</ul>

<style lang="scss">
  @use "$styles/variables" as *;

  .list {
    width: 100%;
    list-style: none;
  }

  .list-item {
    width: 100%;

    & + & {
      margin-top: var(--gutter);
    }
  }

  .line {
    margin: var(--spacing-x-large) 0;
    border: 1px solid #000;
  }
</style>
