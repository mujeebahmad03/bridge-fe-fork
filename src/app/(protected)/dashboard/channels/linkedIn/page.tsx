import { DashboardLayoutContent } from "@/components/layout/main-content";
import LinkedInChatInterface from "@/linkedin/dashboard/page";

const LinkedInChannelPage = () => {
  return (
    <DashboardLayoutContent breadcrumbs={[]} currentPage="LinkedIn">
      <LinkedInChatInterface />
    </DashboardLayoutContent>
  );
};

export default LinkedInChannelPage;
