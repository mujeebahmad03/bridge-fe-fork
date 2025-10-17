"use client";

import { ChevronLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  onDownloadCSV?: () => void;
  onImportCSV?: () => void;
  onAddAccount?: () => void;
}

export function PageHeader({
  onDownloadCSV,
  onImportCSV,
  onAddAccount,
}: PageHeaderProps) {
  const { back } = useRouter();
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:text-primary/80"
          onClick={back}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
        <Button
          variant="outline"
          size="sm"
          className="order-2 bg-transparent sm:order-1"
          onClick={onDownloadCSV}
        >
          Download CSV Template
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="order-3 bg-transparent sm:order-2"
          onClick={onImportCSV}
        >
          Import via CSV
        </Button>
        <Button size="sm" className="order-1 sm:order-3" onClick={onAddAccount}>
          <Plus className="mr-2 h-4 w-4" />
          Add New LinkedIn Account
        </Button>
      </div>
    </div>
  );
}
