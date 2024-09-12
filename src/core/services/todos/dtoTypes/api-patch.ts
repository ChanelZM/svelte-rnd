import type { TodoDto } from "./api-get";

export type ApiPatchRequest = {
  "/todos/[todoId]": Partial<TodoDto>;
};

export type ApiPatchResponse = {
  "/todos/[todoId]": TodoDto;
};
