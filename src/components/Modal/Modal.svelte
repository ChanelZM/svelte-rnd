<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import portal from "$utils/usePortal";

  export let show: boolean;

  let modal: HTMLDivElement;

  const dispatch = createEventDispatcher<{ close: void }>();

  function onClickOutside(e: MouseEvent) {
    if (!modal.contains(e.target as Node)) {
      dispatch("close");
    }
  }
</script>

{#if show}
  <div use:portal={document.body}>
    <div
      class="wrapper"
      role="presentation"
      on:click={(e) => onClickOutside(e)}
    >
      <div class="modal" bind:this={modal}>
        <button
          data-testid="close-button"
          class="close-button"
          type="button"
          on:click={() => dispatch("close")}
        >
          X
        </button>

        <div class="modal-body">
          <slot />
        </div>
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  @use "$styles/base/variables" as *;

  .wrapper {
    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    background-color: var(--bg-overlay);
  }

  .modal {
    $spacing-x: 1.5em;
    $spacing-y: 2em;

    position: relative;
    z-index: 1;

    overflow: hidden;
    display: flex;

    width: 100%;
    max-width: 24rem;
    height: fit-content;
    margin: auto;
    padding: var(--spacing-x-large) var(--spacing-large);

    background-color: var(--c-white);
    border-radius: 1rem;
  }

  .modal-body {
    display: block;
    width: 100%;
  }

  .close-button {
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;

    width: auto;
    padding: 2rem 2rem 0 0;

    &::before {
      content: "";

      position: absolute;
      bottom: px(-2);
      left: px(-7);

      width: px(24);
      height: px(24);

      border-radius: 50%;
    }

    &:hover {
      color: rgb(var(--c-hyper-black) 0.6);
    }

    /* stylelint-disable-next-line selector-pseudo-class-no-unknown */
    > :global(*) {
      position: relative;
    }
  }
</style>
