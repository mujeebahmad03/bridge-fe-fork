"use client";

import { Upload } from "lucide-react";

import { Button } from "@/components/ui";
import { LeadsIllustration } from "@/components/common/illustrations";

interface LeadsEmptyStateProps {
  onImport: () => void;
}

export function LeadsEmptyState({ onImport }: LeadsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="mb-6">
        <LeadsIllustration />
      </div>
      <h3 className="mb-2 text-xl font-semibold">Add leads to get started</h3>
      <p className="mb-6 max-w-md text-muted-foreground">
        Upload a record of leads and populate their data from Bridge.
      </p>
      <Button onClick={onImport} className="gap-2">
        <Upload className="h-4 w-4" />
        Import Leads
      </Button>
    </div>
  );
}
