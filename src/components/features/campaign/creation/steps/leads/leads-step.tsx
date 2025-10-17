"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { ImportLeadsDialog } from "./import-leads-dialog";
import { LeadsTable } from "./leads-table";
import { LeadsEmptyState } from "./leads-empty-state";
import type { Lead } from "@/types/campaign";

interface LeadsStepProps {
  onNext: () => void;
  onBack: () => void;
}

export function LeadsStep({ onNext, onBack }: LeadsStepProps) {
  const [open, setOpen] = useState(false);
  const [importedLeads, setImportedLeads] = useState<Lead[]>([]);
  const updateFormData = (data: Lead[]) => {
    setImportedLeads(data);
    setOpen(false);
  };

  const handleImportLeads = () => {
    setOpen(true);
  };

  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold">Leads</h2>
        <p className="text-muted-foreground">Manage leads for your campaign</p>
      </div>

      {importedLeads.length === 0 ? (
        <LeadsEmptyState onImport={handleImportLeads} />
      ) : (
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-medium">Your Leads ({importedLeads.length})</h3>
            <Button
              variant="outline"
              onClick={handleImportLeads}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add More Leads
            </Button>
          </div>

          <LeadsTable leads={importedLeads} />
        </div>
      )}

      <div className="flex justify-between p-6">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Button onClick={onNext} disabled={importedLeads.length === 0}>
          Continue
        </Button>
      </div>

      <ImportLeadsDialog
        open={open}
        onOpenChange={setOpen}
        onImportComplete={updateFormData}
      />
    </div>
  );
}
