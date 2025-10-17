"use client";

import { useState } from "react";
import type {
  EmailSetupState,
  EmailProvider,
  ConnectionMode,
} from "@/types/email";

export function useEmailSetup() {
  const [state, setState] = useState<EmailSetupState>({
    step: "provider",
    provider: null,
    connectionMode: null,
  });

  const setProvider = (provider: EmailProvider) => {
    setState((prev) => ({
      ...prev,
      provider,
      step: provider === "custom" ? "connection-mode" : "provider",
    }));
  };

  const setConnectionMode = (mode: ConnectionMode) => {
    setState((prev) => ({
      ...prev,
      connectionMode: mode,
      step: mode === "single" ? "imap-setup" : "form",
    }));
  };

  const goToForm = () => {
    setState((prev) => ({ ...prev, step: "form" }));
  };

  const goBack = () => {
    setState((prev) => {
      if (prev.step === "form") return { ...prev, step: "imap-setup" };
      if (prev.step === "imap-setup")
        return { ...prev, step: "connection-mode" };
      if (prev.step === "connection-mode") return { ...prev, step: "provider" };
      return prev;
    });
  };

  const reset = () => {
    setState({
      step: "provider",
      provider: null,
      connectionMode: null,
    });
  };

  return {
    state,
    setProvider,
    setConnectionMode,
    goToForm,
    goBack,
    reset,
  };
}
