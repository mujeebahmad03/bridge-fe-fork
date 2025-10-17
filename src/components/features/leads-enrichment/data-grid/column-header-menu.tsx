"use client";

import {
  ArrowUpWideNarrowIcon as ArrowsHorizontal,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  Copy,
  EyeOff,
  Pencil,
  Trash2,
  Type,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useDataGrid } from "./data-grid-context";
import type { LeadsColumn } from "@/types/leads";

interface ColumnHeaderMenuProps {
  column: LeadsColumn;
  onEdit: () => void;
}

export function ColumnHeaderMenu({ column, onEdit }: ColumnHeaderMenuProps) {
  const { columns, setColumns, data, setData } = useDataGrid();

  const handleResizeColumn = () => {
    const newWidth = window.prompt(
      "Enter new column width (in pixels):",
      "200",
    );
    if (newWidth && !isNaN(Number(newWidth))) {
      setColumns(
        columns.map((col) =>
          col.id === column.id ? { ...col, width: Number(newWidth) } : col,
        ),
      );
    }
  };

  const handleSort = (direction: "asc" | "desc") => {
    const sortedData = [...data].sort((a, b) => {
      if (direction === "asc") {
        return a[column.id] > b[column.id] ? 1 : -1;
      }
      return a[column.id] < b[column.id] ? 1 : -1;
    });
    setData(sortedData);
  };

  const handleDuplicateColumn = () => {
    const newColumnId = `${column.id}_copy`;
    const newColumn = {
      ...column,
      id: newColumnId,
      name: `${column.name} (Copy)`,
    };

    setColumns([...columns, newColumn]);
    setData(
      data.map((row) => ({
        ...row,
        [newColumnId]: row[column.id],
      })),
    );
  };

  const handleInsertColumn = (position: "left" | "right") => {
    const currentIndex = columns.findIndex((col) => col.id === column.id);
    const newColumnId = `column_${Date.now()}`;
    const newColumn = {
      id: newColumnId,
      name: "New Column",
      sortable: true,
      icon: Type,
    };

    const newColumns = [...columns];
    newColumns.splice(
      position === "left" ? currentIndex : currentIndex + 1,
      0,
      newColumn,
    );

    setColumns(newColumns);
    setData(
      data.map((row) => ({
        ...row,
        [newColumnId]: "",
      })),
    );
  };

  const handleHideColumn = () => {
    setColumns(
      columns.map((col) =>
        col.id === column.id ? { ...col, hidden: true } : col,
      ),
    );
  };

  const handleDeleteColumn = () => {
    if (window.confirm("Are you sure you want to delete this column?")) {
      setColumns(columns.filter((col) => col.id !== column.id));
      setData(
        data.map((row) => {
          const newRow = { ...row };
          delete newRow[column.id];
          return newRow;
        }),
      );
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-4 w-4 hover:bg-muted"
          onClick={(e) => e.stopPropagation()}
        >
          <ChevronDown className="h-3 w-3" />
          <span className="sr-only">Open column menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuItem onClick={onEdit}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit column
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleResizeColumn}>
          <ArrowsHorizontal className="mr-2 h-4 w-4" />
          Resize column
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => handleSort("asc")}>
          <ArrowUp className="mr-2 h-4 w-4" />
          Sort ascending
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSort("desc")}>
          <ArrowDown className="mr-2 h-4 w-4" />
          Sort descending
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleDuplicateColumn}>
          <Copy className="mr-2 h-4 w-4" />
          Duplicate column
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleInsertColumn("left")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Insert 1 column left
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleInsertColumn("right")}>
          <ArrowRight className="mr-2 h-4 w-4" />
          Insert 1 column right
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleHideColumn}>
          <EyeOff className="mr-2 h-4 w-4" />
          Hide column
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDeleteColumn}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete column
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
