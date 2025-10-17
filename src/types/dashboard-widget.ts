export const WidgetValueType = {
  email: "email",
  linkedIn: "linkedin",
  calls: "calls",
  combined: "combined",
} as const;

export type WidgetType = (typeof WidgetValueType)[keyof typeof WidgetValueType];

export type Breakpoint = "xs" | "sm" | "md" | "lg";

export interface LayoutConfig {
  id: string;
  name: string;
  layouts: { [K in Breakpoint]: Layout[] }; // Note: now using 'layouts' keyed by breakpoint
}

export type Layout = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
};

export type WidgetData = {
  id: string;
  type: WidgetType;
  title: string;
  metrics: Metric[];
};

export type Metric = {
  label: string;
  value: number;
  change?: number;
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
