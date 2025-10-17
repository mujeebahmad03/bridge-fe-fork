"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { useDataGrid } from "./data-grid-context";
import { Input } from "@/components/ui";

import { cn } from "@/lib/utils";
import { ROW_HEIGHTS } from "@/types/leads";

interface DataGridCellProps {
  rowId: string;
  columnId: string;
  value: string;
  width?: number;
  isActive?: boolean;
  onClick?: () => void;
}

export function DataGridCell({
  rowId,
  columnId,
  value,
  width,
  isActive,
  onClick,
}: DataGridCellProps) {
  const {
    data,
    setData,
    editingCell,
    setEditingCell,
    rowHeight,
    searchState,
    setColumnDetailsPanel,
    setRowDetailsPanel,
  } = useDataGrid();
  const [cellValue, setCellValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const isEditing =
    editingCell?.rowId === rowId && editingCell?.columnId === columnId;
  const height = ROW_HEIGHTS[rowHeight];

  // Update cell value when the prop changes
  useEffect(() => {
    setCellValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingCell({ rowId, columnId });
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.();
    setColumnDetailsPanel(false);
    setRowDetailsPanel(true);
  };

  const handleBlur = () => {
    setEditingCell(null);

    const updatedData = data.map((row) => {
      if (row.id === rowId) {
        return {
          ...row,
          [columnId]: cellValue,
        };
      }
      return row;
    });

    setData(updatedData);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  // Highlight search matches
  const renderWithHighlights = () => {
    if (!searchState?.query || !cellValue) return cellValue;

    const { query, matches, activeMatchIndex } = searchState;
    const activeMatch =
      activeMatchIndex >= 0 ? matches[activeMatchIndex] : null;

    // Find matches in this cell
    const cellMatches = matches.filter(
      (m) => m.rowId === rowId && m.columnId === columnId,
    );

    if (cellMatches.length === 0) return cellValue;

    // Create highlighted content
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    const regex = new RegExp(query, "gi");
    let match;
    let matchIndex = 0;

    while ((match = regex.exec(cellValue)) !== null) {
      // Add text before match
      if (match.index > lastIndex) {
        parts.push(cellValue.slice(lastIndex, match.index));
      }

      // Check if this is the active match
      const isActiveMatch =
        activeMatch &&
        activeMatch.rowId === rowId &&
        activeMatch.columnId === columnId &&
        activeMatch.index === match.index;

      // Add highlighted match
      parts.push(
        <span
          key={`match-${matchIndex++}`}
          className={cn(
            "rounded px-1",
            isActiveMatch
              ? "bg-green-300 dark:bg-green-700"
              : "bg-green-100 dark:bg-green-900",
          )}
        >
          {match[0]}
        </span>,
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < cellValue.length) {
      parts.push(cellValue.slice(lastIndex));
    }

    return <>{parts}</>;
  };

  return (
    <td
      data-row-id={rowId}
      data-column-id={columnId}
      className={cn(
        "overflow-hidden border-r p-0 last:border-r-0",
        isActive && "bg-blue-50 dark:bg-blue-950",
      )}
      style={{
        minWidth: width || 200,
        width: width || 200,
        height,
      }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <Input
          ref={inputRef}
          value={cellValue}
          onChange={(e) => setCellValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="h-full rounded-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          style={{ height }}
        />
      ) : (
        <div className="truncate p-2" style={{ height }}>
          {renderWithHighlights()}
        </div>
      )}
    </td>
  );
}
