import { DashboardLayoutContent } from "@/components/layout/main-content";
import EmailManagementPage from "@/emails/email-management/page";

import { dashboardRoutes } from "@/config/routes";

const crumbs = [
  { title: "Home", href: dashboardRoutes.home },
  { title: "Emails", href: dashboardRoutes.emails },
];

const Page = () => {
  return (
    <DashboardLayoutContent breadcrumbs={crumbs} currentPage="Email Management">
      <EmailManagementPage />
    </DashboardLayoutContent>
  );
};

export default Page;
