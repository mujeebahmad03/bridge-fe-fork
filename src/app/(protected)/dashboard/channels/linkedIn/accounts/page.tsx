import { DashboardLayoutContent } from "@/components/layout/main-content";
import LinkedInAccountManagement from "@/linkedin/account-mgt/page";

import { dashboardRoutes } from "@/config/routes";

const crumbs = [
  { title: "Home", href: dashboardRoutes.home },
  { title: "LinkedIn", href: dashboardRoutes.linkedIn },
];

const LinkedInChannelPage = () => {
  return (
    <DashboardLayoutContent
      breadcrumbs={crumbs}
      currentPage="Account Management"
    >
      <LinkedInAccountManagement />
    </DashboardLayoutContent>
  );
};

export default LinkedInChannelPage;
