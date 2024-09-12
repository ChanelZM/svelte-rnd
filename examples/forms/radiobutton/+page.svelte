<script lang="ts">
  import { createForm } from "felte";
  import { validator } from "@felte/validator-zod";
  import RoleSchema from "../validation/RoleSchema";

  enum UserRole {
    SYSTEM_ADMIN = "admin",
    PROJECT_ADMIN = "projectAdmin",
    USER = "regularUser",
  }

  let currentUser = "regularUser";

  $: selectedRole = currentUser;

  const { form, data } = createForm({
    initialValues: {
      role: selectedRole,
    },
    touchOnChange: true,
    extend: [validator({ schema: RoleSchema })],
    onSubmit: async () => {
      const requestData = { role: data.role };
    },
  });

  $: data.role = selectedRole;
</script>

<form use:form>
  <legend>Select role:</legend>
  <label for="regularUser">User</label>
  <input
    type="radio"
    id="regularUser"
    value={UserRole.USER}
    bind:group={selectedRole}
    name="role"
  />
  <label for="projectAdmin">Project admin</label>
  <input
    type="radio"
    id="projectAdmin"
    value={UserRole.PROJECT_ADMIN}
    bind:group={selectedRole}
    name="role"
  />
  <label for="admin">Admin</label>
  <input
    type="radio"
    id="admin"
    value={UserRole.SYSTEM_ADMIN}
    bind:group={selectedRole}
    name="role"
  />
  <button type="submit"> Submit </button>
</form>
