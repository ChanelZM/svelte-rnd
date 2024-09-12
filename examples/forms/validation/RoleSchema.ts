import { z } from "zod";

enum UserRole {
  SYSTEM_ADMIN = "admin",
  PROJECT_ADMIN = "projectAdmin",
  USER = "regularUser",
}

const RoleSchema = z.object({
  role: z.nativeEnum(UserRole),
});

export default RoleSchema;