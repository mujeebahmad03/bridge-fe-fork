"use client";

import { useMemo, useState } from "react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
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
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { RiCheckboxCircleFill } from "@remixicon/react";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Ellipsis,
  Linkedin,
  Mail,
  Phone,
  X,
  ChevronDown,
  Users,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { Contact } from "../types";
import { sampleContacts } from "../data/contact";
import { TableSearch } from "@/components/new-data-grid/components/table-search";
import Link from "next/link";
import { dashboardRoutes } from "@/config/routes";
import { BulkActionsBar } from "./bulk-actions-bar";

interface FilterState {
  status: string[];
  organization: string[];
  assignedTo: string[];
  role: string[];
}

function ActionsCell({ row }: { row: Row<Contact> }) {
  const { copy } = useCopyToClipboard();
  const handleCopyId = () => {
    copy(row.original.id);
    const message = `Employee ID successfully copied: ${row.original.id}`;
    toast.custom(
      () => (
        <Alert variant="default">
          <RiCheckboxCircleFill />
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

interface FilterDropdownProps {
  title: string;
  icon: React.ReactNode;
  options: { value: string; label: string; count: number }[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
}

function FilterDropdown({
  title,
  icon,
  options,
  selectedValues,
  onSelectionChange,
}: FilterDropdownProps) {
  const handleToggle = (value: string) => {
    if (selectedValues.includes(value)) {
      onSelectionChange(selectedValues.filter((v) => v !== value));
    } else {
      onSelectionChange([...selectedValues, value]);
    }
  };

  const hasActiveFilters = selectedValues.length > 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={hasActiveFilters ? "default" : "outline"}
          size="sm"
          className="h-8 gap-2"
        >
          {icon}
          {title}
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-1 h-5 px-1 text-xs">
              {selectedValues.length}
            </Badge>
          )}
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <div className="p-2">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">{title}</span>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={() => onSelectionChange([])}
              >
                Clear
              </Button>
            )}
          </div>
          <div className="max-h-64 overflow-y-auto">
            {options.map((option) => (
              <DropdownMenuCheckboxItem
                key={option.value}
                checked={selectedValues.includes(option.value)}
                onCheckedChange={() => handleToggle(option.value)}
                className="flex items-center justify-between"
              >
                <span className="truncate">{option.label}</span>
                <Badge variant="outline" className="ml-2 h-5 px-1.5 text-xs">
                  {option.count}
                </Badge>
              </DropdownMenuCheckboxItem>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function NewContactTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: true },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    status: [],
    organization: [],
    assignedTo: [],
    role: [],
  });

  // Generate filter options with counts
  const filterOptions = useMemo(() => {
    const statusOptions = Array.from(
      new Set(sampleContacts.map((c) => c.status)),
    ).map((status) => ({
      value: status,
      label: status.charAt(0).toUpperCase() + status.slice(1),
      count: sampleContacts.filter((c) => c.status === status).length,
    }));

    const organizationOptions = Array.from(
      new Set(sampleContacts.map((c) => c.organization)),
    ).map((org) => ({
      value: org,
      label: org,
      count: sampleContacts.filter((c) => c.organization === org).length,
    }));

    const assignedToOptions = Array.from(
      new Set(sampleContacts.map((c) => c.assignedTo)),
    ).map((assignee) => ({
      value: assignee,
      label: assignee,
      count: sampleContacts.filter((c) => c.assignedTo === assignee).length,
    }));

    const roleOptions = Array.from(
      new Set(sampleContacts.map((c) => c.role)),
    ).map((role) => ({
      value: role,
      label: role,
      count: sampleContacts.filter((c) => c.role === role).length,
    }));

    return {
      status: statusOptions,
      organization: organizationOptions,
      assignedTo: assignedToOptions,
      role: roleOptions,
    };
  }, []);

  const filteredData = useMemo(() => {
    return sampleContacts.filter((item) => {
      // Filter by status
      const matchesStatus =
        !filters.status.length || filters.status.includes(item.status);

      // Filter by organization
      const matchesOrganization =
        !filters.organization.length ||
        filters.organization.includes(item.organization);

      // Filter by assigned to
      const matchesAssignedTo =
        !filters.assignedTo.length ||
        filters.assignedTo.includes(item.assignedTo);

      // Filter by role
      const matchesRole =
        !filters.role.length || filters.role.includes(item.role);

      // Filter by search query (case-insensitive)
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        Object.values(item)
          .join(" ") // Combine all fields into a single string
          .toLowerCase()
          .includes(searchLower);

      return (
        matchesStatus &&
        matchesOrganization &&
        matchesAssignedTo &&
        matchesRole &&
        matchesSearch
      );
    });
  }, [searchQuery, filters]);

  const handleFilterChange = (
    filterType: keyof FilterState,
    values: string[],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: values,
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      status: [],
      organization: [],
      assignedTo: [],
      role: [],
    });
    setSearchQuery("");
  };

  const activeFilterCount = Object.values(filters).reduce(
    (acc, filter) => acc + filter.length,
    0,
  );
  const hasActiveFilters = activeFilterCount > 0 || searchQuery;

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

  const columns = useMemo<ColumnDef<Contact>[]>(
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
          draggable: false,
        },
        enableResizing: false,
      },
      {
        accessorKey: "name",
        id: "name",
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Contact"
            visibility={true}
            column={column}
          />
        ),
        cell: ({ row }) => {
          return (
            <Link
              href={`${dashboardRoutes.crm}/details`}
              className="flex items-center gap-3"
            >
              <Avatar className="size-8">
                <AvatarImage
                  src={`/media/avatars/${row.original.avatar}`}
                  alt={row.original.name}
                />
                <AvatarFallback>
                  {row.original.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-px">
                <div className="font-medium text-foreground">
                  {row.original.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {row.original.role} at {row.original.organization}
                </div>
              </div>
            </Link>
          );
        },
        size: 280,
        enableSorting: true,
        enableHiding: false,
        enableResizing: true,
      },
      {
        accessorKey: "assignedTo",
        id: "assignedTo",
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Assigned To"
            visibility={true}
            column={column}
          />
        ),
        cell: ({ row }) => {
          return (
            <div className="font-medium text-foreground">
              {row.original.assignedTo}
            </div>
          );
        },
        size: 150,
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
      },
      {
        accessorKey: "email", // Sort by email field
        id: "contact_info",
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Contact Info"
            visibility={true}
            column={column}
          />
        ),
        cell: ({ row }) => {
          const { email, phone, linkedin } = row.original;

          return (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5"
                onClick={() => window.open(`mailto:${email}`, "_blank")}
              >
                <Mail className="h-3 w-3 text-muted-foreground transition-colors hover:text-primary" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5"
                onClick={() =>
                  window.open(`https://linkedin.com/in/${linkedin}`, "_blank")
                }
              >
                <Linkedin className="h-3 w-3 text-muted-foreground transition-colors hover:text-primary" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5"
                onClick={() => window.open(`tel:${phone}`, "_blank")}
              >
                <Phone className="h-3 w-3 text-muted-foreground transition-colors hover:text-primary" />
              </Button>
            </div>
          );
        },
        size: 220,
        meta: {
          headerClassName: "",
          cellClassName: "text-start",
        },
        enableSorting: true, // Enable sorting
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

          if (status === "active") {
            return <Badge variant="default">Active</Badge>;
          } else {
            return <Badge variant="secondary">Inactive</Badge>;
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
          draggable: false,
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
    pageCount: Math.ceil((filteredData?.length || 0) / pagination.pageSize),
    getRowId: (row: Contact) => row.id,
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
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const clearSearch = () => setSearchQuery("");

  const selectedCount = table.getFilteredSelectedRowModel().rows.length;
  const totalCount = table.getFilteredRowModel().rows.length;

  const handleSelectAll = () => {
    table.toggleAllPageRowsSelected(true);
  };

  const handleClearSelection = () => {
    table.toggleAllPageRowsSelected(false);
  };

  const handleBulkAction = (action: string) => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    console.log(
      `Bulk ${action} for ${selectedRows.length} contacts:`,
      selectedRows.map((row) => row.original),
    );
    // TODO: Implement actual bulk actions
  };

  return (
    <DataGrid
      table={table}
      recordCount={filteredData?.length || 0}
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
        <CardHeader className="space-y-4 py-4">
          <TableSearch
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onClearSearch={clearSearch}
            placeholder="Search contacts"
          />

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <FilterDropdown
              title="Status"
              icon={<CheckCircle2 className="h-3 w-3" />}
              options={filterOptions.status}
              selectedValues={filters.status}
              onSelectionChange={(values) =>
                handleFilterChange("status", values)
              }
            />

            <FilterDropdown
              title="Assigned To"
              icon={<Users className="h-3 w-3" />}
              options={filterOptions.assignedTo}
              selectedValues={filters.assignedTo}
              onSelectionChange={(values) =>
                handleFilterChange("assignedTo", values)
              }
            />

            <FilterDropdown
              title="Role"
              icon={<Users className="h-3 w-3" />}
              options={filterOptions.role}
              selectedValues={filters.role}
              onSelectionChange={(values) => handleFilterChange("role", values)}
            />

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="h-8 px-2 text-xs"
              >
                <X className="mr-1 h-3 w-3" />
                Clear all
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-1 h-4 px-1 text-xs">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            )}
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
          entityType="contacts"
        />
      </Card>
    </DataGrid>
  );
}
