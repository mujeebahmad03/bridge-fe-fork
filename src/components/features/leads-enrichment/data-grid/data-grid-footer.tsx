"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui";
import { useDataGrid } from "./data-grid-context";
import { LeadsRow } from "@/types/leads";

export function DataGridFooter() {
  const { data, setData, columns } = useDataGrid();

  const addRow = () => {
    const newRowId = String(data.length + 1);

    // Create a new row with empty values for all columns
    const newRow: LeadsRow = {
      id: newRowId,
    };

    // Add empty values for each column
    columns.forEach((column) => {
      newRow[column.id] = "";
    });

    setData([...data, newRow]);
  };

  return (
    <div className="flex justify-start border-t p-2">
      <Button variant="ghost" size="sm" onClick={addRow} className="h-6 px-2">
        <Plus className="mr-1 h-4 w-4" />
        Add Row
      </Button>
    </div>
  );
}
