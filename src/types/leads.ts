import { LeadsTypeEnum } from "@/config/leads";
import { LucideIcon } from "lucide-react";
import { JSX } from "react";

export interface LeadsColumnType {
  id: LeadsTypeEnum;
  name: string;
  icon: JSX.Element;
  description?: string;
}

export interface LeadsColumn {
  id: string;
  name: string;
  sortable?: boolean;
  width?: number;
  hidden?: boolean;
  icon?: LucideIcon;
  type?: LeadsTypeEnum;
}

export enum TemplateType {
  FIND_WORK_EMAIL = "Find Work Email",
  LINKEDIN_TO_EMAIL = "LinkedIn URL to Work Email",
  FULL_NAME_TO_LINKEDIN = "Full Name to LinkedIn Profile",
  EMAIL_TO_LINKEDIN = "Email to LinkedIn Profile",
  FIND_WORK_EMAIL_AND_LINKEDIN = "Find Work Email & LinkedIn URL",
  FIND_LEADS_BY_DOMAIN = "Find Leads using Domain",
  COMPANY_DATA = "Company Data",
  VERIFY_EMAIL = "Verify Email",
  CUSTOM = "Custom",
}

export interface LeadsRow {
  id: string;
  [key: string]: string;
}

export type SortDirection = "asc" | "desc" | null;

export interface Template {
  id: string;
  title: string;
  description: string;
  icon: () => JSX.Element;
}

export interface UploadHistory {
  id: number;
  serialNumber: number;
  dateTime: string;
  title: string;
  outputFile: string;
}

export type FilterOperator =
  | "contains"
  | "does_not_contain"
  | "is"
  | "is_not"
  | "is_empty"
  | "is_not_empty";

export type LogicalOperator = "and" | "or";

export interface Filter {
  id: string;
  columnId: string;
  operator: FilterOperator;
  value: string;
  logicalOperator?: LogicalOperator;
}

export interface Sort {
  id: string;
  columnId: string;
  direction: SortDirection;
}

export type RowHeight = "short" | "medium" | "tall";

export const ROW_HEIGHTS: Record<RowHeight, number> = {
  short: 32,
  medium: 40,
  tall: 48,
};

// Add to existing types
export interface SearchMatch {
  rowId: string;
  columnId: string;
  value: string;
  index: number;
}

export interface SearchState {
  query: string;
  matches: SearchMatch[];
  activeMatchIndex: number;
}

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonObject
  | JsonArray;
export type JsonObject = { [key: string]: JsonValue };
export type JsonArray = JsonValue[];
