"use client";

import { motion, AnimatePresence } from "framer-motion";

import { TasksSection } from "./task-section";
import { SuggestionsSection } from "./suggestion-section";

import type { Task, Suggestion } from "@/dashboard/types";

interface PanelsGridProps {
  tasks: Task[];
  suggestions: Suggestion[];
  isTasksPanelOpen: boolean;
  isSuggestionsPanelOpen: boolean;
  isAIExpanded: boolean;
  isFloatingMode: boolean;
  onToggleTasksPanel: () => void;
  onToggleSuggestionsPanel: () => void;
}

export function PanelsGrid({
  tasks,
  suggestions,
  isTasksPanelOpen,
  isSuggestionsPanelOpen,
  isAIExpanded,
  isFloatingMode,
  onToggleTasksPanel,
  onToggleSuggestionsPanel,
}: PanelsGridProps) {
  if (isFloatingMode) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        layout
        className={`grid gap-6 transition-all duration-300 ${
          isAIExpanded ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"
        }`}
      >
        <TasksSection
          tasks={tasks}
          isOpen={isTasksPanelOpen}
          onToggle={onToggleTasksPanel}
        />
        <SuggestionsSection
          suggestions={suggestions}
          isOpen={isSuggestionsPanelOpen}
          onToggle={onToggleSuggestionsPanel}
        />
      </motion.div>
    </AnimatePresence>
  );
}
