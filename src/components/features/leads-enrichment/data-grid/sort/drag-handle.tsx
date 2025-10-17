"use client";

import { GripVertical } from "lucide-react";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

interface DragHandleProps {
  listeners: SyntheticListenerMap | undefined;
  attributes: DraggableAttributes;
}

export function DragHandle({ listeners, attributes }: DragHandleProps) {
  return (
    <div
      {...attributes}
      {...listeners}
      className="cursor-grab touch-none rounded-md p-2 hover:bg-muted"
    >
      <GripVertical className="h-4 w-4 text-muted-foreground" />
    </div>
  );
}
