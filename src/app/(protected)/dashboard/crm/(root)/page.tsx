import { DashboardLayoutContent } from "@/components/layout/main-content";
import { dashboardRoutes } from "@/config/routes";
import { CRMPage } from "@/crm/dashboard/pages";

const crumbs = [
  { title: "Home", href: dashboardRoutes.home },
  { title: "CRM", href: dashboardRoutes.crm },
];

const Page = () => {
  return (
    <DashboardLayoutContent breadcrumbs={crumbs} currentPage="Overview">
      <CRMPage />
    </DashboardLayoutContent>
  );
};

export default Page;
