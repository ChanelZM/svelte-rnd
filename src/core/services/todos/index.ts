import type { Todo } from "$models/todo";
import api, { type RequestConfig } from "./api";

export const fetchTodos = async (config?: RequestConfig) =>
  api.get("/todos", config);

export const setTodoToDone = async (id: string, done: boolean) =>
  api.put(
    "/todos/[todoId]",
    {
      done,
    },
    { params: { todoId: id } },
  );

export const fetchProjects = async (config?: RequestConfig) =>
  api.get("/projects", config);

export const deleteTodo = async (id: string) =>
  api.delete("/todos/[todoId]", { params: { todoId: id } });

export const updateTodo = async (todo: Partial<Todo>) =>
  api.put(
    `/todos/[todoId]`,
    {
      description: todo.description,
      dueDate: todo.dueDate,
      project: todo.project,
    },
    { params: { todoId: todo.id } },
  );

export const addTodo = async (todo: Partial<Todo>) =>
  api.post("/todos", {
    description: todo.description,
    dueDate: todo.dueDate,
    project: todo.project,
  });
