import { useCallback } from "react";
import { NodeTypeInfo } from "@/types/flow";

interface SidebarNodeItemProps {
  nodeType: NodeTypeInfo;
}

export function SidebarNodeItem({ nodeType }: SidebarNodeItemProps) {
  // Set up drag event handlers
  const onDragStart = useCallback(
    (event: React.DragEvent) => {
      event.dataTransfer.setData(
        "application/reactflow",
        JSON.stringify(nodeType),
      );
      event.dataTransfer.effectAllowed = "move";
    },
    [nodeType],
  );

  return (
    <div className="sidebar-node-item" draggable onDragStart={onDragStart}>
      <div className="sidebar-node-icon">
        <span role="img" aria-label={nodeType.label}>
          {nodeType.icon}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-medium">{nodeType.label}</span>
        <span className="text-xs text-muted-foreground">
          {nodeType.description}
        </span>
      </div>
    </div>
  );
}
