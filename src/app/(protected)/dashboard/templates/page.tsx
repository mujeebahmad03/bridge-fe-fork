import { DashboardLayoutContent } from "@/components/layout/main-content";
import { dashboardRoutes } from "@/config/routes";

const crumbs = [
  { title: "Home", href: dashboardRoutes.home },
  { title: "Templates", href: dashboardRoutes.templates },
];

const TemplatesPage = () => {
  return (
    <DashboardLayoutContent breadcrumbs={crumbs} currentPage="All Templates">
      <h1 className="text-3xl font-semibold">Templates</h1>
    </DashboardLayoutContent>
  );
};

export default TemplatesPage;
