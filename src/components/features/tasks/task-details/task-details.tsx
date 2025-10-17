"use client";

import { format } from "date-fns";
import {
  AlertCircle,
  Calendar,
  Clock,
  FileText,
  User,
  Building2,
  Edit2,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import {
  Badge,
  Button,
  Calendar as CalendarComponent,
  Card,
  CardContent,
  CardHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";

import { Assignee, Task, TaskPriority } from "@/types/task";

export const assignees: Assignee[] = [
  { id: "1", name: "Emma Davis", initials: "ED", avatar: "/avatar-1.png" },
  { id: "2", name: "Alex Smith", initials: "AS", avatar: "/avatar-2.png" },
  { id: "3", name: "Sarah Johnson", initials: "SJ", avatar: "/avatar-3.png" },
  { id: "4", name: "Michael Brown", initials: "MB", avatar: "/avatar-4.png" },
  { id: "5", name: "Jessica Wilson", initials: "JW", avatar: "/avatar-5.png" },
];

export function TaskDetails({ task }: { task: Task }) {
  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.HIGH:
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      case TaskPriority.MEDIUM:
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
      case TaskPriority.LOW:
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
    }
  };

  const timeSlots = [];
  for (let hour = 0; hour < 24; hour++) {
    for (const minute of ["00", "30"]) {
      const formattedHour = hour.toString().padStart(2, "0");
      timeSlots.push(`${formattedHour}:${minute}`);
    }
  }

  const updateTaskDueDate = (taskId: string, newDate: Date) => {
    console.log({ taskId, newDate });

    toast.success(`Due date updated to ${format(newDate, "MMM d, yyyy")}`);
  };

  const updateTaskDueTime = (taskId: string, newTime: string) => {
    console.log({ taskId, newTime });

    toast.success(`Due time updated to ${newTime}`);
  };

  const updateTaskAssignee = (taskId: string, newAssignee: Assignee) => {
    console.log({ taskId, newAssignee });
    toast.success(`Task assigned to ${newAssignee.name}`);
  };

  return (
    <Card className="mt-6">
      <CardHeader className="space-y-2 pb-2">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            {task.title}
          </h2>
          <p className="text-sm text-muted-foreground">{task.description}</p>
        </div>
        <Badge
          variant="secondary"
          className={`${getPriorityColor(task.priority)} w-max transition-colors`}
        >
          <AlertCircle className="mr-1 h-3 w-3" />
          {task.priority} Priority
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="space-y-4">
            {/* Due Date */}
            <div className="flex items-center gap-4 rounded-md border border-border/40 bg-secondary/40 p-3">
              <Calendar size={18} className="text-muted-foreground" />
              <div className="flex-1">
                <p className="mb-1 text-xs text-muted-foreground">Due date</p>
                <div className="flex items-center justify-between">
                  <p>{format(task.dueDate, "MMM d, yyyy")}</p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit2 size={14} />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <CalendarComponent
                        mode="single"
                        selected={task.dueDate}
                        onSelect={(date) =>
                          date && updateTaskDueDate(task.id, date)
                        }
                        initialFocus
                        className="pointer-events-auto bg-popover p-3"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            {/* Due Time */}
            <div className="flex items-center gap-4 rounded-md border border-border/40 bg-secondary/40 p-3">
              <Clock size={18} className="text-muted-foreground" />
              <div className="flex-1">
                <p className="mb-1 text-xs text-muted-foreground">Due time</p>
                <div className="flex items-center justify-between">
                  <p>{task.dueTime}</p>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit2 size={14} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="max-h-64 overflow-y-auto"
                    >
                      {timeSlots.map((slot) => (
                        <DropdownMenuItem
                          key={slot}
                          onClick={() => updateTaskDueTime(task.id, slot)}
                          className={task.dueTime === slot ? "bg-accent" : ""}
                        >
                          {slot}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            {/* Assigned To */}
            <div className="flex items-center gap-4 rounded-md border border-border/40 bg-secondary/40 p-3">
              <User size={18} className="text-muted-foreground" />
              <div className="flex-1">
                <p className="mb-1 text-xs text-muted-foreground">
                  Assigned to
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs">
                      {typeof task.assignedTo !== "string" &&
                        task.assignedTo.initials}
                    </div>
                    <p>
                      {typeof task.assignedTo !== "string"
                        ? task.assignedTo.name
                        : task.assignedTo}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit2 size={14} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {assignees.map((assignee) => (
                        <DropdownMenuItem
                          key={assignee.id}
                          onClick={() => updateTaskAssignee(task.id, assignee)}
                          className={
                            typeof task.assignedTo !== "string" &&
                            task.assignedTo.id === assignee.id
                              ? "bg-accent"
                              : ""
                          }
                        >
                          <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs">
                              {assignee.initials}
                            </div>
                            <span>{assignee.name}</span>
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-md border border-border/40 bg-secondary/40 p-3">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Task type</span>
              <Badge variant="secondary">{task.taskType}</Badge>
            </div>
          </div>

          <div className="space-y-4">
            {task.contact && (
              <div className="flex items-center gap-4 rounded-md border border-border/40 bg-secondary/40 p-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Contact</span>
                <span>{task.contact}</span>
              </div>
            )}

            {task.company && (
              <div className="flex items-center gap-4 rounded-md border border-border/40 bg-secondary/40 p-3">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Company</span>
                <span>{task.company}</span>
              </div>
            )}

            <div className="flex items-center gap-4 rounded-md border border-border/40 bg-secondary/40 p-3">
              <Users size={18} className="text-muted-foreground" />
              <div className="flex-1">
                <p className="mb-1 text-xs text-muted-foreground">Campaign</p>
                <p>{task.campaign}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
