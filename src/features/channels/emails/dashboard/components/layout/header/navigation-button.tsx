"use client";

import { ArrowLeft, Menu } from "lucide-react";

import { AnimatedButton } from "@/emails/dashboard/components/shared";

interface NavigationButtonProps {
  showBackButton: boolean;
  onBack?: () => void;
  onMenuToggle: () => void;
  screenSize: string;
}

export function NavigationButton({
  showBackButton,
  onBack,
  onMenuToggle,
  screenSize,
}: NavigationButtonProps) {
  const isMobile = screenSize === "mobile";

  if (showBackButton) {
    return (
      <AnimatedButton onClick={onBack}>
        <ArrowLeft className="h-4 w-4" />
      </AnimatedButton>
    );
  }

  return (
    <AnimatedButton onClick={onMenuToggle}>
      <Menu className={isMobile ? "h-4 w-4" : "h-5 w-5"} />
    </AnimatedButton>
  );
}
