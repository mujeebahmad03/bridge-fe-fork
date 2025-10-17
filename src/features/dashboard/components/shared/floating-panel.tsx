"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, Target, ChevronDown } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskItem } from "./task-item";
import { SuggestionItem } from "./suggestion-item";

import type { Task, Suggestion } from "@/dashboard/types";

interface FloatingPanelProps {
  tasks: Task[];
  suggestions: Suggestion[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export function FloatingPanel({
  tasks,
  suggestions,
  isOpen,
  onToggle,
  onClose,
}: FloatingPanelProps) {
  const [activeTab, setActiveTab] = useState<"tasks" | "suggestions">("tasks");

  return (
    <>
      {/* Floating Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={onToggle}
              className="relative h-14 w-14 rounded-full bg-primary shadow-lg hover:bg-primary/90"
            >
              <MessageSquare className="h-6 w-6" />
              <Badge className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 p-0 text-xs">
                {tasks.length + suggestions.length}
              </Badge>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            className="fixed bottom-4 right-4 top-4 z-50 w-96"
          >
            <Card className="flex h-full flex-col border-border bg-card shadow-2xl">
              <CardHeader className="flex-shrink-0 border-b border-border pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Tasks & Suggestions</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={onToggle}>
                      <ChevronDown />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={onClose}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Tab Navigation */}
                <div className="mt-4 flex space-x-1 rounded-lg bg-muted p-1">
                  <button
                    onClick={() => setActiveTab("tasks")}
                    className={`flex flex-1 items-center justify-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      activeTab === "tasks"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Target className="h-4 w-4" />
                    <span>Tasks</span>
                    <Badge variant="secondary" className="ml-1">
                      {tasks.length}
                    </Badge>
                  </button>
                  <button
                    onClick={() => setActiveTab("suggestions")}
                    className={`flex flex-1 items-center justify-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      activeTab === "suggestions"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Suggestions</span>
                    <Badge variant="secondary" className="ml-1">
                      {suggestions.length}
                    </Badge>
                  </button>
                </div>
              </CardHeader>

              <CardContent className="flex min-h-0 flex-1 flex-col overflow-hidden p-0">
                {/* Tasks Tab Content */}
                {activeTab === "tasks" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex min-h-0 flex-1 flex-col"
                  >
                    <div className="flex-shrink-0 border-b border-border p-4 pb-3">
                      <h3 className="font-medium text-foreground">
                        Today&apos;s Tasks
                      </h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 pt-3">
                      <div className="space-y-3">
                        {tasks.map((task) => (
                          <TaskItem key={task.id} task={task} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Suggestions Tab Content */}
                {activeTab === "suggestions" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex min-h-0 flex-1 flex-col"
                  >
                    <div className="flex-shrink-0 border-b border-border p-4 pb-3">
                      <h3 className="font-medium text-foreground">
                        AI Suggestions
                      </h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 pt-3">
                      <div className="space-y-3">
                        {suggestions.map((suggestion) => (
                          <SuggestionItem
                            key={suggestion.id}
                            suggestion={suggestion}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
