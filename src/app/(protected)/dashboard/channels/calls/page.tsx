import { DashboardLayoutContent } from "@/components/layout/main-content";
import { dashboardRoutes } from "@/config/routes";

const crumbs = [
  { title: "Home", href: dashboardRoutes.home },
  { title: "Channels", href: dashboardRoutes.channels },
];

const CallsChannelPage = () => {
  return (
    <DashboardLayoutContent breadcrumbs={crumbs} currentPage="Calls Channel">
      <h1 className="text-3xl font-semibold">Calls</h1>
    </DashboardLayoutContent>
  );
};

export default CallsChannelPage;
