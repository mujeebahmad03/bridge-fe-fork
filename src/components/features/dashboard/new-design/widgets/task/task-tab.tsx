import { cn } from "@/lib/utils";
import { TaskTab } from "@/types/task";

interface TaskTabsProps {
  activeTab: TaskTab;
  setActiveTab: (tab: TaskTab) => void;
  callTasksCount: number;
  emailTasksCount: number;
  linkedinTasksCount: number;
  completedTasksCount: number;
}

export const TaskTabs = ({
  activeTab,
  setActiveTab,
  callTasksCount,
  emailTasksCount,
  linkedinTasksCount,
  completedTasksCount,
}: TaskTabsProps) => {
  return (
    <div className="flex space-x-6 overflow-x-auto">
      <button
        className={cn(
          "py-2 text-sm font-medium",
          activeTab === "call"
            ? "border-b-2 border-icon-calls text-icon-calls"
            : "text-gray-500 dark:text-gray-400",
        )}
        onClick={() => setActiveTab("call")}
      >
        Call Tasks{" "}
        <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-800">
          {callTasksCount}
        </span>
      </button>
      <button
        className={cn(
          "py-2 text-sm font-medium",
          activeTab === "email"
            ? "border-b-2 border-icon-email text-icon-email"
            : "text-gray-500 dark:text-gray-400",
        )}
        onClick={() => setActiveTab("email")}
      >
        Email Tasks{" "}
        <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-800">
          {emailTasksCount}
        </span>
      </button>
      <button
        className={cn(
          "py-2 text-sm font-medium",
          activeTab === "linkedin"
            ? "border-b-2 border-icon-linkedin text-icon-linkedin"
            : "text-gray-500 dark:text-gray-400",
        )}
        onClick={() => setActiveTab("linkedin")}
      >
        LinkedIn Tasks{" "}
        <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-800">
          {linkedinTasksCount}
        </span>
      </button>
      <button
        className={cn(
          "py-2 text-sm font-medium",
          activeTab === "completed"
            ? "border-b-2 border-gray-600 text-gray-600 dark:border-gray-400 dark:text-gray-300"
            : "text-gray-500 dark:text-gray-400",
        )}
        onClick={() => setActiveTab("completed")}
      >
        Completed{" "}
        <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-800">
          {completedTasksCount}
        </span>
      </button>
    </div>
  );
};
