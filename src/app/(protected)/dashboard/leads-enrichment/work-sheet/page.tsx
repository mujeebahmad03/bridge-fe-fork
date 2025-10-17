import { Suspense } from "react";

import { DashboardLayoutContent } from "@/components/layout/main-content";
import { dashboardRoutes } from "@/config/routes";
import { DataGridSkeleton } from "@/components/features/leads-enrichment/data-grid/data-grid-skeleton";
import { WorkSheetContent } from "@/components/features/leads-enrichment/data-grid/work-sheet-content";

const crumbs = [
  { title: "Home", href: dashboardRoutes.home },
  { title: "Leads Enrichment", href: dashboardRoutes.leadsEnrichment },
];

export default function WorkSheetPage() {
  return (
    <DashboardLayoutContent breadcrumbs={crumbs} currentPage="Work Sheet">
      <div className="max-w-7xl overflow-hidden bg-background p-6 text-foreground shadow-sm">
        <div className="rounded-lg border bg-background p-6 text-foreground shadow-sm">
          <Suspense fallback={<DataGridSkeleton />}>
            <WorkSheetContent />
          </Suspense>
        </div>
      </div>
    </DashboardLayoutContent>
  );
}
