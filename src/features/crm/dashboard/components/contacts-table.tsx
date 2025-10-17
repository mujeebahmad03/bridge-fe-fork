"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  Building2,
  Users,
  ExternalLink,
  Mail,
  Phone,
  Linkedin,
} from "lucide-react";
import Link from "next/link";

import { DataTable } from "./data-table";
import { TableSkeleton } from "./table-skeleton";
import {
  createSelectColumn,
  createActionsColumn,
  createExpandableNameColumn,
} from "./table/table-columns";
import { ContactExpandedRow } from "./table/expanded-rows";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useEntityTable } from "@/crm/dashboard/hooks";
import type { Contact } from "@/crm/dashboard/types";
import { dashboardRoutes } from "@/config/routes";

const createContactsColumns = (): ColumnDef<Contact>[] => [
  createSelectColumn<Contact>(),
  createExpandableNameColumn<Contact>({
    accessorKey: "name",
    headerIcon: Avatar,
    headerText: "Name",
    getDisplayName: (contact) => contact.name,
    getAvatarFallback: (contact) =>
      contact.name
        .split(" ")
        .map((n) => n[0])
        .join(""),
    expandedComponent: ContactExpandedRow,
  }),
  {
    accessorKey: "organization",
    header: () => (
      <div className="flex items-center gap-2">
        <Building2 className="h-4 w-4" />
        Organization
      </div>
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        <Link href={`${dashboardRoutes.crm}/details`}>
          {row.getValue("organization")}
        </Link>
      </span>
    ),
  },
  {
    accessorKey: "role",
    header: () => (
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4" />
        Company Role
      </div>
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("role")}</span>
    ),
  },
  {
    accessorKey: "links",
    header: () => (
      <div className="flex items-center gap-2">
        <ExternalLink className="h-4 w-4" />
        Links
      </div>
    ),
    cell: ({ row }) => {
      const contact = row.original;
      return (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5"
            onClick={() => window.open(`mailto:${contact.email}`, "_blank")}
          >
            <Mail className="h-3 w-3 text-muted-foreground transition-colors hover:text-primary" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5"
            onClick={() =>
              window.open(
                `https://linkedin.com/in/${contact.linkedin}`,
                "_blank",
              )
            }
          >
            <Linkedin className="h-3 w-3 text-muted-foreground transition-colors hover:text-primary" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5"
            onClick={() => window.open(`tel:${contact.phone}`, "_blank")}
          >
            <Phone className="h-3 w-3 text-muted-foreground transition-colors hover:text-primary" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "assignedTo",
    header: () => (
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4" />
        Assigned To
      </div>
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.getValue("assignedTo")}
      </span>
    ),
  },
  createActionsColumn<Contact>(["Edit Contact", "View Details", "Delete"]),
];

interface ContactsTableProps {
  searchQuery: string;
  filterValue: string;
}

export function ContactsTable({
  searchQuery,
  filterValue,
}: ContactsTableProps) {
  const { data, isLoading, error, pagination } = useEntityTable<"contacts">({
    entityType: "contacts",
    searchQuery,
    filterValue,
  });

  if (isLoading) {
    return <TableSkeleton rows={5} columns={6} />;
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-destructive">
          Error loading contacts. Please try again.
        </p>
      </div>
    );
  }

  return (
    <DataTable
      columns={createContactsColumns()}
      data={data || []}
      expandedComponent={({ row }) => (
        <ContactExpandedRow item={row.original} />
      )}
      entityType="contacts"
      pagination={pagination}
    />
  );
}
