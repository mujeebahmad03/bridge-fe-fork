import { DashboardLayoutContent } from "@/components/layout/main-content";
import DashboardPageContent from "@/dashboard/page";

const crumbs = [{ title: "Home", href: "/dashboard" }];

const DashboardPage = () => {
  return (
    <DashboardLayoutContent breadcrumbs={crumbs} currentPage="Dashboard">
      <DashboardPageContent />
    </DashboardLayoutContent>
  );
};

export default DashboardPage;
