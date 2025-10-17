"use client";

import type React from "react";

import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dashboardRoutes } from "@/config/routes";

export function createSelectColumn<T>(): ColumnDef<T> {
  return {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };
}

export function createActionsColumn<T>(actions?: string[]): ColumnDef<T> {
  const defaultActions = ["Edit", "View Details", "Delete"];
  const menuActions = actions || defaultActions;

  return {
    id: "actions",
    header: () => <MoreHorizontal className="h-4 w-4" />,
    cell: ({}) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {menuActions.map((action, index) => (
            <DropdownMenuItem
              key={action}
              className={
                index === menuActions.length - 1 ? "text-destructive" : ""
              }
            >
              {action}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  };
}

interface ExpandableNameColumnConfig<T> {
  accessorKey: string;
  headerIcon: React.ComponentType<{ className?: string }>;
  headerText: string;
  getDisplayName: (item: T) => string;
  getAvatarSrc?: (item: T) => string;
  getAvatarFallback: (item: T) => string;
  expandedComponent?: React.ComponentType<{ item: T }>;
}

export function createExpandableNameColumn<T>(
  config: ExpandableNameColumnConfig<T>,
): ColumnDef<T> {
  return {
    accessorKey: config.accessorKey,
    header: () => (
      <div className="flex items-center gap-2">
        <config.headerIcon className="h-4 w-4" />
        {config.headerText}
      </div>
    ),
    cell: ({ row, ...context }) => {
      const item = row.original;
      const extendedContext = context;
      const toggleRow = extendedContext.cell.row.toggleExpanded;
      const isExpanded = extendedContext.cell.row.getIsExpanded();

      return (
        <div className="min-w-0 space-y-2">
          <div className="flex items-center gap-3">
            {toggleRow && (
              <button
                onClick={() => toggleRow}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            )}
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage
                src={config.getAvatarSrc?.(item) || "/placeholder.svg"}
                alt={config.getDisplayName(item)}
              />
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 font-medium text-primary">
                {config.getAvatarFallback(item)}
              </AvatarFallback>
            </Avatar>
            <span className="truncate font-medium text-foreground">
              <Link href={`${dashboardRoutes.crm}/details`}>
                {config.getDisplayName(item)}
              </Link>
            </span>
          </div>
          {isExpanded && config.expandedComponent && (
            <config.expandedComponent item={item} />
          )}
        </div>
      );
    },
  };
}
