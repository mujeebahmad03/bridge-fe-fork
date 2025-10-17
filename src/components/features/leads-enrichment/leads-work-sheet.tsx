import { DataGrid } from "./data-grid";

import { TemplateType } from "@/types/leads";

export const LeadsWorkSheet = () => {
  return (
    <div className="max-w-7xl overflow-hidden rounded-lg border bg-background p-6 text-foreground shadow-sm">
      <DataGrid initialTemplate={TemplateType.LINKEDIN_TO_EMAIL} />
    </div>
  );
};
