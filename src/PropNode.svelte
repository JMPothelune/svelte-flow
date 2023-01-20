<script lang="ts">


  import Handle from "./lib/components/handle/Handle.svelte";
  import { Position } from "./lib/types";

  //TODO: make data a generic here

  export let data: any;
  export let isConnectable: boolean;
  export let sourcePosition: Position;
  export let targetPosition: Position;

  $: inputs = [
    {
      id: "a",
      name : "input a",
      type: "text",
      value: "input a"
    },
    {
      id: "b",
      name : "input b",
      type: "text",
      value: "input b"
    }
  ]
</script>


<div class="node">
  <div class="node__header">
    <h3>{data.label}</h3>
    <Handle type="target" position={Position.Left} {isConnectable} id="trigger" class="flow__top"/>
  </div>
  {#each inputs as input}
    <div class="input">
      <label for={input.id}>{input.name}</label>
      <input type={input.type} id={input.id} value={input.value} />
      <Handle type="target" position={Position.Left} {isConnectable} id={input.id}/>
    </div>
  {/each}

  <Handle type="source" position={Position.Right} {isConnectable} id="emmit"/>
</div>
<!-- <Handle type="source" position={Position.Right} {isConnectable} id="a"/>

{#if data?.imgSrc}
  <img src={data.imgSrc} alt={data.label || "image"} />
{/if}
<Handle type="source" position={sourcePosition} {isConnectable} /> -->

<style lang="scss">

  .node{
    // a cool dark gradient
    background: linear-gradient(45deg, #1e1e1e, #2a2a2a);
    color: #fff;
    border-radius: 5px;
    padding: 0px;
    position: relative;
    text-align: start;
    &__header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 10px;
      border-bottom: 1px solid #fff;
    }
  }

  .input {
    display: flex;
    flex-direction: column;
    margin: 10px;
    position: relative;
  }

  :global(.flow__top) {
    top:10px;
    background-color: red;
  }
</style>