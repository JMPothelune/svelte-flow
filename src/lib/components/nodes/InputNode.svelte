<script lang="ts">
  import Handle from "../handle/Handle.svelte";

  import type { Position } from "../../types";

  //TODO: data is a generic
  export let data: any;
  export let isConnectable: boolean;
  export let sourcePosition: Position;
</script>

{@html data?.label}
<Handle type="source" position={sourcePosition} {isConnectable} />
