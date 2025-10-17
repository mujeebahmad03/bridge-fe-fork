"use client";

import { Building2, Users, Mail } from "lucide-react";

import { DataTable } from "./data-table";
import { TableSkeleton } from "./table-skeleton";
import {
  createSelectColumn,
  createActionsColumn,
  createExpandableNameColumn,
} from "./table/table-columns";
import { CompanyExpandedRow } from "./table/expanded-rows";
import { useEntityTable } from "@/crm/dashboard/hooks";
import type { ColumnDef } from "@tanstack/react-table";
import type { Company } from "@/crm/dashboard/types";

const createCompaniesColumns = (): ColumnDef<Company>[] => [
  createSelectColumn<Company>(),
  createExpandableNameColumn<Company>({
    accessorKey: "name",
    headerIcon: Building2,
    headerText: "Name",
    getDisplayName: (company) => company.name,
    getAvatarFallback: (company) => company.name.charAt(0),
    expandedComponent: CompanyExpandedRow,
  }),
  {
    accessorKey: "companyOwner",
    header: () => (
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4" />
        <span className="hidden sm:inline">Company Owner</span>
        <span className="sm:hidden">Owner</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="truncate text-sm">{row.getValue("companyOwner")}</div>
    ),
  },
  {
    accessorKey: "industry",
    header: () => (
      <div className="flex items-center gap-2">
        <Building2 className="h-4 w-4" />
        Industry
      </div>
    ),
    cell: ({ row }) => (
      <div className="truncate text-sm">{row.getValue("industry")}</div>
    ),
  },
  {
    accessorKey: "assignedTo",
    header: () => (
      <div className="flex items-center gap-2">
        <Mail className="h-4 w-4" />
        <span className="hidden sm:inline">Assigned To</span>
        <span className="sm:hidden">Assigned</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="truncate text-sm">{row.getValue("assignedTo")}</div>
    ),
  },
  createActionsColumn<Company>(["Edit Company", "View Details", "Delete"]),
];

interface CompaniesTableProps {
  searchQuery: string;
  filterValue: string;
}

export function CompaniesTable({
  searchQuery,
  filterValue,
}: CompaniesTableProps) {
  const { data, isLoading, error } = useEntityTable<"companies">({
    entityType: "companies",
    searchQuery,
    filterValue,
  });

  if (isLoading) {
    return <TableSkeleton rows={5} columns={5} />;
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-destructive">
          Error loading companies. Please try again.
        </p>
      </div>
    );
  }

  return (
    <DataTable
      columns={createCompaniesColumns()}
      data={data || []}
      expandedComponent={({ row }) => (
        <CompanyExpandedRow item={row.original} />
      )}
      entityType="companies"
    />
  );
}
