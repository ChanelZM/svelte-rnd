import type { TodoDto } from "./api-get";

export type ApiPostRequest = {
  "/todos": Partial<TodoDto>;
};

export type ApiPostResponse = {
  "/todos": TodoDto;
};
