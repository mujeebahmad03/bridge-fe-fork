"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusBadge } from "./status-badge";
import { Account } from "../types";

interface AccountsTableProps {
  accounts: Account[];
  onEdit?: (account: Account) => void;
  onSync?: (account: Account) => void;
  onDelete?: (account: Account) => void;
}

export function AccountsTable({
  accounts,
  onEdit,
  onSync,
  onDelete,
}: AccountsTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-border">
            <TableHead className="font-medium text-muted-foreground">
              LinkedIn Accounts
            </TableHead>
            <TableHead className="font-medium text-muted-foreground">
              Status
            </TableHead>
            <TableHead className="font-medium text-muted-foreground">
              Last Synced
            </TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account) => (
            <TableRow
              key={account.id}
              className="border-border hover:bg-muted/50"
            >
              <TableCell className="font-medium text-foreground">
                {account.username}
              </TableCell>
              <TableCell>
                <StatusBadge status={account.status} />
              </TableCell>
              <TableCell className="text-muted-foreground">
                {account.lastSynced}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit?.(account)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onSync?.(account)}>
                      Sync Now
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => onDelete?.(account)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
