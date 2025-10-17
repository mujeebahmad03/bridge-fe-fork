"use client";

import { useState } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { Clock, Pencil, MoreHorizontal, Trash2 } from "lucide-react";

import {
  Button,
  Card,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";

import { StepNodeData } from "@/types/flow";

interface StepNodeProps {
  id: string;
  data: StepNodeData;
}

export default function StepNode({ id, data }: StepNodeProps) {
  const { setNodes } = useReactFlow();
  const [isWaitOpen, setIsWaitOpen] = useState(false);

  const handleDeleteNode = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  };

  const handleDuplicateNode = () => {
    setNodes((nodes) => {
      const nodeIndex = nodes.findIndex((node) => node.id === id);
      if (nodeIndex === -1) return nodes;

      const node = nodes[nodeIndex];
      const newNode = {
        ...node,
        id: `${node.data.type}-${Date.now()}`,
        position: {
          x: node.position.x + 20,
          y: node.position.y + 20,
        },
      };

      return [
        ...nodes.slice(0, nodeIndex + 1),
        newNode,
        ...nodes.slice(nodeIndex + 1),
      ];
    });
  };

  const updateWaitDays = (days: number) => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                waitDays: days,
                waitEnabled: days > 0,
              },
            }
          : node,
      ),
    );
  };

  const decrementDays = () => {
    const currentDays = data.waitDays || 0;
    updateWaitDays(Math.max(0, currentDays - 1));
  };

  const incrementDays = () => {
    const currentDays = data.waitDays || 0;
    updateWaitDays(currentDays + 1);
  };

  const removeWaitBlock = () => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                waitDays: 0,
                waitEnabled: false,
              },
            }
          : node,
      ),
    );
    setIsWaitOpen(false);
  };

  // Determine wait text
  const waitText =
    data.waitEnabled && data.waitDays && data.waitDays > 0
      ? `Wait for ${data.waitDays} day${data.waitDays !== 1 ? "s" : ""}`
      : "Send immediately";

  return (
    <Card className="flowbuilder-node space-y-4">
      {/* Input handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="h-3 w-3 rounded-full bg-primary"
      />

      {/* Wait Header */}
      <div className="flex flex-row items-center justify-between border-b px-4 py-2">
        <Clock className="mr-2 h-5 w-5 text-primary" />
        <div className="flex w-full items-center justify-between">
          <span>{waitText}</span>

          <Popover open={isWaitOpen} onOpenChange={setIsWaitOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Pencil size={12} />
                <span className="sr-only">Edit wait time</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium">Wait Duration</h4>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decrementDays}
                    disabled={(data.waitDays || 0) <= 0}
                  >
                    -
                  </Button>
                  <div className="flex items-center">
                    <Input
                      type="number"
                      min={0}
                      value={data.waitDays || 0}
                      onChange={(e) =>
                        updateWaitDays(parseInt(e.target.value) || 0)
                      }
                      className="w-16 text-center"
                    />
                    <span className="ml-2">day(s)</span>
                  </div>
                  <Button variant="outline" size="icon" onClick={incrementDays}>
                    +
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={removeWaitBlock}
                  >
                    <Trash2 className="text-foreground" />
                    <span className="sr-only">Remove wait</span>
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Node Content */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="node-label">
            <div className="node-icon">
              <span role="img" aria-label={data.label}>
                {data.icon}
              </span>
            </div>
            <span>{data.label}</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal size={14} />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleDuplicateNode}>
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={handleDeleteNode}
              >
                Delete this step
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {!data.isValid && (
          <div className="node-status mt-1">
            {data.validationMessage || "Content is required"}
          </div>
        )}
        {data.actionNeeded && (
          <div className="node-status mt-1 text-amber-500">Action needed</div>
        )}
      </div>

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="h-3 w-3 rounded-full bg-blue-500"
      />
    </Card>
  );
}
