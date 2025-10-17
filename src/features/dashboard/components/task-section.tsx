"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Target, Plus, ChevronDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskItem } from "@/dashboard/components/shared";

import type { Task } from "@/dashboard/types";

interface TasksSectionProps {
  tasks: Task[];
  isOpen: boolean;
  onToggle: () => void;
}

export function TasksSection({ tasks, isOpen, onToggle }: TasksSectionProps) {
  return (
    <motion.div layout>
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <Card className="overflow-hidden border-border bg-card">
          <CollapsibleTrigger asChild>
            <motion.div
              whileHover={{
                backgroundColor: "hsl(var(--muted) / 0.5)",
              }}
              transition={{ duration: 0.2 }}
            >
              <CardHeader className="cursor-pointer pb-3 transition-colors hover:bg-muted/50">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <Target className="h-5 w-5 text-primary" />
                    </motion.div>
                    <span className="text-foreground">Today&apos;s Tasks</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Badge
                        variant="secondary"
                        className="bg-secondary text-secondary-foreground"
                      >
                        {tasks.length}
                      </Badge>
                    </motion.div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                    >
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </motion.div>
                  </div>
                </div>
              </CardHeader>
            </motion.div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <CardContent className="space-y-3 bg-card">
                <AnimatePresence>
                  {tasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{
                        delay: index * 0.05,
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                    >
                      <TaskItem task={task} />
                    </motion.div>
                  ))}
                </AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: tasks.length * 0.05 + 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className="mt-4 w-full border-border bg-transparent hover:bg-muted"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Task
                  </Button>
                </motion.div>
              </CardContent>
            </motion.div>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </motion.div>
  );
}
