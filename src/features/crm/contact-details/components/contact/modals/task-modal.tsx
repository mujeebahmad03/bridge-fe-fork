"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  assignee: { name: string; avatar: string };
  dueDate: string;
  dueTime: string;
  completed: boolean;
  createdAt: string;
}

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

const teamMembers = [
  { name: "Sam Queen", avatar: "SQ" },
  { name: "John Doe", avatar: "JD" },
  { name: "Jane Smith", avatar: "JS" },
];

export function TaskModal({
  isOpen,
  onClose,
  tasks,
  setTasks,
}: TaskModalProps) {
  const [taskForm, setTaskForm] = useState({
    title: "",
    assignee: "",
    dueDate: "",
    dueTime: "",
  });

  const handleCreateTask = () => {
    if (!taskForm.title || !taskForm.assignee || !taskForm.dueDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: taskForm.title,
      assignee:
        teamMembers.find((m) => m.name === taskForm.assignee) || teamMembers[0],
      dueDate: taskForm.dueDate,
      dueTime: taskForm.dueTime,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks([...tasks, newTask]);
    setTaskForm({ title: "", assignee: "", dueDate: "", dueTime: "" });
    onClose();
    toast.success("Task created successfully!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="task-title">Task Title</Label>
            <Input
              id="task-title"
              placeholder="Enter task title..."
              value={taskForm.title}
              onChange={(e) =>
                setTaskForm({ ...taskForm, title: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignee">Assignee</Label>
            <Select
              value={taskForm.assignee}
              onValueChange={(value) =>
                setTaskForm({ ...taskForm, assignee: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select assignee" />
              </SelectTrigger>
              <SelectContent>
                {teamMembers.map((member) => (
                  <SelectItem key={member.name} value={member.name}>
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-medium text-primary">
                        {member.avatar}
                      </div>
                      {member.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="due-date">Due Date</Label>
              <Input
                id="due-date"
                type="date"
                value={taskForm.dueDate}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, dueDate: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="due-time">Due Time</Label>
              <Input
                id="due-time"
                type="time"
                value={taskForm.dueTime}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, dueTime: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 bg-transparent"
            >
              Cancel
            </Button>
            <Button onClick={handleCreateTask} className="flex-1">
              Create Task
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
