"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  Target,
  Building2,
  Users,
  Mail,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

import { DataTable } from "./data-table";
import { TableSkeleton } from "./table-skeleton";
import { createSelectColumn, createActionsColumn } from "./table/table-columns";
import { LeadExpandedRow } from "./table/expanded-rows";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Lead } from "../types";
import { useEntityTable } from "../hooks";
import { dashboardRoutes } from "@/config/routes";

const createLeadsColumns = (): ColumnDef<Lead>[] => [
  createSelectColumn<Lead>(),
  {
    accessorKey: "campaignName",
    header: () => (
      <div className="flex items-center gap-2">
        <Target className="h-4 w-4" />
        <span className="hidden sm:inline">Campaign Name</span>
        <span className="sm:hidden">Campaign</span>
      </div>
    ),
    cell: ({ row, ...context }) => {
      const lead = row.original;
      const extendedContext = context;
      const toggleRow = extendedContext.cell.row.toggleExpanded;
      const isExpanded = extendedContext.cell.row.getIsExpanded();

      return (
        <div className="min-w-0 space-y-2">
          <button
            onClick={() => toggleRow()}
            className="group flex w-full items-center gap-2 text-left transition-colors hover:text-primary"
          >
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <div
                className={`transition-transform duration-200 ${
                  isExpanded ? "rotate-90" : ""
                }`}
              >
                {isExpanded ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
              </div>
              <div className="truncate font-medium">{lead.campaignName}</div>
            </div>
          </button>
          {isExpanded && <LeadExpandedRow item={lead} />}
        </div>
      );
    },
  },
  {
    accessorKey: "organization",
    header: () => (
      <div className="flex items-center gap-2">
        <Building2 className="h-4 w-4" />
        <span className="hidden sm:inline">Organization</span>
        <span className="sm:hidden">Org</span>
      </div>
    ),
    cell: ({ row }) => {
      const organization = row.getValue("organization") as string;
      return (
        <div className="flex min-w-0 items-center gap-2">
          <Avatar className="h-6 w-6 flex-shrink-0">
            <AvatarImage
              src={`/placeholder.svg?height=24&width=24&text=${organization.charAt(
                0,
              )}`}
            />
            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-xs text-primary">
              {organization.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="truncate text-sm">
            <Link href={`${dashboardRoutes.crm}/details`}>{organization}</Link>
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "contactsCount",
    header: () => (
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4" />
        Contacts
      </div>
    ),
    cell: ({ row, ...context }) => {
      const count = row.getValue("contactsCount") as number;
      const extendedContext = context;
      const toggleRow = extendedContext.cell.row.toggleExpanded;
      const isExpanded = extendedContext.cell.row.getIsExpanded();

      return (
        <button
          onClick={() => toggleRow()}
          className="group flex items-center gap-1 font-medium text-primary transition-colors hover:text-primary/80"
        >
          <span>
            {count} Contact{count !== 1 ? "s" : ""}
          </span>
          <div
            className={`transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          >
            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </button>
      );
    },
  },
  {
    accessorKey: "assignedTo",
    header: () => (
      <div className="flex items-center gap-2">
        <Mail className="h-4 w-4" />
        Assigned To
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-sm">{row.getValue("assignedTo")}</div>
    ),
  },
  createActionsColumn<Lead>(["Edit Lead", "View Details", "Delete"]),
];

interface LeadsTableProps {
  searchQuery: string;
  filterValue: string;
}

export function LeadsTable({ searchQuery, filterValue }: LeadsTableProps) {
  const { data, isLoading, error } = useEntityTable<"leads">({
    entityType: "leads",
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
          Error loading leads. Please try again.
        </p>
      </div>
    );
  }

  return (
    <DataTable
      columns={createLeadsColumns()}
      data={data || []}
      expandedComponent={({ row }) => <LeadExpandedRow item={row.original} />}
      entityType="leads"
    />
  );
}
