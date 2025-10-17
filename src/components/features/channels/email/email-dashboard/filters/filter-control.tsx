import { DateRange } from "react-day-picker";

import { Label } from "@/components/ui/label";
import { MultiSelectCombobox } from "@/components/ui/multi-select-combobox";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

interface FilterControlsProps {
  selectedCampaigns: string[];
  setSelectedCampaigns: (campaigns: string[]) => void;
  selectedEmailAccounts: string[];
  setSelectedEmailAccounts: (accounts: string[]) => void;
  selectedStatuses: string[];
  setSelectedStatuses: (statuses: string[]) => void;
  dateRange: DateRange | undefined;
  setDateRange: (dateRange: DateRange | undefined) => void;
  isUniboxEnabled: boolean;
}

const campaigns = [
  { id: "campaign-1", name: "Product Launch Q1" },
  { id: "campaign-2", name: "Summer Sale 2024" },
  { id: "campaign-3", name: "Newsletter Weekly" },
  { id: "campaign-4", name: "Black Friday Promo" },
  { id: "campaign-5", name: "Customer Onboarding" },
];

const emailAccounts = [
  { id: "john@company.com", name: "john@company.com" },
  { id: "sarah@company.com", name: "sarah@company.com" },
  { id: "mike@company.com", name: "mike@company.com" },
  { id: "team@company.com", name: "team@company.com" },
  { id: "support@company.com", name: "support@company.com" },
];

const emailStatuses = [
  { id: "delivered", name: "Delivered" },
  { id: "opened", name: "Opened" },
  { id: "clicked", name: "Clicked" },
  { id: "bounced", name: "Bounced" },
  { id: "spam", name: "Spam" },
  { id: "unsubscribed", name: "Unsubscribed" },
];

export function FilterControls({
  selectedCampaigns,
  setSelectedCampaigns,
  selectedEmailAccounts,
  setSelectedEmailAccounts,
  selectedStatuses,
  setSelectedStatuses,
  dateRange,
  setDateRange,
  isUniboxEnabled,
}: FilterControlsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Campaigns Filter */}
      <div className="space-y-2">
        <Label className="text-xs font-medium text-muted-foreground">
          Campaigns
        </Label>
        <MultiSelectCombobox
          options={campaigns}
          selected={selectedCampaigns}
          onSelectionChange={setSelectedCampaigns}
          placeholder="Select campaigns"
          searchPlaceholder="Search campaigns..."
        />
      </div>

      {/* Email Accounts Filter - Only show if Unibox is disabled */}
      {!isUniboxEnabled && (
        <div className="space-y-2">
          <Label className="text-xs font-medium text-muted-foreground">
            Email Accounts
          </Label>
          <MultiSelectCombobox
            options={emailAccounts}
            selected={selectedEmailAccounts}
            onSelectionChange={setSelectedEmailAccounts}
            placeholder="Select accounts"
            searchPlaceholder="Search accounts..."
          />
        </div>
      )}

      {/* Email Status Filter */}
      <div className="space-y-2">
        <Label className="text-xs font-medium text-muted-foreground">
          Email Status
        </Label>
        <MultiSelectCombobox
          options={emailStatuses}
          selected={selectedStatuses}
          onSelectionChange={setSelectedStatuses}
          placeholder="Select status"
          searchPlaceholder="Search status..."
        />
      </div>

      {/* Date Range Filter */}
      <div className="space-y-2">
        <Label className="text-xs font-medium text-muted-foreground">
          Date Range
        </Label>
        <DatePickerWithRange date={dateRange} onSelect={setDateRange} />
      </div>
    </div>
  );
}
