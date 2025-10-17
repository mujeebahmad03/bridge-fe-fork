"use client";

import { useEffect, useRef } from "react";
import { Button, Input } from "@/components/ui";
import { useDataGrid } from "./data-grid-context";
import { JsonNode } from "./json-viewer";
import { CustomPanel, CustomPanelContent } from "./custom-panel";

import { toTitleCase } from "@/lib/utils";
import type { JsonValue, LeadsColumn, LeadsRow } from "@/types/leads";

interface RowDetailsPanelProps {
  row: LeadsRow | null;
  selectedCell: { columnId: string; rowId: string } | null;
  setSelectedCell: React.Dispatch<
    React.SetStateAction<{ columnId: string; rowId: string } | null>
  >;
}

export function RowDetailsPanel({
  row,
  selectedCell,
  setSelectedCell,
}: RowDetailsPanelProps) {
  const {
    columns,
    data,
    setData,
    setColumns,
    rowDetailsPanel,
    setRowDetailsPanel,
  } = useDataGrid();
  const containerRef = useRef<HTMLDivElement>(null);
  const fieldsRef = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    //clear out the selectedCell if the panel is closed
    if (!rowDetailsPanel) {
      setSelectedCell(null);
    }
  }, [rowDetailsPanel, selectedCell, setSelectedCell]);

  useEffect(() => {
    if (rowDetailsPanel && selectedCell && containerRef.current) {
      const element = fieldsRef.current.get(selectedCell.columnId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100); // Small delay to ensure the panel is fully opened
      }
    }
  }, [rowDetailsPanel, selectedCell]);

  const handleSave = () => {
    // Implementation for saving row data
    setRowDetailsPanel(false);
  };

  const handleValueChange = (columnId: string, value: string) => {
    if (!row) return;

    setData(
      data.map((r) =>
        r.id === row.id
          ? {
              ...r,
              [columnId]: value,
            }
          : r,
      ),
    );
  };

  const handleAddColumn = (path: string, value: JsonValue) => {
    // Create the new column
    const newColumn: LeadsColumn = {
      id: path,
      name: toTitleCase(path),
      sortable: true,
    };
    console.log({ newColumn });
    // Add the column
    setColumns((prev) => [...prev, newColumn]);

    // Add the value to all rows
    setData((prev) =>
      prev.map((r) => ({
        ...r,
        [path]: r.id === row?.id ? String(value) : "",
      })),
    );
  };

  const renderField = (column: LeadsColumn) => {
    if (!row) return null;

    const value = row[column.id];

    // Try to parse as JSON for structured data
    let isJson = false;
    try {
      if (
        value &&
        typeof value === "string" &&
        (value.startsWith("{") || value.startsWith("["))
      ) {
        JSON.parse(value);
        isJson = true;
      }
    } catch (e) {
      console.log({ e });
      isJson = false;
    }

    return (
      <div
        key={column.id}
        ref={(el) => {
          if (el) {
            fieldsRef.current.set(column.id, el);
          }
        }}
        className="space-y-2 border-b p-4 !text-xs last:border-b-0"
      >
        <label className="!text-xs font-medium leading-none">
          {column.name}
        </label>
        {isJson ? (
          <div className="mt-2 overflow-hidden rounded-md bg-muted/50 p-2">
            <JsonNode
              value={value !== null ? JSON.parse(value) : null}
              isRoot
              path=""
              onAddColumn={handleAddColumn}
            />
          </div>
        ) : (
          <Input
            value={value !== null ? String(value) : ""}
            onChange={(e) => handleValueChange(column.id, e.target.value)}
          />
        )}
      </div>
    );
  };

  return (
    <CustomPanel open={rowDetailsPanel} onOpenChange={setRowDetailsPanel}>
      <CustomPanelContent
        className="p-4"
        footer={
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setRowDetailsPanel(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        }
      >
        <h2 className="mb-4 bg-background text-2xl font-bold">Row Details</h2>

        <div className="h-[calc(100vh-200px)] overflow-hidden">
          <div ref={containerRef} className="h-full overflow-y-auto">
            {columns
              .filter((col) => !col.hidden)
              .map((column) => renderField(column))}
          </div>
        </div>
      </CustomPanelContent>
    </CustomPanel>
  );
}
