"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataGrid, DataGridContainer } from "@/components/ui/data-grid";
import {
  DataGridTableDndRowHandle,
  DataGridTableDndRows,
} from "@/components/ui/data-grid-table-dnd-rows";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { DataGridColumnFilter } from "@/components/ui/data-grid-column-filter";
import {
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from "@/components/ui/data-grid-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  RowSelectionState,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { Search, X, Users, UserCheck } from "lucide-react";

interface IData {
  id: string;
  name: string;
  availability: "online" | "away" | "busy" | "offline";
  avatar: string;
  status: "active" | "inactive";
  flag: string; // Emoji flags
  email: string;
  company: string;
  role: string;
  joined: string;
  location: string;
  balance: number;
}

const demoData: IData[] = [
  {
    id: "1",
    name: "Kathryn Campbell",
    availability: "online",
    avatar: "1.png",
    status: "active",
    flag: "🇺🇸",
    email: "kathryn@apple.com",
    company: "Apple",
    role: "CEO",
    joined: "2021-04-15",
    location: "San Francisco, USA",
    balance: 5143.03,
  },
  {
    id: "2",
    name: "Robert Smith",
    availability: "away",
    avatar: "2.png",
    status: "inactive",
    flag: "🇬🇧",
    email: "robert@openai.com",
    company: "OpenAI",
    role: "CTO",
    joined: "2020-07-20",
    location: "London, UK",
    balance: 4321.87,
  },
  {
    id: "3",
    name: "Sophia Johnson",
    availability: "busy",
    avatar: "3.png",
    status: "active",
    flag: "🇨🇦",
    email: "sophia@meta.com",
    company: "Meta",
    role: "Designer",
    joined: "2019-03-12",
    location: "Toronto, Canada",
    balance: 7654.98,
  },
  {
    id: "4",
    name: "Lucas Walker",
    availability: "offline",
    avatar: "4.png",
    status: "inactive",
    flag: "🇦🇺",
    email: "lucas@tesla.com",
    company: "Tesla",
    role: "Developer",
    joined: "2022-01-18",
    location: "Sydney, Australia",
    balance: 3456.45,
  },
  {
    id: "5",
    name: "Emily Davis",
    availability: "online",
    avatar: "5.png",
    status: "active",
    flag: "🇩🇪",
    email: "emily@sap.com",
    company: "SAP",
    role: "Lawyer",
    joined: "2023-05-23",
    location: "Berlin, Germany",
    balance: 9876.54,
  },
  {
    id: "6",
    name: "James Lee",
    availability: "away",
    avatar: "6.png",
    status: "active",
    flag: "🇲🇾",
    email: "james@keenthemes.com",
    company: "Keenthemes",
    role: "Director",
    joined: "2018-11-30",
    location: "Kuala Lumpur, MY",
    balance: 6214.22,
  },
];

export function DraggableRows() {
  const [data, setData] = useState(demoData);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo<ColumnDef<IData>[]>(
    () => [
      {
        id: "select",
        header: () => <DataGridTableRowSelectAll />,
        cell: ({ row }) => <DataGridTableRowSelect row={row} />,
        enableSorting: false,
        enableHiding: false,
        size: 40,
      },
      {
        id: "drag",
        cell: ({ row }) => <DataGridTableDndRowHandle rowId={row.id} />,
        size: 40,
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        id: "name",
        header: ({ column }) => (
          <DataGridColumnHeader
            column={column}
            title="Name"
            pinnable={true}
            visibility={true}
          />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2">
              <Avatar className="size-6">
                <AvatarImage
                  src={`/media/avatars/${row.original.avatar}`}
                  alt={row.original.name}
                />
                <AvatarFallback>N</AvatarFallback>
              </Avatar>
              <Link
                href="#"
                className="font-medium text-foreground hover:text-primary"
              >
                {row.original.name}
              </Link>
            </div>
          );
        },
        size: 175,
        enableSorting: true,
        enableHiding: true,
        filterFn: "includesString",
      },
      {
        accessorKey: "email",
        id: "email",
        header: ({ column }) => (
          <DataGridColumnHeader
            column={column}
            title="Email"
            pinnable={true}
            visibility={true}
          />
        ),
        cell: (info) => (
          <Link
            href={`mailto:${info.getValue()}`}
            className="hover:text-primary hover:underline"
          >
            {info.getValue() as string}
          </Link>
        ),
        size: 200,
        enableSorting: true,
        enableHiding: true,
        filterFn: "includesString",
        meta: {
          headerClassName: "",
          cellClassName: "",
        },
      },
      {
        accessorKey: "company",
        id: "company",
        header: ({ column }) => (
          <DataGridColumnHeader
            column={column}
            title="Company"
            pinnable={true}
            visibility={true}
            filter={
              <DataGridColumnFilter
                column={column}
                title="Company"
                options={[
                  { label: "Apple", value: "Apple" },
                  { label: "OpenAI", value: "OpenAI" },
                  { label: "Meta", value: "Meta" },
                  { label: "Tesla", value: "Tesla" },
                  { label: "SAP", value: "SAP" },
                  { label: "Keenthemes", value: "Keenthemes" },
                ]}
              />
            }
          />
        ),
        cell: ({ getValue }) => (
          <div className="font-medium">{getValue() as string}</div>
        ),
        size: 150,
        enableSorting: true,
        enableHiding: true,
        filterFn: "includesString",
      },
      {
        accessorKey: "role",
        id: "role",
        header: ({ column }) => (
          <DataGridColumnHeader
            column={column}
            title="Role"
            pinnable={true}
            visibility={true}
            filter={
              <DataGridColumnFilter
                column={column}
                title="Role"
                options={[
                  { label: "CEO", value: "CEO" },
                  { label: "CTO", value: "CTO" },
                  { label: "Designer", value: "Designer" },
                  { label: "Developer", value: "Developer" },
                  { label: "Lawyer", value: "Lawyer" },
                  { label: "Director", value: "Director" },
                ]}
              />
            }
          />
        ),
        cell: ({ getValue }) => (
          <Badge variant="secondary" className="font-normal">
            {getValue() as string}
          </Badge>
        ),
        size: 120,
        enableSorting: true,
        enableHiding: true,
        filterFn: "includesString",
      },
      {
        accessorKey: "availability",
        id: "availability",
        header: ({ column }) => (
          <DataGridColumnHeader
            column={column}
            title="Status"
            pinnable={true}
            visibility={true}
            filter={
              <DataGridColumnFilter
                column={column}
                title="Status"
                options={[
                  { label: "Online", value: "online" },
                  { label: "Away", value: "away" },
                  { label: "Busy", value: "busy" },
                  { label: "Offline", value: "offline" },
                ]}
              />
            }
          />
        ),
        cell: ({ getValue }) => {
          const status = getValue() as string;
          const statusConfig = {
            online: {
              label: "Online",
              className: "bg-green-100 text-green-800",
            },
            away: { label: "Away", className: "bg-yellow-100 text-yellow-800" },
            busy: { label: "Busy", className: "bg-red-100 text-red-800" },
            offline: {
              label: "Offline",
              className: "bg-gray-100 text-gray-800",
            },
          };
          const config = statusConfig[status as keyof typeof statusConfig];
          return (
            <Badge variant="secondary" className={config.className}>
              {config.label}
            </Badge>
          );
        },
        size: 100,
        enableSorting: true,
        enableHiding: true,
        filterFn: "includesString",
      },
      {
        accessorKey: "location",
        id: "location",
        header: ({ column }) => (
          <DataGridColumnHeader
            column={column}
            title="Location"
            pinnable={true}
            visibility={true}
          />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-1.5">
              {row.original.flag}
              <div className="font-medium text-foreground">
                {row.original.location}
              </div>
            </div>
          );
        },
        size: 170,
        enableSorting: true,
        enableHiding: true,
        filterFn: "includesString",
        meta: {
          headerClassName: "",
          cellClassName: "text-start",
        },
      },
      {
        accessorKey: "balance",
        id: "balance",
        header: ({ column }) => (
          <DataGridColumnHeader
            column={column}
            title="Balance"
            pinnable={true}
            visibility={true}
          />
        ),
        cell: ({ getValue }) => {
          const balance = getValue() as number;
          return (
            <div className="text-right font-mono">
              ${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
          );
        },
        size: 120,
        enableSorting: true,
        enableHiding: true,
        filterFn: "includesString",
      },
    ],
    [],
  );

  const dataIds = useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id),
    [data],
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  };

  const table = useReactTable({
    columns,
    data,
    getRowId: (row: IData) => row.id,
    state: {
      rowSelection,
      columnFilters,
      sorting,
      columnVisibility,
      globalFilter,
    },
    enableRowSelection: true,
    enableMultiRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const selectedCount = selectedRows.length;

  return (
    <div className="space-y-4">
      {/* Search and Filter Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search all columns..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-8"
            />
            {globalFilter && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 p-0"
                onClick={() => setGlobalFilter("")}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        {/* Selection Info */}
        {selectedCount > 0 && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              {selectedCount === 1 ? (
                <UserCheck className="h-3 w-3" />
              ) : (
                <Users className="h-3 w-3" />
              )}
              {selectedCount} selected
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRowSelection({})}
            >
              Clear selection
            </Button>
          </div>
        )}
      </div>

      {/* Data Grid */}
      <DataGrid
        table={table}
        recordCount={data?.length || 0}
        tableLayout={{
          rowsDraggable: true,
          columnsResizable: true,
          columnsPinnable: true,
          columnsMovable: true,
          columnsVisibility: true,
        }}
      >
        <DataGridContainer>
          <ScrollArea>
            <DataGridTableDndRows
              handleDragEnd={handleDragEnd}
              dataIds={dataIds}
            />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </DataGridContainer>

        {/* Pagination */}
        <DataGridPagination
          sizes={[5, 10, 25, 50]}
          info="{from} - {to} of {count} results"
        />
      </DataGrid>
    </div>
  );
}
