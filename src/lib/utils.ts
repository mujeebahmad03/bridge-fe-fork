import { Column, FilterFn } from "@tanstack/react-table";
import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

import { DateRange, DateRangePresetType } from "@/types/widget";
import { JsonArray, JsonObject } from "@/types/leads";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateRange = (
  dateRange: DateRange | null,
  dateRangePreset: DateRangePresetType,
): string => {
  if (!dateRange) return "Select dates";

  // Show preset name for non-custom ranges
  if (dateRangePreset !== "custom") {
    const presetMap = {
      daily: "Today",
      weekly: "Last 7 days",
      monthly: "Last 30 days",
      quarterly: "Last 90 days",
    };
    return presetMap[dateRangePreset];
  }

  return `${format(dateRange.start, "MMM d, yyyy")} - ${format(dateRange.end, "MMM d, yyyy")}`;
};

/**
 * Calculates the CSS styles needed to pin a column to the left or right of its container.
 *
 * @param column the column to calculate the styles for
 * @returns an object with the styles to apply to the column
 */
export const getPinningStyles = <T>(column: Column<T>): CSSProperties => {
  const isPinned = column.getIsPinned();
  return {
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
};

export const dateFilterFn = <T, K extends keyof T>(
  columnId: K,
): FilterFn<T> => {
  return (row, _, value: { from: Date; to: Date }) => {
    const rowDate = row.getValue(columnId as string) as Date;
    const { from, to } = value;

    if (from && to) {
      return rowDate >= from && rowDate <= to;
    }

    return rowDate >= from;
  };
};

export function getItemCount(value: JsonObject | JsonArray): number {
  if (Array.isArray(value)) return value.length;
  return Object.keys(value).length;
}

// Helper function to convert snake_case to Title Case
export function toTitleCase(str: string): string {
  return str
    .split("_")
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

export const FLOW_STORAGE_KEY = "flow-builder-state";
