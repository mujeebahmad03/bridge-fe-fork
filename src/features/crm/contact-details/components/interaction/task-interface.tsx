"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { TaskForm, taskSchema, teamMembers } from "./task-form";
import { TaskCard } from "./task-card";
import { TaskFilters } from "./task-filters";
import type * as z from "zod";

interface Task {
  id: string;
  title: string;
  description?: string;
  assignee: { name: string; avatar: string; id: string };
  dueDate: string;
  dueTime?: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Follow up on contract proposal",
    description:
      "Send follow-up email regarding the Q1 contract proposal and schedule a meeting to discuss terms.",
    assignee: { name: "Sam Queen", avatar: "SQ", id: "1" },
    dueDate: "2025-01-20",
    dueTime: "14:00",
    priority: "high",
    completed: false,
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Prepare quarterly report",
    description:
      "Compile Q4 performance metrics and prepare presentation for board meeting.",
    assignee: { name: "Alex Johnson", avatar: "AJ", id: "2" },
    dueDate: "2025-01-18",
    priority: "medium",
    completed: true,
    createdAt: "2025-01-10T09:00:00Z",
    updatedAt: "2025-01-17T16:30:00Z",
  },
  {
    id: "3",
    title: "Update CRM database",
    description:
      "Clean up duplicate entries and update contact information for all leads.",
    assignee: { name: "Maria Garcia", avatar: "MG", id: "3" },
    dueDate: "2025-01-25",
    dueTime: "10:00",
    priority: "low",
    completed: false,
    createdAt: "2025-01-12T14:00:00Z",
    updatedAt: "2025-01-12T14:00:00Z",
  },
];

export function TaskInterface() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending" | "completed"
  >("all");
  const [filterPriority, setFilterPriority] = useState<
    "all" | "low" | "medium" | "high"
  >("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      assignee: "",
      dueDate: "",
      dueTime: "",
      priority: "medium",
    },
  });

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "completed" && task.completed) ||
      (filterStatus === "pending" && !task.completed);
    const matchesPriority =
      filterPriority === "all" || task.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const toggleTaskComplete = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
              updatedAt: new Date().toISOString(),
            }
          : task,
      ),
    );
    toast.success("Task updated successfully");
  };

  const handleCreateTask = (values: z.infer<typeof taskSchema>) => {
    const assignee = teamMembers.find(
      (member) => member.id === values.assignee,
    )!;
    const newTask: Task = {
      id: Date.now().toString(),
      title: values.title,
      description: values.description,
      assignee,
      dueDate: values.dueDate,
      dueTime: values.dueTime,
      priority: values.priority,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTasks([newTask, ...tasks]);
    setIsCreateDialogOpen(false);
    form.reset();
    toast.success("Task created successfully");
  };

  const handleEditTask = (values: z.infer<typeof taskSchema>) => {
    if (!editingTask) return;

    const assignee = teamMembers.find(
      (member) => member.id === values.assignee,
    )!;
    const updatedTask: Task = {
      ...editingTask,
      title: values.title,
      description: values.description,
      assignee,
      dueDate: values.dueDate,
      dueTime: values.dueTime,
      priority: values.priority,
      updatedAt: new Date().toISOString(),
    };

    setTasks(
      tasks.map((task) => (task.id === editingTask.id ? updatedTask : task)),
    );
    setEditingTask(null);
    form.reset();
    toast.success("Task updated successfully");
  };

  const openEditDialog = (task: Task) => {
    setEditingTask(task);
    form.reset({
      title: task.title,
      description: task.description || "",
      assignee: task.assignee.id,
      dueDate: task.dueDate,
      dueTime: task.dueTime || "",
      priority: task.priority,
    });
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    toast.success("Task deleted successfully");
  };

  const handleCancelForm = () => {
    setIsCreateDialogOpen(false);
    setEditingTask(null);
    form.reset();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-semibold">Tasks</h2>
          <p className="text-sm text-muted-foreground">
            {filteredTasks.filter((t) => !t.completed).length} pending,{" "}
            {filteredTasks.filter((t) => t.completed).length} completed
          </p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <TaskForm
              form={form}
              onSubmit={handleCreateTask}
              onCancel={handleCancelForm}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <TaskFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterStatus={filterStatus}
        onStatusChange={setFilterStatus}
        filterPriority={filterPriority}
        onPriorityChange={setFilterPriority}
      />

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggleComplete={toggleTaskComplete}
            onEdit={openEditDialog}
            onDelete={deleteTask}
          />
        ))}

        {filteredTasks.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="space-y-2">
                <p className="text-muted-foreground">No tasks found</p>
                <p className="text-sm text-muted-foreground">
                  {searchQuery ||
                  filterStatus !== "all" ||
                  filterPriority !== "all"
                    ? "Try adjusting your filters"
                    : "Create your first task to get started"}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Task Dialog */}
      <Dialog
        open={!!editingTask}
        onOpenChange={(open) => !open && setEditingTask(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <TaskForm
            form={form}
            onSubmit={handleEditTask}
            onCancel={handleCancelForm}
            isEdit
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
