import { CRMInterface } from "@/crmContacts/page";
import { DashboardLayoutContent } from "@/components/layout/main-content";
import { dashboardRoutes } from "@/config/routes";

const crumbs = [
  { title: "Home", href: dashboardRoutes.home },
  { title: "CRM", href: dashboardRoutes.crm },
];

const Page = () => {
  return (
    <DashboardLayoutContent breadcrumbs={crumbs} currentPage="Details">
      <CRMInterface />
    </DashboardLayoutContent>
  );
};

export default Page;
