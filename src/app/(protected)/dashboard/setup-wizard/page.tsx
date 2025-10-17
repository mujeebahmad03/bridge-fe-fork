import { SetupGuide } from "@/components/features/onboarding";
import { DashboardLayoutContent } from "@/components/layout/main-content";
import { dashboardRoutes } from "@/config/routes";

const crumbs = [
  { title: "Home", href: dashboardRoutes.home },
  { title: "Setup Wizard", href: dashboardRoutes.wizard },
];

const SetUpWizardPage = () => {
  return (
    <DashboardLayoutContent breadcrumbs={crumbs} currentPage="Setup Wizard">
      <SetupGuide />
    </DashboardLayoutContent>
  );
};

export default SetUpWizardPage;
