"use client";

import { Badge } from "@/components/ui/badge";
import { capitalizeFirst, getPriorityColor } from "@/crmContacts/utils";

interface PriorityBadgeProps {
  priority: "low" | "medium" | "high";
  className?: string;
}

export function PriorityBadge({
  priority,
  className = "",
}: PriorityBadgeProps) {
  return (
    <Badge className={`text-xs ${getPriorityColor(priority)} ${className}`}>
      {capitalizeFirst(priority)}
    </Badge>
  );
}
