<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Project } from "$models/project";
  import Checkbox from "../Checkbox/Checkbox.svelte";

  export let project: Project;
  export let isActive: boolean;

  const dispatch = createEventDispatcher<{ "toggle-project": string }>();
</script>

<Checkbox
  checked={isActive}
  on:change={() => dispatch("toggle-project", project.slug)}
>
  <a class="link" href="project/{project.slug}">{project.name}</a>
</Checkbox>

<style lang="scss">
  .link {
    color: var(--c-darker-grey);
    text-decoration: none;

    &:hover {
      color: var(--tc-text-primary);
    }
  }
</style>
