<script lang="ts">
  import { onMount } from "svelte";

  export let variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" =
    "p";
  export let styling:
    | "heading1"
    | "heading2"
    | "heading3"
    | "section"
    | "subhead"
    | "subhead-sm"
    | "body"
    | "body-light"
    | "body-sm"
    | "copy"
    | "copy-light" = "body";

  export let center: boolean = false;

  let Element: keyof HTMLElementTagNameMap = variant;

  onMount(() => {
    Element = variant;
  });
</script>

<svelte:element
  this={Element}
  class="{variant} {styling} {center && 'center'} {$$restProps.class || ''}"
>
  <slot />
</svelte:element>

<style lang="scss">
  .h1,
  .h2,
  .h3,
  .h4,
  .h5,
  .h6,
  .span,
  .p {
    margin: 0;
  }

  .heading1 {
    font-family: "Suisse Intl Light", sans-serif;
    font-size: var(--font-xxx-large);
    font-weight: 300;
    line-height: 1;
  }

  .heading2 {
    font-family: var(--ff-suisse-light);
    font-size: var(--font-xx-large);
    font-weight: var(--weight-light);
    line-height: 1;
  }

  .heading3 {
    font-family: var(--ff-suisse-light);
    font-size: var(--font-x-large);
    font-weight: var(--weight-light);
    line-height: 1;
  }

  .section {
    font-family: var(--ff-suisse-medium);
    font-size: var(--font-x-large);
    font-weight: var(--weight-semibold);
    line-height: 1.2;
  }

  .subhead {
    font-family: var(--ff-suisse-medium);
    font-size: var(--font-normal);
    font-weight: var(--weight-semibold);
    line-height: 1.2;
  }

  .subhead-sm {
    font-family: var(--ff-suisse-medium);
    font-size: var(--font-small);
    font-weight: var(--weight-semibold);
    line-height: 1.2;
  }

  .body {
    font-family: var(--ff-suisse-medium);
    font-size: var(--font-small);
    font-weight: var(--weight-medium);
    line-height: 1.6;
  }

  .body-light {
    font-family: var(--ff-suisse-light);
    font-size: var(--font-small);
    font-weight: var(--weight-light);
    line-height: 1.6;
  }

  .body-sm {
    font-family: var(--ff-suisse-medium);
    font-size: var(--font-x-small);
    font-weight: var(--weight-medium);
    line-height: 1.6;
  }

  .copy {
    font-family: var(--ff-grotesk-medium);
    font-size: var(--font-xx-small);
    font-weight: var(--weight-semibold);
    line-height: 1.2;
  }

  .copy-light {
    font-family: var(--ff-grotesk);
    font-size: var(--font-xx-small);
    font-weight: var(--weight-regular);
    line-height: 1.2;
  }

  .center {
    text-align: center;
  }
</style>
