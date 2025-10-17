"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X } from "lucide-react";
import { Button, Card } from "@/components/ui";
import {
  CallsWidget,
  CampaignWidget,
  EmailWidget,
  LinkedInWidget,
  TaskWidget,
} from "./widgets";

import { cn } from "@/lib/utils";
import { useWidgetsStore } from "@/lib/stores/widgets";
import { WidgetItem } from "@/types/widget";

interface SortableWidgetProps {
  widget: WidgetItem;
  isEditMode: boolean;
}

export const SortableWidget = ({ widget, isEditMode }: SortableWidgetProps) => {
  const handleRemoveWidget = useWidgetsStore(
    (state) => state.handleRemoveWidget,
  );

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: widget.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
  };

  const renderWidget = () => {
    switch (widget.type) {
      case "email":
        return <EmailWidget className="h-full" />;
      case "linkedin":
        return <LinkedInWidget className="h-full" />;
      case "calls":
        return <CallsWidget className="h-full" />;
      case "campaign":
        return <CampaignWidget className="h-full" />;
      case "task":
        return <TaskWidget className="h-full" />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("widget-container w-full", {
        "cursor-grab": isEditMode,
        "cursor-grabbing": isEditMode && isDragging,
      })}
      {...(isEditMode ? { ...attributes, ...listeners } : {})}
    >
      <Card
        className={cn("relative mb-6 h-full transition-transform", {
          "shadow-md hover:scale-[1.01] hover:shadow-lg": isEditMode,
          "shadow-sm": !isEditMode,
        })}
      >
        {isEditMode && (
          <>
            <div className="absolute -left-3 -top-3 z-10 rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground shadow-lg">
              Drag to reposition
            </div>
            <Button
              variant="destructive"
              size="icon"
              className="absolute -right-3 -top-3 z-10 h-7 w-7 shadow-lg"
              onClick={() => handleRemoveWidget(widget.id)}
            >
              <X className="h-3 w-3" />
            </Button>
          </>
        )}
        {renderWidget()}
      </Card>
    </div>
  );
};
