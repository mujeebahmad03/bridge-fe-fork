"use client";

import * as React from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type Row,
  type CellContext,
} from "@tanstack/react-table";

import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useTableExpansion } from "../hooks";
import { BulkActionsBar } from "./bulk-actions-bar";
import { MobileTableView, TablePagination } from "./table";
import { EntityRowData } from "../types";

interface ExtendedCellContext<TData, TValue>
  extends CellContext<TData, TValue> {
  toggleRow?: () => void;
  isExpanded?: boolean;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  expandedComponent?: (props: { row: Row<TData> }) => React.ReactNode;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
  };
  isLoading?: boolean;
  searchKey?: string;
  entityType: "contacts" | "companies" | "leads";
}

export function DataTable<TData, TValue>({
  columns,
  data,
  expandedComponent,
  pagination,
  isLoading = false,
  entityType,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const { toggleRow, isExpanded } = useTableExpansion();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
  });

  const selectedCount = table.getFilteredSelectedRowModel().rows.length;
  const totalCount = table.getFilteredRowModel().rows.length;

  const handleSelectAll = () => {
    table.toggleAllPageRowsSelected(true);
  };

  const handleClearSelection = () => {
    table.toggleAllPageRowsSelected(false);
    setRowSelection({});
  };

  const handleBulkAction = (action: string) => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    console.log(
      `Bulk ${action} for ${selectedRows.length} ${entityType}:`,
      selectedRows.map((row) => row.original),
    );
    // TODO: Implement actual bulk actions
  };

  if (isLoading) {
    return (
      <Card className="overflow-hidden">
        <div className="p-8 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-background to-muted/20">
      <BulkActionsBar
        selectedCount={selectedCount}
        totalCount={totalCount}
        onSelectAll={handleSelectAll}
        onClearSelection={handleClearSelection}
        onAddToList={() => handleBulkAction("addToList")}
        onAddTags={() => handleBulkAction("addTags")}
        onAddStatus={() => handleBulkAction("addStatus")}
        onAddOwners={() => handleBulkAction("addOwners")}
        onDelete={() => handleBulkAction("delete")}
        entityType={entityType}
      />

      {/* Desktop Table */}
      <div className="hidden lg:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-gradient-to-r from-primary/5 to-primary/10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="p-4 text-left text-sm font-medium text-muted-foreground"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <React.Fragment key={row.id}>
                    <tr
                      className="border-b transition-all duration-200 hover:bg-gradient-to-r hover:from-muted/30 hover:to-muted/10"
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="p-4">
                          {flexRender(cell.column.columnDef.cell, {
                            ...cell.getContext(),
                            toggleRow: () => toggleRow(row.id),
                            isExpanded: isExpanded(row.id),
                          } as ExtendedCellContext<TData, TValue>)}
                        </td>
                      ))}
                    </tr>
                    {isExpanded(row.id) && expandedComponent && (
                      <tr>
                        <td
                          colSpan={columns.length}
                          className="border-l-4 border-primary/30 bg-gradient-to-r from-muted/40 to-muted/20 p-4"
                        >
                          {expandedComponent({ row })}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Table */}
      <div className="lg:hidden">
        <div className="mb-4 flex items-center justify-between p-4">
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
          />
          <span className="text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} selected
          </span>
        </div>

        <MobileTableView
          rows={table.getRowModel().rows as Row<EntityRowData>[]}
          onToggleRow={toggleRow}
          isExpanded={isExpanded}
          expandedComponent={
            expandedComponent as (props: {
              row: Row<EntityRowData>;
            }) => React.ReactNode
          }
          entityType={entityType}
        />
      </div>

      {pagination && <TablePagination {...pagination} />}
    </Card>
  );
}
