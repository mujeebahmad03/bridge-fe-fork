import { List } from "lucide-react";

export const TaskHeader = () => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h3 className="widget-title">Task Board</h3>
        <p className="widget-subtitle">View and manage upcoming tasks</p>
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-widget-task">
        <List className="h-5 w-5 text-icon-task" />
      </div>
    </div>
  );
};
