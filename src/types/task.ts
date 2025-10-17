import { DateRange } from "react-day-picker";

export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "inProgress",
  DONE = "done",
}

export interface Assignee {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  initials: string;
}

export type TaskTab = "call" | "email" | "linkedin" | "completed";

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

export enum TaskAssociatedWith {
  CONTACT = "contact",
  COMPANY = "company",
}

export enum TaskLabel {
  URGENT = "urgent",
  BLOCKED = "blocked",
  IN_REVIEW = "in_review",
  BUG = "bug",
  FEATURE = "feature",
  DOCUMENTATION = "documentation",
  MEETING = "meeting",
}

export interface TaskAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  createdAt: Date;
}

export interface TaskComment {
  id: string;
  content: string;
  createdAt: Date;
  author: string;
}

export interface ChecklistItem {
  id: string;
  content: string;
  isCompleted: boolean;
}

export interface TaskChecklist {
  id: string;
  title: string;
  items: ChecklistItem[];
}

export interface TaskActivity {
  id: string;
  type:
    | "created"
    | "updated"
    | "commented"
    | "attachment_added"
    | "checklist_updated";
  content: string;
  createdAt: Date;
  author: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  associatedWith: TaskAssociatedWith;
  contact?: string;
  company?: string;
  campaign: string;
  assignedTo: string | Assignee;
  dueDate: Date;
  dueTime: string;
  status: TaskStatus;
  taskType: TaskType;
  isOverdue: boolean;
  hasReplies: boolean;
}

export interface ColumnType {
  id: string;
  title: string;
  tasks: Task[];
  wip?: number;
  isCollapsed?: boolean;
  color?: string;
}

export interface TaskBoardState {
  columns: ColumnType[];
  activeTask: Task | null;
  showTaskList: boolean;
  selectedTasks: string[];
  setColumns: (columns: ColumnType[]) => void;
  setActiveTask: (task: Task | null) => void;
  setShowTaskList: (show: boolean) => void;
  toggleTaskSelection: (taskId: string) => void;
  selectAllInColumn: (columnId: string, taskIds: string[]) => void;
  assignSelectedTasks: (userId: string) => void;
  moveSelectedTasks: (targetColumnId: string) => void;
}

export interface Campaign {
  id: string;
  name: string;
}

export interface TaskFiltersType {
  priority: TaskPriority | "all";
  associatedWith: TaskAssociatedWith | "all";
  dateRange: DateRange | undefined;
  searchQuery: string;
  singleDate: Date | undefined;
  assignedToFilter: string;
  campaignFilter: string | "all";
  showAssignedOnly: boolean;
}
