import type { Todo } from "$models/todo";
import type { TodoDto } from "../dtoTypes/api-get";

// eslint-disable-next-line import/prefer-default-export
export const transformTodo = (todo: TodoDto): Todo => todo;
