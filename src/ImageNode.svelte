<script lang="ts">


  import Handle from "./lib/components/handle/Handle.svelte";
  import { Position } from "./lib/types";

  //TODO: make data a generic here

  export let data: any;
  export let isConnectable: boolean;
  export let sourcePosition: Position;
  export let targetPosition: Position;
</script>

<Handle type="source" position={Position.Right} {isConnectable} id="a"/>
<Handle type="source" position={Position.Right} {isConnectable} id="b" class="flow__top"/>

{#if data?.imgSrc}
  <img src={data.imgSrc} alt={data.label || "image"} />
{/if}
<Handle type="source" position={sourcePosition} {isConnectable} />

<style lang="scss">

  :global(.flow__top) {
    top:10px;
    background-color: red;
  }
</style>