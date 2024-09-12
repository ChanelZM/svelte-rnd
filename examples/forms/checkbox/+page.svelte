<script lang="ts">
  import { createForm } from "felte";
  import { validator } from "@felte/validator-zod";
  import LanguageSchema from "../validation/LanguageSchema";

  const languages = ["Dutch", "German", "Polish"];

  const { form, data } = createForm({
    initialValues: {
      languages: [],
    },
    touchOnChange: true,
    extend: [validator({ schema: LanguageSchema })],
    onSubmit: async () => {
      const requestData = { languages: data.languages };
    },
  });
  $: data.languages = data.languages ?? [];
</script>

<form use:form>
  <legend class="">Select Language(s):</legend>
  {#each languages as language}
    <label for={language}>{language}</label>
    <input
      type="checkbox"
      name={language}
      value={language}
      bind:group={data.languages}
      id={language}
    />
  {/each}
  <button type="submit">Submit</button>
</form>
