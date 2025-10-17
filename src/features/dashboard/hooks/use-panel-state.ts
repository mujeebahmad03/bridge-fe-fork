"use client";

import { useState, useCallback, useMemo } from "react";

interface PanelState {
  tasks: boolean;
  suggestions: boolean;
  floating: boolean;
}

export function usePanelState(initialState?: Partial<PanelState>) {
  const [panels, setPanels] = useState<PanelState>({
    tasks: true,
    suggestions: true,
    floating: false,
    ...initialState,
  });

  const togglePanel = useCallback((panel: keyof PanelState) => {
    setPanels((prev) => ({
      ...prev,
      [panel]: !prev[panel],
    }));
  }, []);

  const setPanel = useCallback((panel: keyof PanelState, value: boolean) => {
    setPanels((prev) => ({
      ...prev,
      [panel]: value,
    }));
  }, []);

  // Computed values
  const hasOpenPanels = useMemo(
    () => panels.tasks || panels.suggestions,
    [panels.tasks, panels.suggestions],
  );

  return {
    // State
    isTasksPanelOpen: panels.tasks,
    isSuggestionsPanelOpen: panels.suggestions,
    isFloatingMode: panels.floating,
    hasOpenPanels,

    // Actions
    toggleTasksPanel: () => togglePanel("tasks"),
    toggleSuggestionsPanel: () => togglePanel("suggestions"),
    toggleFloatingMode: () => togglePanel("floating"),

    // Generic actions for extensibility
    togglePanel,
    setPanel,
  };
}
