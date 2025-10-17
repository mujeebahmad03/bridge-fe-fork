"use client";

import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: "syncing" | "failed" | "connected" | string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  switch (status) {
    case "syncing":
      return (
        <Badge
          variant="secondary"
          className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
        >
          Syncing
        </Badge>
      );
    case "failed":
      return (
        <Badge
          variant="destructive"
          className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
        >
          Failed
        </Badge>
      );
    case "connected":
      return (
        <Badge
          variant="secondary"
          className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
        >
          Connected
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}
