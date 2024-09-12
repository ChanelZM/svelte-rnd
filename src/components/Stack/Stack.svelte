<script lang="ts">
  export let horizontal: boolean | undefined = undefined;
  export let center: boolean | undefined = undefined;
  export let wrap: boolean | undefined = undefined;
  export let smallGap: boolean | undefined = undefined;
  export let align: "start" | "center" | "end" | undefined = undefined;
</script>

<div
  class="container is-aligned-{align}"
  class:is-horizontal={horizontal}
  class:is-centered={center}
  class:is-small-gap={smallGap}
  class:is-wrapped={wrap}
>
  <slot />
</div>

<style lang="scss">
  @use "$styles/base/variables" as *;

  .container {
    display: flex;
    gap: var(--gutter);
    align-items: stretch;
    justify-content: flex-start;

    width: 100%;

    &.is-centered {
      align-items: center;
    }

    &.is-aligned-start {
      justify-content: flex-start;
    }

    &.is-aligned-center {
      justify-content: center;
    }

    &.is-aligned-end {
      justify-content: flex-end;
    }

    &.is-wrapped {
      flex-wrap: wrap;
    }

    &.is-small-gap {
      gap: var(--spacing-medium);
    }

    &:not(.is-horizontal) {
      flex-direction: column;
    }
  }
</style>
