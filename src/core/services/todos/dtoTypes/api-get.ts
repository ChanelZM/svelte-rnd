/**
 * DTO (Data Transfer Objects) are types defined by the (external) API
 */

export type ApiGetResponse = {
  "/todos": TodoDto[];
  "/projects": ProjectDto[];
};

export type TodoDto = {
  id: string;
  description: string;
  project?: ProjectDto;
  dueDate?: string;
  done?: boolean;
};

export type ProjectDto = {
  id: string;
  name: string;
  slug: string;
};
