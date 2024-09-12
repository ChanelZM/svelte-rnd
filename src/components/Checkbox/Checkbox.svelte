<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let checked: boolean;
  export let disabled: boolean | undefined = undefined;

  const dispatch = createEventDispatcher<{ change: boolean }>();
</script>

<label for="" class="wrapper">
  <input
    on:change={(e) => dispatch("change", e.currentTarget.checked)}
    type="checkbox"
    class="checkbox"
    aria-disabled={disabled}
    {checked}
  />
  <slot />
</label>

<style lang="scss">
  @use "$styles/base/variables" as *;

  .wrapper {
    display: flex;
    gap: var(--spacing-medium);
    align-items: center;
  }

  .checkbox {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 1.25rem;
    height: 1.25rem;
    margin: 0;

    appearance: none;
    background-color: var(--tc-background-primary);
    border: 1px solid var(--tc-text-tertiary);

    &:checked::after {
      content: "";
      width: 0.625rem;
      height: 0.625rem;
      background-color: var(--tc-text-primary);
    }
  }
</style>
