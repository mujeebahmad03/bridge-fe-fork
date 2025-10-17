import { DashboardLayoutContent } from "@/components/layout/main-content";
import LinkedInDeliverability from "@/linkedin/deliverability/page";

import { dashboardRoutes } from "@/config/routes";

const crumbs = [
  { title: "Home", href: dashboardRoutes.home },
  { title: "LinkedIn", href: dashboardRoutes.linkedIn },
];

const LinkedInChannelPage = () => {
  return (
    <DashboardLayoutContent
      breadcrumbs={crumbs}
      currentPage="Performance Report"
    >
      <LinkedInDeliverability />
    </DashboardLayoutContent>
  );
};

export default LinkedInChannelPage;
