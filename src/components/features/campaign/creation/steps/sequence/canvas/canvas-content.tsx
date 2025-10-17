"use client";

import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MarkerType,
  MiniMap,
  Node,
  ReactFlow,
  ReactFlowInstance,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { ConditionEdge } from "../edges";
import { ConditionNode, StarterNode, StepNode } from "../nodes";
import { ZoomControls } from "./zoom-controls";
import { SidePanel } from "./side-panel";

import { FLOW_STORAGE_KEY } from "@/lib/utils";
import { StepType } from "@/types/flow";

// Import React Flow styles
import "@xyflow/react/dist/style.css";

interface CanvasContentProps {
  initialNodes?: Node[];
  initialEdges?: Edge[];
}

// Define node types mapping
const nodeTypes = {
  step: StepNode,
  condition: ConditionNode,
  starter: StarterNode,
};

// Define edge types mapping
const edgeTypes = {
  condition: ConditionEdge,
  default: ConditionEdge,
};

export function CanvasContent({
  initialNodes = [],
  initialEdges = [],
}: CanvasContentProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  useEffect(() => {
    if (initialNodes.length > 0) {
      setNodes(initialNodes);
    }

    if (initialEdges.length > 0) {
      setEdges(initialEdges);
    }
  }, [initialEdges, initialNodes, setEdges, setNodes]);

  // Handle connections between nodes
  const onConnect = useCallback(
    (connection: Connection) => {
      // If connecting from a condition node, determine the sourceHandle (yes/no)
      if (
        connection.sourceHandle === "yes" ||
        connection.sourceHandle === "no"
      ) {
        // Create a conditional edge with custom type and style
        const edge: Edge = {
          ...connection,
          id: `e-${connection.source}-${connection.target}-${Date.now()}`,
          type: "condition",
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
          data: { condition: connection.sourceHandle },
        };
        setEdges((eds) => addEdge(edge, eds));
      } else {
        // Create a standard edge
        const edge: Edge = {
          ...connection,
          id: `e-${connection.source}-${connection.target}-${Date.now()}`,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        };
        setEdges((eds) => addEdge(edge, eds));
      }
    },
    [setEdges],
  );

  // Save flow state to localStorage whenever it changes
  useEffect(() => {
    if (nodes.length === 0 && edges.length === 0) return;

    const flowState = { nodes, edges };
    console.log(JSON.stringify(flowState, null, 2));
    localStorage.setItem(FLOW_STORAGE_KEY, JSON.stringify(flowState));
  }, [nodes, edges]);

  // Handle dropping a node on the canvas
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) {
        console.log("Missing ref or flow instance");
        return;
      }

      // Get the node type data from the drag event
      const nodeTypeData = event.dataTransfer.getData("application/reactflow");
      if (!nodeTypeData) {
        console.log("No node data found");
        return;
      }

      try {
        const nodeType = JSON.parse(nodeTypeData);

        // Get the position where the node was dropped on the canvas
        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });

        // Create a new unique node ID
        const newNodeId = `${nodeType.type}-${Date.now()}`;

        // Create the new node with appropriate data
        const newNode: Node = {
          id: newNodeId,
          type: nodeType.category,
          position,
          data: {
            id: newNodeId,
            label: nodeType.label,
            category: nodeType.category,
            type: nodeType.type,
            icon: nodeType.icon,
            isValid: nodeType.category === "condition",
            waitDays: 0,
            waitEnabled: false,
            actionNeeded:
              nodeType.type === "call" || nodeType.type === "manualTask",
          },
        };

        // Add the new node to the canvas
        setNodes((nds) => nds.concat(newNode));

        // Show a success toast
        toast.info(`Added ${nodeType.label} to the canvas`);
      } catch (error) {
        console.error("Error creating new node:", error);
        toast.error("Failed to create node");
      }
    },
    [reactFlowInstance, setNodes],
  );

  const handleSelectNode = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.stopPropagation();
      console.log("Node clicked: ", node);
      setSelectedNode(node);
      setPanelOpen(true);
    },
    [],
  );

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      ref={reactFlowWrapper}
    >
      <motion.div
        animate={{
          x: panelOpen ? -540 : 0, //540 is the width of the side panel
        }}
        transition={{ duration: 0.3 }}
        className="relative h-full w-full"
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodeClick={handleSelectNode}
          fitView
          snapToGrid
          snapGrid={[15, 15]}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          minZoom={0.2}
          maxZoom={1.5}
          multiSelectionKeyCode="Control"
          selectionKeyCode="Shift"
          className="flow-background"
          deleteKeyCode={["Backspace", "Delete"]}
        >
          <Controls className="rounded-md border bg-red-500 shadow-sm" />
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            className="bg-slate-50 dark:bg-slate-900"
          />
          <MiniMap
            className="rounded-md border shadow-sm backdrop-blur-sm dark:bg-gray-800/90"
            nodeStrokeColor={(n) => {
              return n.selected ? "#3182ce" : "#ddd";
            }}
            nodeColor={(n) => {
              return n.selected ? "#3182ce" : "#eee";
            }}
          />
        </ReactFlow>

        <ZoomControls panelOpen={panelOpen} setPanelOpen={setPanelOpen} />
      </motion.div>

      {/* Side Panel */}
      <SidePanel
        panelOpen={panelOpen}
        type={(selectedNode?.data.type as StepType) || null}
      />
    </div>
  );
}
