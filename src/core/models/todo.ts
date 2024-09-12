import type { Project } from "./project";

export type Todo = {
  id: string;
  description: string;
  project?: Project;
  dueDate?: string;
  done?: boolean;
};
