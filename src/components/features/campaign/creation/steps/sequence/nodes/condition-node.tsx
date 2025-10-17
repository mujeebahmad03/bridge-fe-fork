import { Handle, Position, useReactFlow } from "@xyflow/react";
import { Pencil, MoreHorizontal } from "lucide-react";
import { ConditionNodeData } from "@/types/flow";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ConditionNodeProps {
  id: string;
  data: ConditionNodeData;
}

export default function ConditionNode({ id, data }: ConditionNodeProps) {
  const { setNodes } = useReactFlow();

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

  return (
    <Card className="flowbuilder-node">
      {/* Input handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="h-3 w-3 rounded-full bg-primary"
      />

      {/* Node Content */}
      <div className="node-content">
        <div>
          <div className="node-label">
            <div className="node-icon">
              <span role="img" aria-label={data.label}>
                {data.icon}
              </span>
            </div>
            <span>{data.label}</span>
          </div>
          {!data.isValid && (
            <div className="node-status mt-1">
              {data.validationMessage || "Condition setup required"}
            </div>
          )}
        </div>

        <div className="node-actions">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Pencil size={14} />
            <span className="sr-only">Edit</span>
          </Button>

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
                Delete this condition
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Output handles for Yes/No conditions */}
      <div className="absolute bottom-0 left-0 right-0 -mb-1 flex justify-between px-8">
        <div className="flex flex-col items-center">
          <span className="edge-yes-label mb-1">Yes</span>
          <Handle
            type="source"
            position={Position.Bottom}
            id="yes"
            className="bg-green-500"
            style={{ left: "auto", right: "auto" }}
          />
        </div>
        <div className="flex flex-col items-center">
          <span className="edge-no-label mb-1">No</span>
          <Handle
            type="source"
            position={Position.Bottom}
            id="no"
            className="bg-destructive"
            style={{ left: "auto", right: "auto" }}
          />
        </div>
      </div>
    </Card>
  );
}
