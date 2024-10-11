<script lang="ts">
  import { error } from "console";

  export let id: string;
  export let name: string;
  export let value = "";
  export let required = false;
  export let readonly = false;
  export let disabled = false;
  export let isError = false;
  export let placeholder = "";
  export let minlength: number | undefined = undefined;
  export let maxlength: number | undefined = undefined;
</script>

<input
  type="text"
  {id}
  {name}
  {required}
  {readonly}
  {value}
  {placeholder}
  {disabled}
  {minlength}
  {maxlength}
  class:error={isError}
  class:disabled
  on:input
/>
<input type="text" {id} {name} bind:value />

<style lang="scss">
  input {
    padding: 0.5em 0.8em 0.5em 0;

    border-width: 0;
    border-bottom: 2px solid black;
    border-radius: 0;
    &:focus {
      outline: none;
      border-color: var(--c-purple);
    }
  }

  .error {
    border-color: var(--c-red);
  }

  .disabled {
    background-color: var(--c-gray);
  }
</style>
