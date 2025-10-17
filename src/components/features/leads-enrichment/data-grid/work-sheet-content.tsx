"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

import { DataGrid } from "./data-grid";

import { TemplateType } from "@/types/leads";

// Helper function to validate template type
function isValidTemplateType(template: string): boolean {
  return Object.values(TemplateType).includes(template as TemplateType);
}

// Helper function to format template name for display
function formatTemplateName(template: string): string {
  return template.replace(/_/g, " ");
}

export function WorkSheetContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get template from URL or default to "Custom"
  const templateParam = searchParams.get("template") || "Custom";
  const [templateType, setTemplateType] = useState<TemplateType>(
    isValidTemplateType(templateParam)
      ? (templateParam as TemplateType)
      : ("Custom" as TemplateType),
  );

  // Update URL when template changes
  const handleTemplateChange = (newTemplate: TemplateType) => {
    setTemplateType(newTemplate);

    // Create new URL with updated search params
    const params = new URLSearchParams(searchParams.toString());
    params.set("template", newTemplate);

    // Update URL without full page reload
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <DataGrid
        initialTemplate={templateType}
        onTemplateChange={handleTemplateChange}
      />

      <div className="mt-8 text-sm text-muted-foreground">
        <p>
          This table is configured for the {formatTemplateName(templateType)}{" "}
          template.
        </p>
        <p>Double-click on any cell to edit its content.</p>
        <p>Click on column headers to edit column details.</p>
      </div>
    </>
  );
}
