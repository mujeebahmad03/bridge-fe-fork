"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useDebouncedSearch } from "@/hooks/use-debounced-search";
import { useDataGridData, useStatusCounts } from "@/hooks/use-data-grid";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DataGrid } from "@/components/ui/data-grid";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import { DataGridTableDnd } from "@/components/ui/data-grid-table-dnd";
import {
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from "@/components/ui/data-grid-table";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { RiCheckboxCircleFill } from "@remixicon/react";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import {
  ColumnDef,
  getCoreRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Ellipsis, Filter, Search, UserRoundPlus, X } from "lucide-react";
import { toast } from "sonner";
import { IData } from "@/services/data-grid-api";

function ActionsCell({ row }: { row: Row<IData> }) {
  const { copy } = useCopyToClipboard();
  const handleCopyId = () => {
    copy(row.original.id);
    const message = `Employee ID successfully copied: ${row.original.id}`;
    toast.custom(
      () => (
        <Alert variant="default">
          <div className="shrink-0 text-foreground">
            <RiCheckboxCircleFill />
          </div>
          <AlertTitle>{message}</AlertTitle>
        </Alert>
      ),
      {
        position: "top-center",
      },
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-7" variant="ghost">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuItem onClick={() => {}}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyId}>Copy ID</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="bg-destructive/10 text-destructive"
          onClick={() => {}}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AdvancedDataGrid() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: true },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  // Debounce search query
  const debouncedSearchQuery = useDebouncedSearch(searchQuery, 500);

  // Prepare API parameters
  const apiParams = useMemo(
    () => ({
      page: pagination.pageIndex + 1, // API expects 1-based page numbers
      pageSize: pagination.pageSize,
      search: debouncedSearchQuery || undefined,
      status: selectedStatuses.length > 0 ? selectedStatuses : undefined,
      sortBy: sorting[0]?.id,
      sortOrder: sorting[0]?.desc ? ("desc" as const) : ("asc" as const),
    }),
    [pagination, debouncedSearchQuery, selectedStatuses, sorting],
  );

  // Fetch data using React Query
  const { data: apiResponse, isLoading, error } = useDataGridData(apiParams);
  const { data: statusCounts } = useStatusCounts();

  // Extract data from API response
  const filteredData = apiResponse?.data || [];
  const totalRecords = apiResponse?.total || 0;

  const handleStatusChange = (checked: boolean, value: string) => {
    setSelectedStatuses(
      (
        prev = [], // Default to an empty array
      ) => (checked ? [...prev, value] : prev.filter((v) => v !== value)),
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      // Don't allow dragging of id and actions columns
      if (
        active.id === "id" ||
        active.id === "actions" ||
        over.id === "id" ||
        over.id === "actions"
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

  const columns = useMemo<ColumnDef<IData>[]>(
    () => [
      {
        accessorKey: "id",
        id: "id",
        header: () => <DataGridTableRowSelectAll />,
        cell: ({ row }) => <DataGridTableRowSelect row={row} />,
        enableSorting: false,
        size: 35,
        meta: {
          headerClassName: "",
          cellClassName: "",
          draggable: false, // Make this column non-draggable
        },
        enableResizing: false,
      },
      {
        accessorKey: "name",
        id: "name",
        header: ({ column }) => (
          <DataGridColumnHeader
            title="User"
            visibility={true}
            column={column}
          />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-3">
              <Avatar className="size-8">
                <AvatarImage
                  src={`/media/avatars/${row.original.avatar}`}
                  alt={row.original.name}
                />
                <AvatarFallback>N</AvatarFallback>
              </Avatar>
              <div className="space-y-px">
                <div className="font-medium text-foreground">
                  {row.original.name}
                </div>
              </div>
            </div>
          );
        },
        size: 250,
        enableSorting: true,
        enableHiding: false,
        enableResizing: true,
      },
      {
        accessorKey: "location",
        id: "location",
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Location"
            visibility={true}
            column={column}
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
        size: 200,
        meta: {
          headerClassName: "",
          cellClassName: "text-start",
        },
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
      },
      {
        accessorKey: "email",
        id: "email",
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Email"
            visibility={true}
            column={column}
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
        size: 180,
        meta: {
          headerClassName: "",
          cellClassName: "",
        },
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
      },
      {
        accessorKey: "status",
        id: "status",
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Status"
            visibility={true}
            column={column}
          />
        ),
        cell: ({ row }) => {
          const status = row.original.status;

          if (status == "Active") {
            return <Badge variant="default">Approved</Badge>;
          } else if (status == "Blocked") {
            return <Badge variant="destructive">Blocked</Badge>;
          } else if (status == "Inactive") {
            return <Badge variant="secondary">Inactive</Badge>;
          } else {
            return <Badge variant="secondary">Pending</Badge>;
          }
        },
        size: 100,
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => <ActionsCell row={row} />,
        size: 60,
        enableSorting: false,
        enableHiding: false,
        enableResizing: false,
        meta: {
          draggable: false, // Make this column non-draggable
        },
      },
    ],
    [],
  );

  const [columnOrder, setColumnOrder] = useState<string[]>(
    columns.map((column) => column.id as string),
  );

  const table = useReactTable({
    columns,
    data: filteredData,
    pageCount: Math.ceil(totalRecords / pagination.pageSize),
    getRowId: (row: IData) => row.id,
    state: {
      pagination,
      sorting,
      columnOrder,
    },
    columnResizeMode: "onChange",
    onColumnOrderChange: setColumnOrder,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, // Enable server-side pagination
    manualSorting: true, // Enable server-side sorting
    manualFiltering: true, // Enable server-side filtering
  });

  // Show loading state
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="py-4">
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">Loading data...</div>
          </div>
        </CardHeader>
      </Card>
    );
  }

  // Show error state
  if (error) {
    return (
      <Card>
        <CardHeader className="py-4">
          <div className="flex items-center justify-center py-8">
            <div className="text-destructive">
              Error loading data: {error.message}
            </div>
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <DataGrid
      table={table}
      recordCount={totalRecords}
      tableLayout={{
        columnsDraggable: true,
        columnsPinnable: true,
        columnsResizable: true,
        columnsMovable: true,
        columnsVisibility: true,
        dense: true,
      }}
    >
      <Card>
        <CardHeader className="py-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <Search className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-40 ps-9"
                />
                {searchQuery.length > 0 && (
                  <Button
                    variant="ghost"
                    className="absolute end-1.5 top-1/2 h-6 w-6 -translate-y-1/2"
                    onClick={() => setSearchQuery("")}
                  >
                    <X />
                  </Button>
                )}
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Filter />
                    Status
                    {selectedStatuses.length > 0 && (
                      <Badge variant="outline">{selectedStatuses.length}</Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-3" align="start">
                  <div className="space-y-3">
                    <div className="text-xs font-medium text-muted-foreground">
                      Filters
                    </div>
                    <div className="space-y-3">
                      {statusCounts &&
                        Object.keys(statusCounts).map((status) => (
                          <div
                            key={status}
                            className="flex items-center gap-2.5"
                          >
                            <Checkbox
                              id={status}
                              checked={selectedStatuses.includes(status)}
                              onCheckedChange={(checked) =>
                                handleStatusChange(checked === true, status)
                              }
                            />
                            <Label
                              htmlFor={status}
                              className="flex grow items-center justify-between gap-1.5 font-normal"
                            >
                              {status}
                              <span className="text-muted-foreground">
                                {statusCounts[status]}
                              </span>
                            </Label>
                          </div>
                        ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div>
            <Button>
              <UserRoundPlus />
              Add new
            </Button>
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
