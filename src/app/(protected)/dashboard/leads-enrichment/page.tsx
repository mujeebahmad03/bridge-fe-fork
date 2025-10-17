import { LeadsEnrichment } from "@/components/features/leads-enrichment";
import { DashboardLayoutContent } from "@/components/layout/main-content";
import { dashboardRoutes } from "@/config/routes";

const crumbs = [
  { title: "Home", href: dashboardRoutes.home },
  { title: "Leads Enrichment", href: dashboardRoutes.leadsEnrichment },
];

const LeadsEnrichmentPage = () => {
  return (
    <DashboardLayoutContent breadcrumbs={crumbs} currentPage="Leads Enrichment">
      <LeadsEnrichment />
    </DashboardLayoutContent>
  );
};

export default LeadsEnrichmentPage;
