<div class="row">
  <slot />
</div>

<style lang="scss">
  .row {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
</style>
