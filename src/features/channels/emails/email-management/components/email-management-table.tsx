"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  Activity,
  Unlink,
  CheckCircle,
  XCircle,
  Clock,
  Pause,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { WarmUpSwitch } from "./warm-up-switch";
import { ConfigurationProgress } from "./configuration-progress";
import type { EmailAccount } from "@/types/email-account";
import { cn } from "@/lib/utils";
import {
  CustomPagination,
  PaginationInfo,
} from "@/components/ui/custom-pagination";

interface EmailManagementTableProps {
  accounts: EmailAccount[];
  onCheckDeliverability: (accountId: string) => void;
  onOpenConfiguration: (account: EmailAccount) => void;
  onUnlinkAccount: (accountId: string) => void;
  onToggleWarmUp: (accountId: string, enabled: boolean) => void;
}

export function EmailManagementTable({
  accounts,
  onCheckDeliverability,
  onOpenConfiguration,
  onUnlinkAccount,
  onToggleWarmUp,
}: EmailManagementTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(accounts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAccounts = accounts.slice(startIndex, endIndex);

  const getStatusBadge = (status: EmailAccount["status"]) => {
    const statusConfig = {
      syncing: {
        label: "Syncing",
        className:
          "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
        icon: Clock,
      },
      connected: {
        label: "Connected",
        className:
          "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
        icon: CheckCircle,
      },
      failed: {
        label: "Failed",
        className:
          "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
        icon: XCircle,
      },
      disconnected: {
        label: "Disconnected",
        className:
          "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400",
        icon: Pause,
      },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge className={cn("flex items-center gap-1", config.className)}>
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="space-y-4">
      {/* Pagination Info */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <PaginationInfo
            currentPage={currentPage}
            totalItems={accounts.length}
            itemsPerPage={itemsPerPage}
          />
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Data Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email Address</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Configuration</TableHead>
              <TableHead>Warm Up</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Deliverability Score</TableHead>
              <TableHead>Last Synced</TableHead>
              <TableHead className="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentAccounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell className="font-medium">{account.email}</TableCell>
                <TableCell>
                  <Badge variant="outline">{account.provider}</Badge>
                </TableCell>
                <TableCell className="min-w-[200px]">
                  <ConfigurationProgress
                    account={account}
                    onConfigure={() => onOpenConfiguration(account)}
                  />
                </TableCell>
                <TableCell>
                  <WarmUpSwitch
                    warmUp={account.warmUp}
                    onToggle={(enabled) => onToggleWarmUp(account.id, enabled)}
                  />
                </TableCell>
                <TableCell>{getStatusBadge(account.status)}</TableCell>
                <TableCell>
                  {account.deliverabilityScore ? (
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-green-600">
                        {account.deliverabilityScore}%
                      </span>
                      <span className="text-sm text-muted-foreground">
                        High
                      </span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">No Data</span>
                  )}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDate(account.lastSynced)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onCheckDeliverability(account.id)}
                      >
                        <Activity className="mr-2 h-4 w-4" />
                        Check Deliverability
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onUnlinkAccount(account.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Unlink className="mr-2 h-4 w-4" />
                        Unlink
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Bottom CustomPagination */}
      {totalPages > 1 && (
        <div className="flex justify-center pt-4">
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
