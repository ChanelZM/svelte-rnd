import dayjs from "dayjs";
import type { Todo } from "$models/todo";

export default function sortTodosByDueDate(unsortedTodos: Todo[]) {
  const todosWithDueDate = unsortedTodos.filter((todo) => !!todo.dueDate);

  const sorted = todosWithDueDate.sort((a, b) => {
    if (dayjs(a.dueDate).isBefore(b.dueDate)) return -1;
    if (dayjs(a.dueDate).isAfter(b.dueDate)) return 1;

    return 0;
  });

  return [...sorted, ...unsortedTodos.filter((todo) => !todo.dueDate)];
}
