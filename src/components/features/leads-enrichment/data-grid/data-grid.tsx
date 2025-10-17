"use client";

import { useEffect, useState } from "react";

import { ColumnDetailsPanel } from "./column-details-panel";
import { DataGridBody } from "./data-grid-body";
import { DataGridFooter } from "./data-grid-footer";
import { DataGridHeader } from "./data-grid-header";
import { DataGridProvider } from "./data-grid-context";
import { DataGridToolbar } from "./data-grid-toolbar";
import { RowDetailsPanel } from "./row-details-panel";
import { TemplateSelector } from "./template";

import type {
  LeadsColumn,
  LeadsRow,
  RowHeight,
  TemplateType,
} from "@/types/leads";
import { DefaultRowMap, DefaultTemplateFieldsMap } from "@/config/work-sheet";
import { initialCustomColumns, initialCustomRow } from "@/data/leads";

interface DataGridProps {
  initialTemplate?: TemplateType;
  initialColumns?: LeadsColumn[];
  initialData?: LeadsRow[];
  className?: string;
  onTemplateChange?: (template: TemplateType) => void;
}

export function DataGrid({
  initialTemplate = "Custom" as TemplateType,
  initialColumns = initialCustomColumns,
  initialData = initialCustomRow,
  className,
  onTemplateChange,
}: DataGridProps) {
  const [template, setTemplate] = useState<TemplateType>(initialTemplate);
  const [columns, setColumns] = useState<LeadsColumn[]>(initialColumns);
  const [data, setData] = useState<LeadsRow[]>(initialData);
  const [selectedRow, setSelectedRow] = useState<LeadsRow | null>(null);
  const [selectedCell, setSelectedCell] = useState<{
    columnId: string;
    rowId: string;
  } | null>(null);
  const [rowHeight, setRowHeight] = useState<RowHeight>("medium");

  useEffect(() => {
    if (template === ("Custom" as TemplateType)) {
      return; // Keep current columns for custom template
    }

    const templateColumns =
      DefaultTemplateFieldsMap[
        template as keyof typeof DefaultTemplateFieldsMap
      ];

    const rowData = DefaultRowMap[template as keyof typeof DefaultRowMap];

    if (templateColumns) {
      setColumns(templateColumns);

      // Create empty data rows based on new columns
      const emptyRow = templateColumns.reduce(
        (acc, col) => {
          acc[col.id] = "";
          return acc;
        },
        {} as Record<string, string>,
      );

      const newData = Array(7)
        .fill(0)
        .map((_, i) => ({
          id: String(i + 2),
          ...emptyRow,
        }));

      setData([...rowData, ...newData]);
    }
  }, [template]);

  const handleCellClick = (row: LeadsRow, columnId: string) => {
    setSelectedRow(row);
    setSelectedCell({ columnId, rowId: row.id });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <TemplateSelector
          value={template}
          onChange={(newTemplate) => {
            setTemplate(newTemplate);
            if (onTemplateChange) {
              onTemplateChange(newTemplate);
            }
          }}
        />
        <div className="text-sm text-muted-foreground">
          {template === ("Custom" as TemplateType)
            ? "Custom template with your own fields"
            : `Template: ${template}`}
        </div>
      </div>
      <DataGridProvider
        columns={columns}
        setColumns={setColumns}
        data={data}
        setData={setData}
        rowHeight={rowHeight}
        setRowHeight={setRowHeight}
      >
        <div className={`overflow-hidden rounded-md border ${className}`}>
          <DataGridToolbar />

          <div className={`${selectedCell && "me-[360px]"} overflow-x-auto`}>
            <table className="relative w-full table-fixed border-collapse">
              <DataGridHeader />
              <DataGridBody
                onCellClick={handleCellClick}
                selectedCell={selectedCell}
              />
            </table>
          </div>
          <DataGridFooter />
        </div>
        <RowDetailsPanel
          row={selectedRow}
          selectedCell={selectedCell}
          setSelectedCell={setSelectedCell}
        />

        <ColumnDetailsPanel />
      </DataGridProvider>
    </div>
  );
}
