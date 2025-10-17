import { Campaigns } from "@/components/features/campaign";
import { DashboardLayoutContent } from "@/components/layout/main-content";
import { dashboardRoutes } from "@/config/routes";

const crumbs = [
  { title: "Home", href: dashboardRoutes.home },
  { title: "Campaign", href: dashboardRoutes.campaign },
];

const CampaignPage = () => {
  return (
    <DashboardLayoutContent breadcrumbs={crumbs} currentPage="Campaigns">
      <Campaigns />
    </DashboardLayoutContent>
  );
};

export default CampaignPage;
