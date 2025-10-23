import { Company, Contact } from "@/crm/dashboard/types";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
  type?: "text" | "lead_added" | "message_drafted" | "task_summary";
  data?: unknown;
}

export interface QuickStat {
  label: string;
  value: number;
  icon: string;
  type: "calls" | "emails" | "leads";
}

export interface Lead {
  id: number;
  name: string;
  email: string;
  company: string;
  campaign: string;
  status: "new" | "contacted" | "responded" | "closed";
  addedDate: Date;
}

export interface Campaign {
  id: number;
  name: string;
  description: string;
  leads: number;
  active: boolean;
}

export interface MessageTemplate {
  id: number;
  type: "email" | "linkedin";
  subject?: string;
  content: string;
  campaign: string;
  lead: string;
}

export enum TaskType {
  CALL = "call",
  EMAIL = "email",
  LINKEDIN = "linkedIn",
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export interface Assignee {
  id: string;
  name: string;
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  contact?: string;
  contactData?: Contact;
  company?: string;
  companyData?: Company;
  campaign: string;
  assignedTo: string | Assignee;
  dueDate: Date;
  dueTime: string;
  status: TaskStatus;
  taskType: TaskType;
  isOverdue: boolean;
  hasReplies: boolean;
}
