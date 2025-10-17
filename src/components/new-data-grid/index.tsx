"use client";

import { useMemo } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import { DataGrid } from "@/components/ui/data-grid";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import { DataGridTableDnd } from "@/components/ui/data-grid-table-dnd";
import {
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from "@/components/ui/data-grid-table";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { BaseTableItem, TableAction, TableColumn, TableConfig } from "./types";
import { useTableState } from "./hooks/use-table-state";
import { useTableFilters } from "./hooks/use-table-filters";
import { TableActions } from "./components/table-actions";
import { TableSearch } from "./components/table-search";
import { TableFilter } from "./components/table-filter";

interface DataTableProps<T extends BaseTableItem> {
  data: T[];
  columns: TableColumn<T>[];
  actions?: TableAction<T>[];
  config?: TableConfig;
  initialPageSize?: number;
  enableSearch?: boolean;
  enableFilters?: boolean;
  enableSelection?: boolean;
  searchPlaceholder?: string;
  title?: string;
  headerActions?: React.ReactNode;
}

export function DataTable<T extends BaseTableItem>({
  data,
  columns,
  actions = [],
  config = {},
  initialPageSize = 5,
  enableSearch = true,
  enableFilters = true,
  enableSelection = true,
  searchPlaceholder = "Search...",
  headerActions,
}: DataTableProps<T>) {
  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    searchQuery,
    setSearchQuery,
    selectedFilters,
    filteredData,
    columnOrder,
    setColumnOrder,
    updateFilter,
    clearSearch,
  } = useTableState({
    data,
    initialPageSize,
    initialSorting: [],
  });

  const filterableColumns = useMemo(
    () =>
      columns
        .filter((col) => col.filterable)
        .map((col) => col.accessor || col.id) as (keyof T)[],
    [columns],
  );

  const filterOptions = useTableFilters(data, filterableColumns);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const nonDraggableColumns = columns
        .filter((col) => col.draggable === false)
        .map((col) => col.id);

      if (
        nonDraggableColumns.includes(active.id as string) ||
        nonDraggableColumns.includes(over.id as string)
      ) {
        return;
      }

      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex);
      });
    }
  };

  const tableColumns = useMemo<ColumnDef<T>[]>(() => {
    const cols: ColumnDef<T>[] = [];

    // Selection column
    if (enableSelection) {
      cols.push({
        accessorKey: "id" as keyof T,
        id: "select",
        header: () => <DataGridTableRowSelectAll />,
        cell: ({ row }) => <DataGridTableRowSelect row={row} />,
        enableSorting: false,
        size: 35,
        meta: {
          headerClassName: "",
          cellClassName: "",
          draggable: false,
        },
        enableResizing: false,
      });
    }

    // Data columns
    columns.forEach((column) => {
      cols.push({
        accessorKey: column.accessor || (column.id as keyof T),
        id: column.id as string,
        header: ({ column: tableColumn }) => (
          <DataGridColumnHeader
            title={column.header}
            visibility={true}
            column={tableColumn}
          />
        ),
        cell: ({ row }) => {
          if (column.render) {
            return column.render(row.original);
          }
          const value = row.original[column.accessor || (column.id as keyof T)];
          return <div>{String(value)}</div>;
        },
        size: column.width || 150,
        enableSorting: column.sortable !== false,
        enableHiding: column.hideable !== false,
        enableResizing: column.resizable !== false,
        meta: {
          draggable: column.draggable !== false,
        },
      });
    });

    // Actions column
    if (actions.length > 0) {
      cols.push({
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <TableActions item={row.original} actions={actions} />
        ),
        size: 60,
        enableSorting: false,
        enableHiding: false,
        enableResizing: false,
        meta: {
          draggable: false,
        },
      });
    }

    return cols;
  }, [columns, actions, enableSelection]);

  const table = useReactTable({
    columns: tableColumns,
    data: filteredData,
    pageCount: Math.ceil((filteredData?.length || 0) / pagination.pageSize),
    getRowId: (row: T) => row.id,
    state: {
      pagination,
      sorting,
      columnOrder:
        columnOrder.length > 0
          ? columnOrder
          : tableColumns.map((col) => col.id as string),
    },
    columnResizeMode: "onChange",
    onColumnOrderChange: setColumnOrder,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <DataGrid
      table={table}
      recordCount={filteredData?.length || 0}
      tableLayout={{
        columnsDraggable: config.columnsDraggable ?? true,
        columnsPinnable: config.columnsPinnable ?? true,
        columnsResizable: config.columnsResizable ?? true,
        columnsMovable: config.columnsMovable ?? true,
        columnsVisibility: config.columnsVisibility ?? true,
        dense: config.dense ?? true,
      }}
    >
      <Card>
        <CardHeader className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {enableSearch && (
                <TableSearch
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  onClearSearch={clearSearch}
                  placeholder={searchPlaceholder}
                />
              )}

              {enableFilters &&
                filterableColumns.map((column) => {
                  const columnKey = String(column);
                  const options = filterOptions[columnKey] || [];
                  const selectedValues = selectedFilters[columnKey] || [];

                  return (
                    <TableFilter
                      key={columnKey}
                      title={
                        columns.find(
                          (col) => (col.accessor || col.id) === column,
                        )?.header || columnKey
                      }
                      options={options}
                      selectedValues={selectedValues}
                      onSelectionChange={(values) =>
                        updateFilter(columnKey, values)
                      }
                    />
                  );
                })}
            </div>

            {headerActions && <div>{headerActions}</div>}
          </div>
        </CardHeader>

        <div>
          <ScrollArea>
            <DataGridTableDnd handleDragEnd={handleDragEnd} />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        <CardFooter>
          <DataGridPagination />
        </CardFooter>
      </Card>
    </DataGrid>
  );
}
