import { LucideIcon } from "lucide-react";

export interface Campaign {
  id: string;
  status:
    | "draft"
    | "in_progress"
    | "completed"
    | "paused"
    | "in_error"
    | "archived";
  name: string;
  leadsCompleted: number;
  leadsTotal: number;
  sender: string | null;
  tags: string[];
  createdAt: string;
  creator: string;
}

export interface FilterParams {
  search?: string;
  status?: string[];
  senders?: string[];
  tags?: string[];
  creators?: string[];
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export type ImportSource = "csv" | "campaign" | "crm";
export type ImportStep = "source" | "upload" | "mapping" | "preview";

export interface CSVColumn {
  header: string;
  index: number;
}

export interface MappingField {
  fieldName: string;
  csvColumn: string | null;
}

export interface Lead {
  id: number | string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  company?: string;
  phone?: string;
  jobTitle?: string;
  linkedIn?: string;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface StepItem {
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  label: string;
  sub: string;
  linkedin?: boolean;
  beta?: boolean;
}

export interface Step {
  automatic: StepItem[];
  manual: StepItem[];
  other: StepItem[];
  ai: StepItem[];
}

export interface CampaignStep {
  id: string;
  label: string;
}

export interface CampaignStepIndicatorProps {
  steps: CampaignStep[];
  currentStep: string;
}

export interface Schedule {
  id: number;
  name: string;
  days: string[];
  startTime: string;
  endTime: string;
  interval: number;
  timezone: string;
  isDefault?: boolean;
}

export interface Status {
  id: string;
  title: string;
  color: string;
}

export type Priority = "none" | "low" | "medium" | "high";
