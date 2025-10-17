export interface Task {
  id: number;
  type: "call" | "email" | "linkedin";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  dueTime: string;
  campaign: string;
}

export interface Suggestion {
  id: number;
  type: "call" | "email" | "linkedin";
  title: string;
  preview: string;
  recipient: string;
  campaign: string;
}

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
