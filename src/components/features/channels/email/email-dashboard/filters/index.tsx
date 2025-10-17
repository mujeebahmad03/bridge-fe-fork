"use client";

import { useState } from "react";
import { DateRange } from "react-day-picker";
import { FilterControls } from "./filter-control";
import { FilterHeader } from "./fliter-header";

interface FilterSectionProps {
  isUniboxEnabled: boolean;
  selectedEmail: string;
  setSelectedEmail: (email: string) => void;
}

export function FilterSection({ isUniboxEnabled }: FilterSectionProps) {
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [selectedEmailAccounts, setSelectedEmailAccounts] = useState<string[]>(
    [],
  );
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters =
    selectedCampaigns.length > 0 ||
    selectedEmailAccounts.length > 0 ||
    selectedStatuses.length > 0 ||
    !!dateRange?.from;

  const handleApplyFilters = () => {
    console.log("Applying filters:", {
      campaigns: selectedCampaigns,
      emailAccounts: selectedEmailAccounts,
      statuses: selectedStatuses,
      dateRange,
    });
  };

  const handleClearFilters = () => {
    setSelectedCampaigns([]);
    setSelectedEmailAccounts([]);
    setSelectedStatuses([]);
    setDateRange(undefined);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="space-y-4">
      <FilterHeader
        hasActiveFilters={hasActiveFilters}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
        showFilters={showFilters}
        onToggleFilters={toggleFilters}
      />

      {showFilters && (
        <FilterControls
          selectedCampaigns={selectedCampaigns}
          setSelectedCampaigns={setSelectedCampaigns}
          selectedEmailAccounts={selectedEmailAccounts}
          setSelectedEmailAccounts={setSelectedEmailAccounts}
          selectedStatuses={selectedStatuses}
          setSelectedStatuses={setSelectedStatuses}
          dateRange={dateRange}
          setDateRange={setDateRange}
          isUniboxEnabled={isUniboxEnabled}
        />
      )}
    </div>
  );
}
