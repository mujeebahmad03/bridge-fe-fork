"use client";

import { motion } from "framer-motion";
import { Phone, Mail, Linkedin, Clock, AlertCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { Task } from "@/dashboard/types";

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const getTaskIcon = () => {
    switch (task.type) {
      case "call":
        return <Phone className="h-4 w-4" />;
      case "email":
        return <Mail className="h-4 w-4" />;
      case "linkedin":
        return <Linkedin className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer rounded-lg border border-border bg-background p-4 transition-colors hover:bg-muted/50"
    >
      <div className="space-y-2">
        <div className="flex flex-1 items-start space-x-3">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            {getTaskIcon()}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="mb-1 truncate text-sm font-medium text-foreground">
              {task.title}
            </h4>
            <p className="mb-2 line-clamp-2 text-xs text-muted-foreground">
              {task.description}
            </p>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                {task.campaign}
              </Badge>
              <Badge className={`text-xs ${getPriorityColor()}`}>
                {task.priority}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between space-y-2 pl-8">
          <Button
            size="sm"
            variant="outline"
            className="h-7 bg-transparent text-xs"
          >
            Start
          </Button>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            {task.dueTime}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
