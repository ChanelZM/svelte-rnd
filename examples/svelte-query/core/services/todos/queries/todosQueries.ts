import { createMutation, createQuery } from "@tanstack/svelte-query";
import type { Todo } from "$models/todo";

import { TODOS_QUERY_KEYS } from "./keys";
import {
  addTodo,
  deleteTodo,
  fetchTodos,
  setTodoToDone,
  updateTodo,
} from "$services/todos";

type TodosQueriesParamType = {
  enabled?: boolean;
};

const todosQueries = {
  getAllTodos: ({ enabled = true }: Partial<TodosQueriesParamType> = {}) =>
    createQuery({
      queryKey: [TODOS_QUERY_KEYS.TODOS_ALL],
      queryFn: fetchTodos,
      enabled,
    }),
  setTodoToDone: () =>
    createMutation({
      mutationFn: ({ id, done }: { id: string; done: boolean }) =>
        setTodoToDone(id, done),
    }),
  deleteTodo: () =>
    createMutation({
      mutationFn: (id: string) => deleteTodo(id),
    }),
  updateTodo: () =>
    createMutation({
      mutationFn: (todo: Partial<Todo>) => updateTodo(todo),
    }),
  addTodo: () =>
    createMutation({
      mutationFn: (todo: Partial<Todo>) => addTodo(todo),
    }),
};

export default todosQueries;
