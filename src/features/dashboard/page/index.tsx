"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { DashboardHeader } from "@/dashboard/components/shared";
import { containerVariants } from "@/dashboard/constants/animations";
import { usePanelState } from "@/dashboard/hooks";
import { tasks, suggestions, quickStats } from "@/dashboard/data";
import {
  FloatingPanelManager,
  AISection,
  PanelsGrid,
  StatsSection,
} from "@/dashboard/components";

export default function DashboardPageContent() {
  const [isAIExpanded, setIsAIExpanded] = useState(false);
  const {
    isTasksPanelOpen,
    isSuggestionsPanelOpen,
    isFloatingMode,
    toggleTasksPanel,
    toggleSuggestionsPanel,
    toggleFloatingMode,
  } = usePanelState();

  const handleToggleAI = () => {
    setIsAIExpanded(!isAIExpanded);
  };

  return (
    <>
      <DashboardHeader
        onToggleFloatingMode={toggleFloatingMode}
        isFloatingMode={isFloatingMode}
      />

      <motion.main
        className="container mx-auto space-y-6 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AISection
          isExpanded={isAIExpanded}
          onToggleExpanded={handleToggleAI}
        />

        <PanelsGrid
          tasks={tasks}
          suggestions={suggestions}
          isTasksPanelOpen={isTasksPanelOpen}
          isSuggestionsPanelOpen={isSuggestionsPanelOpen}
          isAIExpanded={isAIExpanded}
          isFloatingMode={isFloatingMode}
          onToggleTasksPanel={toggleTasksPanel}
          onToggleSuggestionsPanel={toggleSuggestionsPanel}
        />

        <StatsSection stats={quickStats} />
      </motion.main>

      <FloatingPanelManager
        tasks={tasks}
        suggestions={suggestions}
        isFloatingMode={isFloatingMode}
        isTasksPanelOpen={isTasksPanelOpen}
        isSuggestionsPanelOpen={isSuggestionsPanelOpen}
        onToggleTasksPanel={toggleTasksPanel}
        onToggleSuggestionsPanel={toggleSuggestionsPanel}
        onToggleFloatingMode={toggleFloatingMode}
      />
    </>
  );
}
