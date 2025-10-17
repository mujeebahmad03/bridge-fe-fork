"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { dashboardRoutes } from "@/config/routes";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Alert, AlertTitle } from "@/components/ui/alert";
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
  ChevronDown,
  Users,
  Target,
  UserCheck,
  Activity,
  X,
  TrendingUp,
  Briefcase,
  User,
  Crown,
} from "lucide-react";
import { toast } from "sonner";
import { TableSearch } from "@/components/new-data-grid/components/table-search";
import { ContactLeads } from "../../types";
import { BulkActionsBar } from "../bulk-actions-bar";

interface FilterState {
  leadStage: string[];
  status: string[];
  assignedTo: string[];
  sequence: string[];
  campaignName: string[];
  role: string[];
}

function ActionsCell({ row }: { row: Row<ContactLeads> }) {
  const { copy } = useCopyToClipboard();
  const handleCopyId = () => {
    copy(row.original.id);
    const message = `Contact Lead ID successfully copied: ${row.original.id}`;
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
        <DropdownMenuItem onClick={() => {}}>View Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}}>Send Message</DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyId}>Copy ID</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="bg-destructive/10 text-destructive"
          onClick={() => {}}
        >
          Remove from Sequence
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

interface ContactLeadsTableProps {
  data: ContactLeads[];
}

export function ContactLeadsTable({ data }: ContactLeadsTableProps) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: false },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    leadStage: [],
    status: [],
    assignedTo: [],
    sequence: [],
    campaignName: [],
    role: [],
  });

  // Generate filter options with counts
  const filterOptions = useMemo(() => {
    const leadStageOptions = Array.from(
      new Set(data.map((c) => c.leadStage)),
    ).map((stage) => ({
      value: stage,
      label: stage,
      count: data.filter((c) => c.leadStage === stage).length,
    }));

    const statusOptions = Array.from(new Set(data.map((c) => c.status))).map(
      (status) => ({
        value: status,
        label: status.charAt(0).toUpperCase() + status.slice(1),
        count: data.filter((c) => c.status === status).length,
      }),
    );

    const assignedToOptions = Array.from(
      new Set(data.map((c) => c.assignedTo)),
    ).map((assignee) => ({
      value: assignee,
      label: assignee,
      count: data.filter((c) => c.assignedTo === assignee).length,
    }));

    const sequenceOptions = Array.from(
      new Set(data.map((c) => c.sequence)),
    ).map((sequence) => ({
      value: sequence,
      label: sequence,
      count: data.filter((c) => c.sequence === sequence).length,
    }));

    const campaignOptions = Array.from(
      new Set(data.map((c) => c.campaignName)),
    ).map((campaign) => ({
      value: campaign,
      label: campaign,
      count: data.filter((c) => c.campaignName === campaign).length,
    }));

    const roleOptions = Array.from(new Set(data.map((c) => c.role))).map(
      (role) => ({
        value: role,
        label: role,
        count: data.filter((c) => c.role === role).length,
      }),
    );

    return {
      leadStage: leadStageOptions,
      status: statusOptions,
      assignedTo: assignedToOptions,
      sequence: sequenceOptions,
      campaignName: campaignOptions,
      role: roleOptions,
    };
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesLeadStage =
        !filters.leadStage.length || filters.leadStage.includes(item.leadStage);
      const matchesStatus =
        !filters.status.length || filters.status.includes(item.status);
      const matchesAssignedTo =
        !filters.assignedTo.length ||
        filters.assignedTo.includes(item.assignedTo);
      const matchesSequence =
        !filters.sequence.length || filters.sequence.includes(item.sequence);
      const matchesCampaign =
        !filters.campaignName.length ||
        filters.campaignName.includes(item.campaignName);
      const matchesRole =
        !filters.role.length || filters.role.includes(item.role);

      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        [
          item.name,
          item.role,
          item.organization,
          item.campaignName,
          item.assignedTo,
          item.sequence,
          item.leadStage,
        ]
          .join(" ")
          .toLowerCase()
          .includes(searchLower);

      return (
        matchesLeadStage &&
        matchesStatus &&
        matchesAssignedTo &&
        matchesSequence &&
        matchesCampaign &&
        matchesRole &&
        matchesSearch
      );
    });
  }, [searchQuery, filters, data]);

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
      leadStage: [],
      status: [],
      assignedTo: [],
      sequence: [],
      campaignName: [],
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

  const getLeadStageBadge = (stage: ContactLeads["leadStage"]) => {
    switch (stage) {
      case "Pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "Qualified":
        return <Badge variant="default">Qualified</Badge>;
      case "Converted":
        return <Badge variant="success">Converted</Badge>;
      case "Lost":
        return <Badge variant="destructive">Lost</Badge>;
      default:
        return <Badge variant="outline">{stage}</Badge>;
    }
  };

  const columns = useMemo<ColumnDef<ContactLeads>[]>(
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
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-px">
                <div className="font-medium text-foreground">
                  {row.original.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {row.original.role}
                </div>
              </div>
            </Link>
          );
        },
        size: 200,
        enableSorting: true,
        enableHiding: false,
        enableResizing: true,
      },
      // {
      //   accessorKey: "organization",
      //   id: "organization",
      //   header: ({ column }) => (
      //     <DataGridColumnHeader
      //       title="Organization"
      //       visibility={true}
      //       column={column}
      //     />
      //   ),
      //   cell: ({ row }) => {
      //     return (
      //       <Link
      //         href={`${dashboardRoutes.crm}/details`}
      //         className="flex items-center gap-2"
      //       >
      //         <Building2 className="h-3 w-3 text-muted-foreground" />
      //         <div className="font-medium text-foreground">
      //           {row.original.organization}
      //         </div>
      //       </Link>
      //     );
      //   },
      //   size: 180,
      //   enableSorting: true,
      //   enableHiding: true,
      //   enableResizing: true,
      // },
      {
        accessorKey: "campaignName",
        id: "campaignName",
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Campaign"
            visibility={true}
            column={column}
          />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2">
              <Target className="h-3 w-3 text-muted-foreground" />
              <div className="text-sm text-foreground">
                {row.original.campaignName}
              </div>
            </div>
          );
        },
        size: 180,
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
      },
      {
        accessorKey: "sequence",
        id: "sequence",
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Sequence"
            visibility={true}
            column={column}
          />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2">
              <Activity className="h-3 w-3 text-muted-foreground" />
              <div className="text-sm text-foreground">
                {row.original.sequence}
              </div>
            </div>
          );
        },
        size: 160,
        enableSorting: true,
        enableHiding: true,
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
            <div className="flex items-center gap-2">
              <UserCheck className="h-3 w-3 text-muted-foreground" />
              <div className="font-medium text-foreground">
                {row.original.assignedTo}
              </div>
            </div>
          );
        },
        size: 120,
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
      },
      {
        accessorKey: "leadStage",
        id: "leadStage",
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Lead Stage"
            visibility={true}
            column={column}
          />
        ),
        cell: ({ row }) => {
          return getLeadStageBadge(row.original.leadStage);
        },
        size: 120,
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
          return status === "active" ? (
            <Badge variant="default">Active</Badge>
          ) : (
            <Badge variant="secondary">Inactive</Badge>
          );
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
    getRowId: (row: ContactLeads) => row.id,
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
            placeholder="Search contact leads..."
          />

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <FilterDropdown
              title="Lead Stage"
              icon={<TrendingUp className="h-3 w-3" />}
              options={filterOptions.leadStage}
              selectedValues={filters.leadStage}
              onSelectionChange={(values) =>
                handleFilterChange("leadStage", values)
              }
            />

            <FilterDropdown
              title="Role"
              icon={<Crown className="h-3 w-3" />}
              options={filterOptions.role}
              selectedValues={filters.role}
              onSelectionChange={(values) => handleFilterChange("role", values)}
            />

            <FilterDropdown
              title="Campaign"
              icon={<Target className="h-3 w-3" />}
              options={filterOptions.campaignName}
              selectedValues={filters.campaignName}
              onSelectionChange={(values) =>
                handleFilterChange("campaignName", values)
              }
            />

            <FilterDropdown
              title="Sequence"
              icon={<Activity className="h-3 w-3" />}
              options={filterOptions.sequence}
              selectedValues={filters.sequence}
              onSelectionChange={(values) =>
                handleFilterChange("sequence", values)
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
              title="Status"
              icon={<Briefcase className="h-3 w-3" />}
              options={filterOptions.status}
              selectedValues={filters.status}
              onSelectionChange={(values) =>
                handleFilterChange("status", values)
              }
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
