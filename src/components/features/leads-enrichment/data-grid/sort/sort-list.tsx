"use client";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortItem } from "./sort-item";
import type { LeadsColumn, Sort } from "@/types/leads";

interface SortListProps {
  sorts: Sort[];
  columns: LeadsColumn[];
  onSortsChange: (sorts: Sort[]) => void;
  onUpdate: (id: string, updates: Partial<Sort>) => void;
  onRemove: (id: string) => void;
}

export function SortList({
  sorts,
  columns,
  onSortsChange,
  onUpdate,
  onRemove,
}: SortListProps) {
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
      const oldIndex = sorts.findIndex((sort) => sort.id === active.id);
      const newIndex = sorts.findIndex((sort) => sort.id === over.id);

      onSortsChange(arrayMove(sorts, oldIndex, newIndex));
    }
  };

  const getAvailableColumns = (currentSortId: string) => {
    return columns.filter(
      (col) =>
        !sorts.some(
          (sort) => sort.id !== currentSortId && sort.columnId === col.id,
        ),
    );
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sorts.map((sort) => ({ id: sort.id }))}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {sorts.map((sort) => (
            <SortItem
              key={sort.id}
              sort={sort}
              columns={columns}
              availableColumns={getAvailableColumns(sort.id)}
              onUpdate={onUpdate}
              onRemove={onRemove}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
