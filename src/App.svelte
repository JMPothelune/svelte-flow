<script lang="ts">
  import SvelteFlow from "./lib/container/svelteflow/SvelteFlow.svelte";

  import Background from "./lib/additional-components/background/Background.svelte";
  import Controls from "./lib/additional-components/controls/Controls.svelte";
  import MiniMap from "./lib/additional-components/minimap/MiniMap.svelte";
  import { Node, Position } from "./lib/types";
  import PropNode from "./PropNode.svelte";
  import ImageNode from "./ImageNode.svelte";

  let nodes:Node[] = [
    {
      id: "1",
      type: "input",
      data: { label: "Node 0" },
      position: { x: 250, y: 5 },
      class: "light",
    },
    {
      id: "2",
      data: { label: "Group A" },
      position: { x: 100, y: 100 },
      class: "light medium",
    },
    {
      id: "2a",
      data: { label: "Node A.1" },
      position: { x: 10, y: 50 },
      parentNode: "2",
    },
    {
      id: "3",
      data: { label: "Node 1" },
      position: { x: 320, y: 100 },
      class: "light",
    },
    {
      id: "4",
      data: { label: "Group B" },
      position: { x: 320, y: 200 },
      class: "light large",
    },
    {
      id: "4a",
      data: { label: "Node B.1" },
      position: { x: 15, y: 65 },
      class: "light",
      parentNode: "4",
      extent: "parent",
    },
    {
      id: "4b",
      data: { label: "Group B.A" },
      position: { x: 15, y: 120 },
      class: "light medium",
      parentNode: "4",
    },
    {
      id: "4b1",
      data: { label: "Node B.A.1" },
      position: { x: 20, y: 40 },
      class: "light",
      parentNode: "4b",
    },
    {
      id: "4b2",
      data: { label: "Node B.A.2" },
      position: { x: 100, y: 100 },
      class: "light",
      parentNode: "4b",
    },
    {
      id: "5",
      data: { imgSrc: "https://picsum.photos/200/300" , label: "Node 5" },
      type: "image",
      position: { x: 700, y: 300 },
      class: "light",
      targetPosition: Position.Left,
    },
    {
      id: "6",
      data: { label: "Node 6" },
      position: { x: 50, y: 500 },
      class: "light",
      type: "prop",
    }
  ];

  let edges = [
    { id: "e1-2", source: "1", target: "2", animated: true },
    { id: "e1-3", source: "1", target: "3" },
    { id: "e2a-4a", source: "2a", target: "4a" },
    { id: "e3-4", source: "3", target: "4" },
    { id: "e3-4b", source: "3", target: "4b" },
    { id: "e4a-4b1", source: "4a", target: "4b1" },
    { id: "e4a-4b2", source: "4a", target: "4b2" },
    { id: "e4b1-4b2", source: "4b1", target: "4b2" },
  ];

  let customTypes = {
    "image": ImageNode,
    "prop": PropNode,
  };
  
</script>

<main>
  <h1>Svelte Flow!</h1>

  <SvelteFlow 
    bind:nodes 
    bind:edges 
    fitView={true} 
    nodeTypes={customTypes}
    >
    <Background gap={20} size={0.8} />
    <Controls />
    <MiniMap />
  </SvelteFlow>
</main>

<style lang="scss">
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    height: 60%;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  :global {
    .svelte-flow__node.node-custom {
      background: #d6d5e6;
      color: #333;
      border: 1px solid #222138;
      width: 180px;
    }

    .svelte-flow__node.large {
      width: 300px;
      height: 300px;
    }

    .svelte-flow__node.medium {
      width: 150px;
      height: 150px;
    }

    .svelte-flow__edge.custom-edge {
      .svelte-flow__edge-path,
      .svelte-flow__edge-textwrapper {
        stroke: #f6ab6c;
      }
    }

    .svelte-flow__edge-path{
      // set line width

    }
    
  }
</style>
