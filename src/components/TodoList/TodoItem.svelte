<script lang="ts">
  import "../../i18n";
  import dayjs from "dayjs";
  import { createEventDispatcher } from "svelte";
  import { t } from "svelte-i18n";
  import type { Project } from "$models/project";
  import Checkbox from "$components/Checkbox/Checkbox.svelte";
  import Button from "../Button/Button.svelte";
  import Card from "../Card/Card.svelte";
  import Stack from "../Stack/Stack.svelte";
  import Text from "../Text/Text.svelte";

  export let id: string;
  export let description: string;
  export let project: Project | undefined = undefined;
  export let done: boolean | undefined = undefined;
  export let dueDate: string | undefined = undefined;
  export let isDeleting = false;
  export let isDoneChanging = false;

  const dispatch = createEventDispatcher<{
    edit: string;
    delete: void;
    done: void;
  }>();
</script>

<Card>
  <article class="wrapper" class:done>
    <div class="header">
      <Text variant="h2" styling="section" class="description">
        {description}
      </Text>
      <div class="checkbox-column">
        <Checkbox
          checked={done || false}
          on:change={() => dispatch("done")}
          disabled={isDeleting || isDoneChanging}
        />
      </div>
    </div>

    <div class="body">
      {#if project}
        <div class="project">
          <Text styling="subhead-sm">{project.name}</Text>
        </div>
      {/if}

      {#if dueDate}
        <div class="due-date">
          <Text variant="span" styling="copy">
            {dayjs(dueDate).format("DD MMM YYYY HH:mm")}
          </Text>
        </div>
      {/if}
    </div>

    <div class="actions">
      <Stack align="start" horizontal smallGap wrap>
        <Button
          on:click={() => dispatch("edit", id)}
          type="button"
          small
          fullwidth
          variant="primary-outline"
          disabled={isDeleting || isDoneChanging}
        >
          {$t("edit")}
        </Button>
        <Button
          on:click={() => dispatch("delete")}
          type="button"
          small
          fullwidth
          disabled={isDoneChanging}
        >
          {$t("delete")}
        </Button>
      </Stack>
    </div>
  </article>
</Card>

<style lang="scss">
  .wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 20rem; /* 320px */
  }

  .header {
    display: flex;
  }

  .done {
    opacity: 0.5;
  }

  .checkbox-column {
    margin-left: auto;
    padding: 0.2rem 0 0 1rem;
  }

  .project {
    margin-top: var(--spacing-small);
    color: var(--tc-text-secondary);
  }

  .due-date {
    margin-top: var(--spacing-large);
    color: var(--tc-text-secondary);
  }

  .actions {
    margin-top: auto;
  }
</style>
