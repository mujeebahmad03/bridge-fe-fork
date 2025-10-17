"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui";

interface SortActionsProps {
  hasSorts: boolean;
  canAddSort: boolean;
  onAddSort: () => void;
  onRemoveAll: () => void;
  onApply: () => void;
}

export function SortActions({
  hasSorts,
  canAddSort,
  onAddSort,
  onRemoveAll,
  onApply,
}: SortActionsProps) {
  return (
    <div className="space-y-4">
      <Button
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={onAddSort}
        disabled={!canAddSort}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add sort
      </Button>

      {hasSorts && (
        <div className="flex items-center justify-between border-t pt-4">
          <Button variant="ghost" size="sm" onClick={onRemoveAll}>
            Remove all
          </Button>
          <Button size="sm" onClick={onApply}>
            Run
          </Button>
        </div>
      )}
    </div>
  );
}
