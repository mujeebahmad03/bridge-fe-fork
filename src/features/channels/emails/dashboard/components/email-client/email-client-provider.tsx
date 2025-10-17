"use client";

import { useEffect, useRef } from "react";

import {
  useEmailListLogic,
  useKeyboardShortcuts,
  useScreenSize,
} from "@/emails/dashboard/hooks/ui";
import { useEmailClientStore } from "@/emails/dashboard/stores";

interface EmailClientProviderProps {
  children: React.ReactNode;
}

export function EmailClientProvider({ children }: EmailClientProviderProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const screenSize = useScreenSize();
  const { activeFolder } = useEmailListLogic();
  const { setMobileView } = useEmailClientStore();

  // Reset mobile view when folder changes
  useEffect(() => {
    if (screenSize === "mobile") {
      setMobileView("list");
    }
  }, [activeFolder, screenSize, setMobileView]);

  useKeyboardShortcuts({
    searchInputRef,
    screenSize,
  });

  return <>{children}</>;
}
