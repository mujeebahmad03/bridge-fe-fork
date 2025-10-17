"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface JsonStringValueProps {
  value: string;
}

export function JsonStringValue({ value }: JsonStringValueProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const truncateAt = 20;
  const shouldTruncate = value.length > truncateAt;
  const displayValue = isExpanded
    ? value
    : shouldTruncate
      ? `${value.substring(0, truncateAt)}...`
      : value;

  return (
    <span
      className={cn(
        "whitespace-pre-wrap break-words text-amber-600 dark:text-amber-500",
        shouldTruncate && "cursor-pointer",
      )}
      onClick={() => {
        if (shouldTruncate) {
          setIsExpanded(!isExpanded);
        }
      }}
    >
      &quot;{displayValue}&quot;
    </span>
  );
}
