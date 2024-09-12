<script lang="ts">
  import type { ComponentType, SvelteComponent } from "svelte";

  // Icon imports
  import IconAdd from "./icons/add.svg?component";
  import IconClose from "./icons/close.svg?component";
  import IconMenu from "./icons/menu.svg?component";
  // Illustration imports
  import IllustrationLogo from "./illustrations/logo.svg?component";
  import type { SVGAttributes } from "svelte/elements";

  export let name: VectorName;
  export let size = 1;
  export let fill = "white";

  // Icons
  const icons = {
    "icon-add": IconAdd,
    "icon-close": IconClose,
    "icon-menu": IconMenu,
  };

  // Illustrations
  const illustrations = {
    "illustration-logo": IllustrationLogo,
  };

  type IconName = keyof typeof icons;
  type IllustrationName = keyof typeof illustrations;
  type VectorName = IconName | IllustrationName;

  const vectors: Record<
    VectorName,
    ComponentType<SvelteComponent<SVGAttributes<SVGSVGElement>, any, any>>
  > = {
    ...icons,
    ...illustrations,
  };
</script>

<span>
  <svelte:component
    this={vectors[name]}
    style="width: {size}em; color: {fill}"
  />
</span>
