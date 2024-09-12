<script lang="ts">
  import { createForm } from "felte";
  import { validator } from "@felte/validator-zod";
  import LoginSchema from "../validation/LoginSchema";

  const { form, data, errors } = createForm({
    initialValues: {
      email: "",
      password: "",
    },
    extend: [validator({ schema: LoginSchema })],
    onSubmit: async (values) => {
      const FormData = {
        email: values.email,
        password: values.password,
      };
    },
  });
</script>

<form use:form>
  <label for="email">Email</label>
  <input type="email" id="email" bind:value={$data.email} />
  <label for="password">Password</label>
  <input type="password" id="password" bind:value={$data.password} />

  {#if $errors.password}
    <p>{$errors.password[0]}</p>
  {/if}

  {#if $errors.email}
    <p>{$errors.email[0]}</p>
  {/if}

  <button type="submit">Sign in</button>
</form>
