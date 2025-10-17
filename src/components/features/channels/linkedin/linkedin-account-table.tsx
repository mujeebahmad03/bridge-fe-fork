"use client";

import { useState } from "react";
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
import {
  MoreHorizontal,
  ExternalLink,
  Unlink,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  Linkedin,
} from "lucide-react";
import type { LinkedInAccount } from "@/types/linkedin";
import { cn } from "@/lib/utils";
import {
  CustomPagination,
  PaginationInfo,
} from "@/components/ui/custom-pagination";

interface LinkedInAccountTableProps {
  accounts: LinkedInAccount[];
  onViewProfile: (accountId: string) => void;
  onUnlinkAccount: (accountId: string) => void;
}

export function LinkedInAccountTable({
  accounts,
  onViewProfile,
  onUnlinkAccount,
}: LinkedInAccountTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(accounts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAccounts = accounts.slice(startIndex, endIndex);

  const getStatusBadge = (status: LinkedInAccount["status"]) => {
    const statusConfig = {
      syncing: {
        label: "Syncing",
        className:
          "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
        icon: Loader2,
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
        icon: Clock,
      },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge className={cn("flex items-center gap-1", config.className)}>
        <Icon
          className={cn("h-3 w-3", status === "syncing" && "animate-spin")}
        />
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
              <TableHead>Profile</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Connections</TableHead>
              <TableHead>Messages Synced</TableHead>
              <TableHead>Chats Synced</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Synced</TableHead>
              <TableHead className="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentAccounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 font-semibold text-white shadow-sm">
                      <Linkedin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">{account.profileName}</div>
                      <div className="max-w-[200px] truncate text-sm text-muted-foreground">
                        {account.profileUrl}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{account.email}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/20 dark:text-blue-400"
                  >
                    {account.connectionCount.toLocaleString()}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {account.messagesSynced}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      messages
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{account.chatsSynced}</span>
                    <span className="text-sm text-muted-foreground">chats</span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(account.status)}</TableCell>
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
                        onClick={() => onViewProfile(account.id)}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Profile
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
