<script lang="ts">
  import Text from "$components/Text/Text.svelte";

  export let title;
</script>

<section class="wrap">
  <Text variant="h2" styling="heading2">{title}</Text>
  <div class="component-wrap">
    <slot />
  </div>
</section>

<style lang="scss">
  .wrap {
    padding: var(--spacing-large);
    background: var(--tc-background-primary);
    border: 1px solid var(--tc-decoration);
  }

  .component-wrap {
    margin-top: var(--spacing-large);
  }
</style>
