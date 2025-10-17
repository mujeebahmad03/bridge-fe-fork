"use client";

import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useEffect } from "react";

import { SortableWidget } from "./sortable-widget";
import { DashboardHeader } from "./dashboard-header";
import { SaveLayoutDialog } from "./save-layout-dialog";

import { initWidgetStore, useWidgetsStore } from "@/lib/stores/widgets";

export const Dashboard = () => {
  const {
    widgets,
    isEditMode,
    setWidgets,
    setIsLayoutChanged,
    originalWidgets,
  } = useWidgetsStore();

  // Initialize the dashboard store on component mount
  useEffect(() => {
    initWidgetStore();
  }, []);

  // Check if the current layout has been changed
  useEffect(() => {
    if (!isEditMode) return;

    const hasChanged =
      JSON.stringify(widgets) !== JSON.stringify(originalWidgets);
    setIsLayoutChanged(hasChanged);
  }, [widgets, originalWidgets, isEditMode, setIsLayoutChanged]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setWidgets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <>
      <DashboardHeader />
      <div className="dashboard-container animate-fade-in">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={widgets.map((w) => w.id)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-1 gap-6">
              {widgets.map((widget) => (
                <SortableWidget
                  key={widget.id}
                  widget={widget}
                  isEditMode={isEditMode}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <SaveLayoutDialog />
      </div>
    </>
  );
};
