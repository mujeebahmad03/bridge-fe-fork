import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

import { CampaignStepIndicator } from "./campaign-step-indicator";
import { Button } from "@/components/ui";
import { baseDashboardRoute, dashboardRoutes } from "@/config/routes";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout";
import { dashboardNavItems } from "@/config/dashboard-nav-items";
import { DashboardLayoutContent } from "@/components/layout/main-content";
import { CampaignStepIndicatorProps } from "@/types/campaign";

const crumbs = [
  { title: "Home", href: dashboardRoutes.home },
  { title: "Campaign", href: dashboardRoutes.campaign },
];

interface CampaignContainerProps extends CampaignStepIndicatorProps {
  children: ReactNode;
}

export const CampaignContainer = ({
  children,
  currentStep,
  steps,
}: CampaignContainerProps) => {
  const { push } = useRouter();
  return (
    <SidebarProvider>
      <AppSidebar navItems={dashboardNavItems} route={baseDashboardRoute} />
      <DashboardLayoutContent breadcrumbs={crumbs} currentPage="New Campaign">
        <div className="container mx-auto flex animate-fade-in flex-col py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">Campaign</h1>
            <p className="text-muted-foreground">
              Create your campaign within just a few clicks
            </p>
          </div>

          <CampaignStepIndicator steps={steps} currentStep={currentStep} />

          <div className="mt-6 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => push(dashboardRoutes.campaign)}
            >
              <Eye className="h-4 w-4" /> See Campaigns
            </Button>
          </div>

          <div className="mt-4">{children}</div>
        </div>
      </DashboardLayoutContent>
    </SidebarProvider>
  );
};
