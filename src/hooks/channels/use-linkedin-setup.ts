"use client";

import { useState } from "react";
import type {
  LinkedInSetupState,
  LinkedInConnectionMode,
} from "@/types/linkedin";

export function useLinkedInSetup() {
  const [state, setState] = useState<LinkedInSetupState>({
    step: "connection-mode",
    connectionMode: null,
  });

  const setConnectionMode = (mode: LinkedInConnectionMode) => {
    setState((prev) => ({
      ...prev,
      connectionMode: mode,
      step: "form",
    }));
  };

  const goBack = () => {
    setState((prev) => {
      if (prev.step === "form") return { ...prev, step: "connection-mode" };
      return prev;
    });
  };

  const reset = () => {
    setState({
      step: "connection-mode",
      connectionMode: null,
    });
  };

  return {
    state,
    setConnectionMode,
    goBack,
    reset,
  };
}
