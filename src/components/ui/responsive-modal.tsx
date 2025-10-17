"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { CustomModal } from "./custom-modal";
import { CustomDrawer } from "./custom-drawer";

interface ResponsiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

export function ResponsiveModal({
  isOpen,
  onClose,
  children,
  className,
  showCloseButton = true,
}: ResponsiveModalProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  if (isMobile) {
    return (
      <CustomDrawer
        isOpen={isOpen}
        onClose={onClose}
        className={className}
        showCloseButton={showCloseButton}
      >
        {children}
      </CustomDrawer>
    );
  }

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      className={className}
      showCloseButton={showCloseButton}
    >
      {children}
    </CustomModal>
  );
}
