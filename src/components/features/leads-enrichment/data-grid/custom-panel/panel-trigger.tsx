"use client";

import type * as React from "react";

export interface PanelTriggerProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function CustomPanelTrigger({ children, onClick }: PanelTriggerProps) {
  return (
    <div onClick={onClick} className="cursor-pointer">
      {children}
    </div>
  );
}
