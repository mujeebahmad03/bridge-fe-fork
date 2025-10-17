import { Handle, Position } from "@xyflow/react";
import { MoreHorizontal } from "lucide-react";
import { StarterNodeData } from "@/types/flow";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface StarterNodeProps {
  data: StarterNodeData;
}

export default function StarterNode({ data }: StarterNodeProps) {
  return (
    <Card className="flowbuilder-node starter-node">
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
        </div>

        <div className="node-actions">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal size={14} />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem disabled>
                Cannot modify starter node
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="h-3 w-3 rounded-full bg-primary"
      />
    </Card>
  );
}
