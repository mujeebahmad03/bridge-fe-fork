import { LayoutTemplateIcon } from "lucide-react";

import { SectionCard } from "./section-card";
import { TemplatesModal } from "./template";
import { WorksheetModal } from "./work-sheet/dialog";
import { HistorySection } from "./upload-history";
import { MarketingAutomation } from "@/components/common/illustrations";

export const LeadsEnrichment = () => {
  return (
    <div className="container mx-auto max-w-6xl animate-fade-in px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Leads Enrichment</h1>

      {/* Template Section */}
      <SectionCard
        icon={<LayoutTemplateIcon size={20} />}
        title="Template"
        description="Use preset workflows to input and organize your leads enrichment data, with real-time preview and run actions."
      >
        <div className="mx-auto mt-8 flex max-w-lg flex-col items-center text-center">
          <MarketingAutomation />

          <h3 className="mb-2 text-xl font-semibold">Enrich Your Records</h3>
          <p className="mb-6 text-muted-foreground">
            Upload a record of leads and enrich their information from Bridge.
          </p>

          <div className="flex w-full justify-center gap-4">
            <WorksheetModal />
            <TemplatesModal />
          </div>
        </div>
      </SectionCard>

      {/* History Section */}
      <HistorySection />
    </div>
  );
};
