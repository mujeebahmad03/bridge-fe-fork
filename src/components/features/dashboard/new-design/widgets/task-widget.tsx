"use client";

import { useState } from "react";
import { toast } from "sonner";

import { TaskHeader } from "./task/task-header";
import { TaskToolbar } from "./task/task-toolbar";
import { TaskActions } from "./task/task-action";
import { TaskList } from "./task/task-list";

import { cn } from "@/lib/utils";
import { Task, TaskStatus, TaskTab, TaskType } from "@/types/task";
import { mockTasks } from "@/data/task";

interface TaskWidgetProps {
  className?: string;
}

export const TaskWidget = ({ className }: TaskWidgetProps) => {
  const [activeTab, setActiveTab] = useState<TaskTab>("call");
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  // Sample tasks data
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  // Filter tasks based on the active tab and status
  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "completed") {
      return task.status === TaskStatus.DONE;
    }
    return (
      task.taskType === activeTab &&
      (task.status === TaskStatus.IN_PROGRESS ||
        task.status === TaskStatus.TODO)
    );
  });

  const completedTasks = tasks.filter(
    (task) => task.status === TaskStatus.DONE,
  );

  // Display tasks based on active tab
  const displayedTasks =
    activeTab === "completed" ? completedTasks : filteredTasks;

  // Count tasks for each tab
  const callTasksCount = tasks.filter(
    (task) =>
      task.taskType === TaskType.CALL &&
      (task.status === TaskStatus.IN_PROGRESS ||
        task.status === TaskStatus.TODO),
  ).length;
  const emailTasksCount = tasks.filter(
    (task) =>
      task.taskType === TaskType.EMAIL &&
      (task.status === TaskStatus.IN_PROGRESS ||
        task.status === TaskStatus.TODO),
  ).length;
  const linkedinTasksCount = tasks.filter(
    (task) =>
      task.taskType === TaskType.LINKEDIN &&
      (task.status === TaskStatus.IN_PROGRESS ||
        task.status === TaskStatus.TODO),
  ).length;
  const completedTasksCount = completedTasks.length;

  // Handle task selection
  const toggleTaskSelection = (taskId: string) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId],
    );
  };

  // Handle marking tasks as completed
  const markTasksAsCompleted = () => {
    if (selectedTasks.length === 0) return;

    setTasks((prev) =>
      prev.map((task) =>
        selectedTasks.includes(task.id)
          ? { ...task, status: TaskStatus.DONE }
          : task,
      ),
    );

    toast.success(`${selectedTasks.length} task(s) marked as completed`);
    setSelectedTasks([]);
  };

  // Handle deleting tasks
  const deleteTasks = () => {
    if (selectedTasks.length === 0) return;

    setTasks((prev) => prev.filter((task) => !selectedTasks.includes(task.id)));

    toast.success(`${selectedTasks.length} task(s) deleted`);
    setSelectedTasks([]);
  };

  return (
    <div className={cn("widget", className)}>
      <div className="p-6">
        <TaskHeader />

        <TaskToolbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          callTasksCount={callTasksCount}
          emailTasksCount={emailTasksCount}
          linkedinTasksCount={linkedinTasksCount}
          completedTasksCount={completedTasksCount}
        />

        <TaskActions
          selectedCount={selectedTasks.length}
          onMarkCompleted={markTasksAsCompleted}
          onDelete={deleteTasks}
          onAssignTask={() => setSelectedTasks([])}
        />

        <TaskList
          tasks={displayedTasks}
          selectedTasks={selectedTasks}
          onToggleTaskSelection={toggleTaskSelection}
        />
      </div>
    </div>
  );
};
