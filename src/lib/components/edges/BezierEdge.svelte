<script lang="ts">
  import BaseEdge from "./BaseEdge.svelte";

  import { Position } from "../../types";
  
  import { getBezierPath, getBezierCenter } from "./bezier";

  export let sourceX: number;
  export let sourceY: number;
  export let targetX: number;
  export let targetY: number;

  export let label: string;
  export let showLabelBg: boolean;
  export let labelBgPadding: Array<number>;
  export let labelBgBorderRadius: number;

  export let sourcePosition: Position = Position.Bottom;
  export let targetPosition: Position = Position.Top;

  export let markerStart: string = null;
  export let markerEnd: string = null;

  export let curvature: number = 0.25;

  $: params = {
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    curvature,
  };

  $: path = getBezierPath(params);
  $: [centerX, centerY] = getBezierCenter(params);
</script>

<BaseEdge
  {path}
  {centerX}
  {centerY}
  {markerStart}
  {markerEnd}
  {label}
  {showLabelBg}
  {labelBgPadding}
  {labelBgBorderRadius}
/>
