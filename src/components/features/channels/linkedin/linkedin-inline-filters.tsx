"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Filter, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MultiSelectCombobox } from "@/components/ui/multi-select-combobox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { LinkedInMessageFilters } from "@/types/linkedin-message";
import {
  mockCampaigns,
  mockEmailStatuses,
} from "@/data/mock-linkedin-messages";
import { mockLinkedInAccounts } from "@/data/mock-linkedin-accounts";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

interface LinkedInInlineFiltersProps {
  filters: LinkedInMessageFilters;
  pendingFilters: LinkedInMessageFilters;
  onFiltersChange: (filters: LinkedInMessageFilters) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  className?: string;
}

export function LinkedInInlineFilters({
  filters,
  pendingFilters,
  onFiltersChange,
  onApplyFilters,
  onClearFilters,
  className,
}: LinkedInInlineFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasActiveFilters =
    filters.campaigns.length > 0 ||
    filters.linkedInAccounts.length > 0 ||
    filters.emailStatus.length > 0 ||
    filters.showProfilesWithEmails ||
    filters.dateRange.from ||
    filters.dateRange.to;

  const hasPendingChanges =
    JSON.stringify(filters) !== JSON.stringify(pendingFilters);

  const activeFilterCount =
    filters.campaigns.length +
    filters.linkedInAccounts.length +
    filters.emailStatus.length +
    (filters.showProfilesWithEmails ? 1 : 0) +
    (filters.dateRange.from || filters.dateRange.to ? 1 : 0);

  const linkedInAccountOptions = mockLinkedInAccounts.map((account) => ({
    id: account.id,
    name: account.email,
  }));

  return (
    <Card
      className={cn(
        "border-0 bg-card/50 shadow-sm backdrop-blur-sm",
        className,
      )}
    >
      {/* Filter Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <Filter className="h-4 w-4" />
              <span className="font-medium">Filters</span>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>

            {hasActiveFilters && (
              <Badge variant="secondary" className="text-xs">
                {activeFilterCount} Active
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            {hasPendingChanges && (
              <Button
                size="sm"
                onClick={onApplyFilters}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Apply Filters
              </Button>
            )}

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="mr-1 h-4 w-4" />
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && !isExpanded && (
          <div className="mt-3 flex flex-wrap gap-2">
            {filters.campaigns.map((campaignId) => {
              const campaign = mockCampaigns.find((c) => c.id === campaignId);
              return campaign ? (
                <Badge key={campaignId} variant="outline" className="text-xs">
                  Campaign: {campaign.name}
                </Badge>
              ) : null;
            })}

            {filters.linkedInAccounts.map((accountId) => {
              const account = mockLinkedInAccounts.find(
                (a) => a.id === accountId,
              );
              return account ? (
                <Badge key={accountId} variant="outline" className="text-xs">
                  Account: {account.email}
                </Badge>
              ) : null;
            })}

            {filters.emailStatus.map((statusId) => {
              const status = mockEmailStatuses.find((s) => s.id === statusId);
              return status ? (
                <Badge key={statusId} variant="outline" className="text-xs">
                  Status: {status.name}
                </Badge>
              ) : null;
            })}

            {filters.showProfilesWithEmails && (
              <Badge variant="outline" className="text-xs">
                Show profiles with emails
              </Badge>
            )}

            {(filters.dateRange.from || filters.dateRange.to) && (
              <Badge variant="outline" className="text-xs">
                <Calendar className="mr-1 h-3 w-3" />
                Date range
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Filter Content */}
      {isExpanded && (
        <div className="space-y-6 p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Campaigns Filter */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Campaigns</Label>
              <MultiSelectCombobox
                options={mockCampaigns}
                selected={pendingFilters.campaigns}
                onSelectionChange={(selected) =>
                  onFiltersChange({ ...pendingFilters, campaigns: selected })
                }
                placeholder="Select campaigns..."
                searchPlaceholder="Search campaigns..."
                emptyText="No campaigns found."
              />
            </div>

            {/* LinkedIn Accounts Filter */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">LinkedIn Accounts</Label>
              <MultiSelectCombobox
                options={linkedInAccountOptions}
                selected={pendingFilters.linkedInAccounts}
                onSelectionChange={(selected) =>
                  onFiltersChange({
                    ...pendingFilters,
                    linkedInAccounts: selected,
                  })
                }
                placeholder="Select accounts..."
                searchPlaceholder="Search accounts..."
                emptyText="No accounts found."
              />
            </div>

            {/* Email Status Filter */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Email Status</Label>
              <MultiSelectCombobox
                options={mockEmailStatuses}
                selected={pendingFilters.emailStatus}
                onSelectionChange={(selected) =>
                  onFiltersChange({ ...pendingFilters, emailStatus: selected })
                }
                placeholder="Select status..."
                searchPlaceholder="Search status..."
                emptyText="No status found."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Email Availability Toggle */}
            <div className="flex items-center space-x-3">
              <Switch
                id="email-availability"
                checked={pendingFilters.showProfilesWithEmails}
                onCheckedChange={(checked) =>
                  onFiltersChange({
                    ...pendingFilters,
                    showProfilesWithEmails: checked,
                  })
                }
              />
              <Label
                htmlFor="email-availability"
                className="text-sm font-medium"
              >
                Show profiles with available emails
              </Label>
            </div>

            {/* Date Range Filter */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Date Range</Label>
              <DatePickerWithRange
                date={{
                  from: pendingFilters.dateRange.from || undefined,
                  to: pendingFilters.dateRange.to || undefined,
                }}
                onSelect={(range) =>
                  onFiltersChange({
                    ...pendingFilters,
                    dateRange: {
                      from: range?.from || null,
                      to: range?.to || null,
                    },
                  })
                }
              />
            </div>
          </div>

          {/* Mobile Apply Button */}
          <div className="flex justify-end gap-2 border-t pt-4 md:hidden">
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={onClearFilters}
                className="bg-transparent text-muted-foreground"
              >
                Clear All
              </Button>
            )}
            <Button
              onClick={onApplyFilters}
              disabled={!hasPendingChanges}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
