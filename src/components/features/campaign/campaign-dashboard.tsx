import { Campaign } from "@/types/campaign";
import { CampaignHeader } from "./campaign-header";
import { CampaignIllustration } from "@/components/common/illustrations";

interface CampaignDashboardProps {
  campaigns: Campaign[];
}

export function CampaignDashboard({}: CampaignDashboardProps) {
  return (
    <div className="mx-auto max-w-7xl">
      <CampaignHeader />

      <div className="rounded-lg border bg-card shadow-sm">
        <div className="flex flex-col justify-between p-6 lg:flex-row lg:items-center">
          <h2 className="text-xl font-semibold">Created Campaigns</h2>
          <div className="mt-4 lg:mt-0">
            <CampaignIllustration />
          </div>
        </div>
      </div>
    </div>
  );
}
