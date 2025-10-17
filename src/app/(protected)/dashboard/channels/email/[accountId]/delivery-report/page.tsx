import { DashboardLayoutContent } from "@/components/layout/main-content";
import DeliverabilityReportPage from "@/emails/deliverability/page";

import { dashboardRoutes } from "@/config/routes";

const crumbs = [
  { title: "Home", href: dashboardRoutes.home },
  { title: "Emails", href: dashboardRoutes.emails },
];

const Page = () => {
  return (
    <DashboardLayoutContent breadcrumbs={crumbs} currentPage="Delivery Report">
      <DeliverabilityReportPage />
    </DashboardLayoutContent>
  );
};

export default Page;
