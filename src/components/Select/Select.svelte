<script lang="ts">
  export let id: string;
  export let required = true;
  export let value: string;
</script>

<select {id} {required} bind:value>
  <slot />
</select>

<style lang="scss">
  select {
    padding: 0.5em 0.8em 0.5em 0;
    font-size: 1rem;

    border-width: 0;
    border-bottom: 2px solid black;
    border-radius: 0;

    &:focus {
      outline: none;
      border-color: var(--c-purple);
    }
  }
</style>
