import { Button } from "@/components/ui/button";
import { TaskTab } from "@/types/task";
import { TaskTabs } from "./task-tab";
import { FiltersSheet } from "@/components/features/tasks/filters";
import { TaskDialog } from "@/components/features/tasks/dialog";
import { useState } from "react";

interface TaskToolbarProps {
  activeTab: TaskTab;
  setActiveTab: (tab: TaskTab) => void;
  callTasksCount: number;
  emailTasksCount: number;
  linkedinTasksCount: number;
  completedTasksCount: number;
}

export const TaskToolbar = ({
  activeTab,
  setActiveTab,
  callTasksCount,
  emailTasksCount,
  linkedinTasksCount,
  completedTasksCount,
}: TaskToolbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <TaskTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          callTasksCount={callTasksCount}
          emailTasksCount={emailTasksCount}
          linkedinTasksCount={linkedinTasksCount}
          completedTasksCount={completedTasksCount}
        />
        <div className="flex gap-2">
          <FiltersSheet />
          <Button
            size="sm"
            className="h-8 text-xs"
            onClick={() => setIsOpen(true)}
          >
            Add new task
          </Button>
        </div>
      </div>

      <TaskDialog isOpen={isOpen} setIsOpen={setIsOpen} taskTitle="New task" />
    </>
  );
};
