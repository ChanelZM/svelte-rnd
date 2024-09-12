import type { Project } from "$models/project";
import type { ProjectDto } from "../dtoTypes/api-get";

// eslint-disable-next-line import/prefer-default-export
export const transformProject = (todo: ProjectDto): Project => todo;
