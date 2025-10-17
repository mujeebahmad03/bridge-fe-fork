"use client";

import { Plus, Type } from "lucide-react";

import { ColumnHeaderMenu } from "./column-header-menu";
import { Button } from "@/components/ui";
import { useDataGrid } from "./data-grid-context";

import type { LeadsColumn } from "@/types/leads";

export function DataGridHeader() {
  const {
    columns,
    setColumns,
    data,
    setData,
    setSelectedColumn,
    setColumnDetailsPanel,
    setRowDetailsPanel,
    setColumnName,
  } = useDataGrid();

  const addColumn = () => {
    const newColumnId = `column${columns.length + 1}`;
    const name = `Column ${columns.length + 1}`;
    setColumns([
      ...columns,
      {
        id: newColumnId,
        name,
        sortable: true,
        icon: Type,
      },
    ]);

    setData(
      data.map((row) => ({
        ...row,
        [newColumnId]: "",
      })),
    );

    setColumnName(name);

    setColumnDetailsPanel(true);
  };

  const handleColumnClick = (column: LeadsColumn) => {
    setSelectedColumn(column);
    setRowDetailsPanel(false);
    setColumnDetailsPanel(true);
  };

  return (
    <>
      <thead className="bg-muted/50 dark:bg-muted/20">
        <tr>
          {/* S/N Column - Fixed on the left */}
          <th className="sticky left-0 z-10 w-16 border-b border-r bg-muted/50 p-2 text-center font-medium text-muted-foreground dark:bg-[#0a1129]">
            <span className="text-xs">#</span>
          </th>

          {/* Data Columns */}
          {columns
            .filter((col) => !col.hidden)
            .map((column) => (
              <th
                key={column.id}
                className="border-b border-r p-2 text-left font-medium text-muted-foreground last:border-r-0"
                style={{
                  maxWidth: column.width || 200,
                  width: column.width || 200,
                }}
              >
                <div className="flex items-center justify-between gap-1">
                  <div
                    className="flex cursor-pointer items-center gap-1 hover:text-primary"
                    onClick={() => handleColumnClick(column)}
                  >
                    <span>{column.name}</span>
                  </div>
                  <ColumnHeaderMenu
                    column={column}
                    onEdit={() => handleColumnClick(column)}
                  />
                </div>
              </th>
            ))}

          {/* Add Column Button */}
          <th className="w-10 border-b p-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={addColumn}
              className="h-6 w-6"
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add column</span>
            </Button>
          </th>
        </tr>
      </thead>
    </>
  );
}
