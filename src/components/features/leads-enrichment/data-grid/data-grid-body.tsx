"use client";

import { useDataGrid } from "./data-grid-context";
import { DataGridCell } from "./data-grid-cell";
import type { LeadsRow } from "@/types/leads";

interface DataGridBodyProps {
  onCellClick: (row: LeadsRow, columnId: string) => void;
  selectedCell: { columnId: string; rowId: string } | null;
}

export function DataGridBody({ onCellClick, selectedCell }: DataGridBodyProps) {
  const { columns, data } = useDataGrid();
  const visibleColumns = columns.filter((col) => !col.hidden);

  return (
    <tbody>
      {data.map((row) => (
        <tr
          key={row.id}
          className="border-b last:border-b-0 hover:bg-muted/50 dark:hover:bg-muted/20"
        >
          {/* S/N Column - Fixed on the left */}
          <td className="sticky left-0 z-10 w-16 border-r bg-background p-2 text-center text-muted-foreground dark:bg-background">
            {row.id}
          </td>

          {/* Data Cells */}
          {visibleColumns.map((column) => (
            <DataGridCell
              key={`${row.id}-${column.id}`}
              rowId={row.id}
              columnId={column.id}
              value={row[column.id]}
              width={column.width}
              isActive={
                selectedCell?.rowId === row.id &&
                selectedCell?.columnId === column.id
              }
              onClick={() => onCellClick(row, column.id)}
            />
          ))}

          {/* Empty cell for alignment with add column button */}
          <td className="w-10"></td>
        </tr>
      ))}
    </tbody>
  );
}
