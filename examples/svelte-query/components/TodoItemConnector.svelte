<script lang="ts">
  import { useQueryClient } from "@tanstack/svelte-query";
  import type { Project } from "$models/project";
  import TodoItem from "$components/TodoList/TodoItem.svelte";
  import { TODOS_QUERY_KEYS } from "$examples/svelte-query/core/services/todos/queries/keys";
  import todosQueries from "$examples/svelte-query/core/services/todos/queries/todosQueries";

  export let id: string;
  export let description: string;
  export let project: Project | undefined = undefined;
  export let done: boolean | undefined = undefined;
  export let dueDate: string | undefined = undefined;

  const queryClient = useQueryClient();
  const doneMutation = todosQueries.setTodoToDone();
  const deleteMutation = todosQueries.deleteTodo();

  const onDone = async () => {
    await $doneMutation.mutate(
      { id, done: !done },
      {
        onSuccess: () =>
          queryClient.invalidateQueries({
            queryKey: [TODOS_QUERY_KEYS.TODOS_ALL],
          }),
      },
    );
  };

  const onDelete = async () => {
    await $deleteMutation.mutate(id, {
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: [TODOS_QUERY_KEYS.TODOS_ALL],
        }),
    });
  };
</script>

<TodoItem
  {id}
  {description}
  {project}
  {dueDate}
  {done}
  isDeleting={$deleteMutation.isPending}
  isDoneChanging={$doneMutation.isPending}
  on:edit
  on:refresh
  on:delete={onDelete}
  on:done={onDone}
/>
