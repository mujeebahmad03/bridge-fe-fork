export const WidgetValueType = {
  email: "email",
  linkedIn: "linkedin",
  calls: "calls",
  campaign: "campaign",
  task: "task",
} as const;

export type WidgetType = (typeof WidgetValueType)[keyof typeof WidgetValueType];

export interface WidgetItem {
  id: string;
  type: WidgetType;
}

export interface SavedLayout {
  name: string;
  widgets: WidgetItem[];
}

export type Metric = {
  label: string;
  value: number;
  change?: number;
};

export type WidgetData = {
  id: string;
  type: WidgetType;
  title: string;
  metrics: Metric[];
};

export type DateRange = {
  start: Date;
  end: Date;
};

export const DateRangePreset = {
  daily: "daily",
  weekly: "weekly",
  monthly: "monthly",
  quarterly: "quarterly",
  custom: "custom",
} as const;

export type DateRangePresetType =
  (typeof DateRangePreset)[keyof typeof DateRangePreset];

export type Campaign = {
  id: string;
  name: string;
};

export interface AnalyticsFilters {
  dateRangePreset: DateRangePresetType;
  dateRange: DateRange | null;
  campaignId: string | null;
}
