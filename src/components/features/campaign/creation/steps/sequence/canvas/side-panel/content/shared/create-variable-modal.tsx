"use client";

import type React from "react";

import { useState } from "react";
import { Info } from "lucide-react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
} from "@/components/ui";

interface CreateVariableModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (variableName: string) => void;
}

export function CreateVariableModal({
  open,
  onOpenChange,
  onSave,
}: CreateVariableModalProps) {
  const [variableName, setVariableName] = useState("");

  const handleSave = () => {
    if (variableName.trim()) {
      onSave(variableName.trim());
      setVariableName("");
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setVariableName("");
    onOpenChange(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 rounded-2xl border-0 p-0 shadow-2xl sm:max-w-[600px]">
        {/* Header */}
        <DialogHeader className="p-8 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary p-2">
                <Info className="h-5 w-5 text-white" />
              </div>
              <DialogTitle className="text-xl font-semibold text-foreground">
                Add new custom variable
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="px-8 pb-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Enter the name for your new custom variable
              </p>
              <Input
                value={variableName}
                onChange={(e) => setVariableName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter variable name"
                className="h-14 rounded-xl border-2 border-primary px-4 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
                autoFocus
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <Button
                variant="ghost"
                onClick={handleCancel}
                className="h-11 px-6 text-sm font-medium transition-colors hover:bg-muted"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!variableName.trim()}
                className="h-11 rounded-xl bg-primary px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
