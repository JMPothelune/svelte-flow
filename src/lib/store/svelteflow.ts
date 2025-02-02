import { derived, Readable } from "svelte/store";

import type {
  SvelteFlowInstance,
  Instance,
  NodeAddChange,
  EdgeAddChange,
  NodeResetChange,
  EdgeResetChange,
} from "../types";

import { store } from "./index";
import { viewportHelperStore } from "./viewportHelper";

export function svelteFlowStore<NodeData = any, EdgeData = any>(): Readable<
  SvelteFlowInstance<NodeData, EdgeData>
> {
  const svelteFlow: Readable<SvelteFlowInstance<NodeData, EdgeData>> = derived(
    [store, viewportHelperStore],
    ([$store, $viewportHelperStore]) => {
      const getNodes: Instance.GetNodes<NodeData> = () => {
        return Array.from($store.nodeInternals.values()).map((node) => ({
          ...node,
        }));
      };

      const getNode: Instance.GetNode<NodeData> = (id) => {
        return $store.nodeInternals.get(id);
      };

      const getEdges: Instance.GetEdges<EdgeData> = () => {
        return ($store.edges || []).map((edge) => ({
          ...edge,
        }));
      };

      const getEdge: Instance.GetEdge<EdgeData> = (id) => {
        return ($store.edges || []).find((edge) => edge.id === id);
      };

      const setNodes: Instance.SetNodes<NodeData> = (payload) => {
        const nodes = Array.from($store.nodeInternals.values());
        const nextNodes =
          typeof payload === "function" ? payload(nodes) : payload;

        setNodes(nextNodes);
        const changes = nextNodes.map(
          (node) =>
            ({
              item: node,
              type: "reset",
            } as NodeResetChange<NodeData>)
        );
      };

      const setEdges: Instance.SetEdges<EdgeData> = (payload) => {
        const nextEdges =
          typeof payload === "function" ? payload($store.edges || []) : payload;

        setEdges(nextEdges);
        const changes = nextEdges.map(
          (edge) => ({ item: edge, type: "reset" } as EdgeResetChange<EdgeData>)
        );
      };

      const addNodes: Instance.AddNodes<NodeData> = (payload) => {
        const nodes = Array.isArray(payload) ? payload : [payload];

        const currentNodes = Array.from($store.nodeInternals.values());
        const nextNodes = [...currentNodes, ...nodes];
        setNodes(nextNodes);
        const changes = nodes.map(
          (node) => ({ item: node, type: "add" } as NodeAddChange<NodeData>)
        );
      };

      const addEdges: Instance.AddEdges<EdgeData> = (payload) => {
        const nextEdges = Array.isArray(payload) ? payload : [payload];

        setEdges([...$store.edges, ...nextEdges]);
        const changes = nextEdges.map(
          (edge) => ({ item: edge, type: "add" } as EdgeAddChange<EdgeData>)
        );
      };

      const toObject: Instance.ToObject<NodeData, EdgeData> = () => {
        const nodes = Array.from($store.nodeInternals.values());
        const [x, y, zoom] = $store.transform;

        return {
          nodes: nodes.map((node) => ({ ...node })),
          edges: ($store.edges || []).map((edge) => ({ ...edge })),
          viewport: {
            x,
            y,
            zoom,
          },
        };
      };

      const { initialized: viewportInitialized, ...viewportHelperFunctions } =
        $viewportHelperStore;

      return {
        ...viewportHelperFunctions,
        viewportInitialized,
        getNodes,
        getNode,
        getEdges,
        getEdge,
        setNodes,
        setEdges,
        addNodes,
        addEdges,
        toObject,
      };
    }
  );

  return svelteFlow;
}
