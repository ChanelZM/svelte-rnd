<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const className = "";

  export let type: "button" | "submit" = "button";
  export let disabled: boolean = false;
  export let variant: "primary" | "primary-outline" | "primary-ghost" =
    "primary";
  export let small: boolean = false;
  export let fullwidth: boolean = false;

  const dispatch = createEventDispatcher<{ click: void }>();
</script>

<button
  on:click={() => !disabled && dispatch("click")}
  data-testid="button"
  class="button {variant} {className}"
  class:is-small={small}
  class:is-fullwidth={fullwidth}
  aria-disabled={disabled}
  {type}
>
  <slot />
</button>

<style lang="scss">
  @use "$styles/base/variables" as *;

  .button {
    cursor: pointer;

    display: flex;
    gap: var(--spacing-medium);
    align-items: center;
    justify-content: center;

    height: 3.5rem;
    padding: 1rem 2rem;

    font-family: var(--ff-suisse-book);
    font-size: var(--f-button);
    font-weight: var(--weight-semibold);
    line-height: 1;
    color: var(--tc-background-primary);
    text-wrap: nowrap;

    background-color: var(--tc-text-primary);
    border-radius: var(--radius-round);

    transition: 120ms linear;

    &.primary {
      color: var(--tc-background-primary);
      background-color: var(--tc-text-primary);
    }

    &.primary-outline {
      color: var(--tc-text-primary);
      background-color: transparent;
      outline: 1px solid var(--tc-text-primary);

      &:disabled {
        outline: 1px solid var(--tc-text-tertiary);
      }
    }

    &.primary-ghost {
      color: var(--tc-text-primary);
      background-color: transparent;
      outline: 1px solid transparent;
    }

    &.is-small {
      height: 2.75rem;
      padding: 0.625rem 1.25rem;
    }

    &.fullwidth {
      width: 100%;
    }

    &:hover {
      opacity: 0.8;
    }

    &:active {
      scale: 0.95;
    }

    &:focus-visible {
      outline: 0.1em solid var(--tc-text-primary);
      outline-offset: 0.1em;
    }

    &:disabled {
      pointer-events: none;

      &:not(.primary-outline) {
        opacity: 0.8;
      }
    }
  }
</style>
