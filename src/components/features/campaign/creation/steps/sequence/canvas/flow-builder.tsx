"use client";

import { Edge, Node, ReactFlowProvider } from "@xyflow/react";
import { useEffect, useState } from "react";

import { CanvasContent } from "./canvas-content";
import { createDefaultStarterNode } from "@/lib/nodeTypes";
import { FLOW_STORAGE_KEY } from "@/lib/utils";

export default function FlowBuilder() {
  // Load flow state from localStorage
  const [initialState, setInitialState] = useState<{
    nodes: Node[];
    edges: Edge[];
  } | null>(null);

  useEffect(() => {
    const loadFlowState = (): { nodes: Node[]; edges: Edge[] } | null => {
      const savedState = localStorage.getItem(FLOW_STORAGE_KEY);
      if (!savedState)
        return { nodes: [createDefaultStarterNode()], edges: [] };

      try {
        return JSON.parse(savedState) as { nodes: Node[]; edges: Edge[] };
      } catch (error) {
        console.error("Error loading flow state:", error);
        return null;
      }
    };
    const flowState = loadFlowState();
    setInitialState(flowState);
  }, []);

  // Start with a blank canvas if no saved state
  if (!initialState) {
    return (
      <ReactFlowProvider>
        <CanvasContent />
      </ReactFlowProvider>
    );
  }

  return (
    <ReactFlowProvider>
      <CanvasContent
        initialNodes={initialState.nodes}
        initialEdges={initialState.edges}
      />
    </ReactFlowProvider>
  );
}
