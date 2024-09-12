<script lang="ts">
  import { useQueryClient } from "@tanstack/svelte-query";
  import type { Project } from "$models/project";
  import TodoHeading from "$components/TodoHeading/TodoHeading.svelte";
  import { TODOS_QUERY_KEYS } from "$examples/svelte-query/core/services/todos/queries/keys";
  import todosQueries from "$examples/svelte-query/core/services/todos/queries/todosQueries";

  export let projects: Project[] = [];

  const queryClient = useQueryClient();
  const addMutation = todosQueries.addTodo();

  async function onSubmit(event: Event) {
    const form = event.target as HTMLFormElement;
    const project = projects.find(
      (projectObj) => projectObj.id === form.projects.value,
    );

    await $addMutation.mutate(
      {
        description: form.description.value,
        dueDate: form.dueDate.value,
        project,
      },
      {
        onSuccess: () =>
          queryClient.invalidateQueries({
            queryKey: [TODOS_QUERY_KEYS.TODOS_ALL],
          }),
      },
    );
  }
</script>

<TodoHeading
  {projects}
  on:refresh
  on:submit={onSubmit}
  isLoading={$addMutation.isPending}
  wasSuccessful={$addMutation.isSuccess}
/>
