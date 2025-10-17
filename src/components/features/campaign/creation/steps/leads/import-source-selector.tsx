"use client";

import type React from "react";

import { FileSpreadsheet, RefreshCw, Database } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ImportSource } from "@/types/campaign";

interface ImportSourceSelectorProps {
  onSelectSource: (source: ImportSource) => void;
}

export function ImportSourceSelector({
  onSelectSource,
}: ImportSourceSelectorProps) {
  return (
    <div className="grid gap-6 py-4">
      <ImportSourceOption
        title="Import CSV"
        icon={<FileSpreadsheet className="h-6 w-6" />}
        description="Easily upload CSV files to quickly add data to your account. Simply select your file, review the preview, and confirm the import."
        onClick={() => onSelectSource("csv")}
      />
      <ImportSourceOption
        title="From Existing Campaign"
        icon={<RefreshCw className="h-6 w-6" />}
        description="Effortlessly transfer data from a previous campaign into your new one. Select the campaign, review the details, and import."
        onClick={() => onSelectSource("campaign")}
      />
      <ImportSourceOption
        title="From CRM"
        icon={<Database className="h-6 w-6" />}
        description="Seamlessly pull in customer data from your CRM. Connect your account, select the records you need, and import for streamlined flow."
        onClick={() => onSelectSource("crm")}
      />
    </div>
  );
}

interface ImportSourceOptionProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  onClick: () => void;
}

function ImportSourceOption({
  title,
  icon,
  description,
  onClick,
}: ImportSourceOptionProps) {
  return (
    <Card
      className="cursor-pointer transition-all hover:border-primary/50"
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="rounded-md bg-primary/10 p-2">{icon}</div>
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription className="mt-1 text-sm">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}
