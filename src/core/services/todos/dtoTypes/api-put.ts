import type { TodoDto } from "./api-get";

export type ApiPutRequest = {
  "/todos/[todoId]": Partial<TodoDto>;
};

export type ApiPutResponse = {
  "/todos/[todoId]": TodoDto;
};
