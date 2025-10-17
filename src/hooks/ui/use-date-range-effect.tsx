import { useEffect } from "react";
import { DateRange, DateRangePresetType } from "@/types/widget";

export const useDateRangeEffect = (
  dateRangePreset: DateRangePresetType,
  dateRange: DateRange | null,
  setDateRange: (dateRange: DateRange) => void,
) => {
  // Set default date range based on preset
  useEffect(() => {
    const today = new Date();
    let start = new Date();
    let end = new Date();

    switch (dateRangePreset) {
      case "daily":
        // Today
        start = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
        );
        end = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          23,
          59,
          59,
        );
        break;
      case "weekly":
        // Last 7 days
        start = new Date(today);
        start.setDate(today.getDate() - 6);
        end = new Date(today);
        break;
      case "monthly":
        // Last 30 days
        start = new Date(today);
        start.setDate(today.getDate() - 29);
        end = new Date(today);
        break;
      case "quarterly":
        // Last 90 days
        start = new Date(today);
        start.setDate(today.getDate() - 89);
        end = new Date(today);
        break;
      case "custom":
        // Keep existing custom range or set to last 30 days if none
        if (!dateRange) {
          start = new Date(today);
          start.setDate(today.getDate() - 29);
          end = new Date(today);
          setDateRange({ start, end });
        } else {
          return; // Don't update if custom and already has a range
        }
        break;
    }

    if (dateRangePreset !== "custom" || !dateRange) {
      setDateRange({ start, end });
    }
  }, [dateRangePreset, dateRange, setDateRange]);
};
