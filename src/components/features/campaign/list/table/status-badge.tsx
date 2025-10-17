import { cn } from "@/lib/utils";
import { Campaign } from "@/types/campaign";
import {
  CheckIcon,
  XIcon,
  Pencil,
  Loader,
  PauseIcon,
  Archive,
} from "lucide-react";

interface StatusBadgeProps {
  status: Campaign["status"];
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "draft":
        return {
          label: "Draft",
          icon: Pencil,
          className:
            "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
        };
      case "in_progress":
        return {
          label: "In progress",
          icon: Loader,
          className:
            "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
        };
      case "completed":
        return {
          label: "Completed",
          icon: CheckIcon,
          className:
            "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
        };
      case "paused":
        return {
          label: "Paused",
          icon: PauseIcon,
          className:
            "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
        };
      case "in_error":
        return {
          label: "In error",
          icon: XIcon,
          className:
            "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
        };
      case "archived":
        return {
          label: "Archived",
          icon: Archive,
          className:
            "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
        };
      default:
        return {
          label: "Unknown",
          icon: XIcon,
          className: "bg-gray-100 text-gray-700",
        };
    }
  };

  const { label, icon: Icon, className } = getStatusConfig();

  return (
    <div
      className={cn(
        "flex w-fit animate-fade-in items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium",
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{label}</span>
    </div>
  );
}
