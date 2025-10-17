"use client";

import { useState } from "react";

export function useTableExpansion() {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (rowId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(rowId)) {
      newExpanded.delete(rowId);
    } else {
      newExpanded.add(rowId);
    }
    setExpandedRows(newExpanded);
  };

  const isExpanded = (rowId: string) => expandedRows.has(rowId);

  const collapseAll = () => setExpandedRows(new Set());

  return {
    expandedRows,
    toggleRow,
    isExpanded,
    collapseAll,
  };
}
