"use client";

import { FloatingPanel } from "@/dashboard/components/shared";
import type { Task, Suggestion } from "@/dashboard/types";

interface FloatingPanelManagerProps {
  tasks: Task[];
  suggestions: Suggestion[];
  isFloatingMode: boolean;
  isTasksPanelOpen: boolean;
  isSuggestionsPanelOpen: boolean;
  onToggleTasksPanel: () => void;
  onToggleSuggestionsPanel: () => void;
  onToggleFloatingMode: () => void;
}

export function FloatingPanelManager({
  tasks,
  suggestions,
  isFloatingMode,
  isTasksPanelOpen,
  isSuggestionsPanelOpen,
  onToggleTasksPanel,
  onToggleSuggestionsPanel,
  onToggleFloatingMode,
}: FloatingPanelManagerProps) {
  if (!isFloatingMode) return null;

  const handleToggle = () => {
    if (isTasksPanelOpen && isSuggestionsPanelOpen) {
      onToggleTasksPanel();
      onToggleSuggestionsPanel();
    } else {
      onToggleTasksPanel();
    }
  };

  return (
    <FloatingPanel
      tasks={tasks}
      suggestions={suggestions}
      isOpen={isTasksPanelOpen || isSuggestionsPanelOpen}
      onToggle={handleToggle}
      onClose={onToggleFloatingMode}
    />
  );
}
