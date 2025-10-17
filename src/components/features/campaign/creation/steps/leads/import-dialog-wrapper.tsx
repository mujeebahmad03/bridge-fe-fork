"use client";

import type { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { useMediaQuery } from "@/hooks/ui";
import type { ImportStep } from "@/types/campaign";

interface ImportDialogWrapperProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  step: ImportStep;
  children: ReactNode;
}

export function ImportDialogWrapper({
  open,
  onOpenChange,
  step,
  children,
}: ImportDialogWrapperProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const title = getDialogTitle(step);
  const description = getDialogDescription(step);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] md:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4">{children}</div>
      </DrawerContent>
    </Drawer>
  );
}

function getDialogTitle(step: ImportStep): string {
  switch (step) {
    case "source":
      return "Import Leads";
    case "upload":
      return "Import CSV";
    case "mapping":
      return "Map Data";
    case "preview":
      return "Preview Data";
    default:
      return "Import Leads";
  }
}

function getDialogDescription(step: ImportStep): string {
  switch (step) {
    case "source":
      return "Choose how you want to import leads";
    case "upload":
      return "Upload your CSV file";
    case "mapping":
      return "Map your CSV columns to Bridge fields";
    case "preview":
      return "Review your data before importing";
    default:
      return "";
  }
}
