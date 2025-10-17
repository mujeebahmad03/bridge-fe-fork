"use client";

import type React from "react";
import type { Row } from "@tanstack/react-table";
import { ChevronDown, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { EntityRowData } from "@/crm/dashboard/types";

interface MobileTableViewProps<TData extends EntityRowData> {
  rows: Row<TData>[];
  onToggleRow: (rowId: string) => void;
  isExpanded: (rowId: string) => boolean;
  expandedComponent?: (props: { row: Row<TData> }) => React.ReactNode;
  entityType: "contacts" | "companies" | "leads";
}

export function MobileTableView<TData extends EntityRowData>({
  rows,
  onToggleRow,
  isExpanded,
  expandedComponent,
  entityType,
}: MobileTableViewProps<TData>) {
  const getSecondaryInfo = (rowData: TData) => {
    switch (entityType) {
      case "contacts":
        return (
          <>
            {"organization" in rowData && rowData.organization && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="font-medium">Org:</span>
                <span className="truncate">{rowData.organization}</span>
              </div>
            )}
            {"role" in rowData && rowData.role && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="font-medium">Role:</span>
                <span className="truncate">{rowData.role}</span>
              </div>
            )}
          </>
        );
      case "companies":
        return (
          <>
            {"companyOwner" in rowData && rowData.companyOwner && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="font-medium">Owner:</span>
                <span className="truncate">{rowData.companyOwner}</span>
              </div>
            )}
            {"industry" in rowData && rowData.industry && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="font-medium">Industry:</span>
                <span className="truncate">{rowData.industry}</span>
              </div>
            )}
          </>
        );
      case "leads":
        return (
          <>
            {"organization" in rowData && rowData.organization && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="font-medium">Org:</span>
                <span className="truncate">{rowData.organization}</span>
              </div>
            )}
            {"contactsCount" in rowData &&
              rowData.contactsCount !== undefined && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-medium">Contacts:</span>
                  <span className="font-medium text-primary">
                    {rowData.contactsCount}
                  </span>
                </div>
              )}
          </>
        );
    }
  };

  return (
    <div className="space-y-4 p-4">
      {rows.map((row) => {
        const rowData = row.original;
        const expanded = isExpanded(row.id);

        return (
          <Card
            key={row.id}
            className="bg-gradient-to-br from-background to-muted/10 p-4"
          >
            <div className="flex items-start gap-3">
              <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
              />
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    {/* Primary content with expand button */}
                    <div className="mb-2 flex items-center gap-2">
                      <span className="truncate font-medium">
                        {"name" in rowData
                          ? rowData.name
                          : "campaignName" in rowData
                            ? rowData.campaignName
                            : ""}
                      </span>
                    </div>

                    {/* Secondary information */}
                    <div className="space-y-1 text-sm">
                      {getSecondaryInfo(rowData)}
                      {"assignedTo" in rowData && rowData.assignedTo && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span className="font-medium">Assigned:</span>
                          <span className="truncate">{rowData.assignedTo}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleRow(row.id)}
                    className="shrink-0"
                  >
                    {expanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {expanded && expandedComponent && (
                  <div className="-mx-4 mt-3 rounded-b-lg border-t bg-gradient-to-r from-muted/20 to-muted/10 px-4 py-3 pt-3">
                    {expandedComponent({ row })}
                  </div>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
