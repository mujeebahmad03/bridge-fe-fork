import { DashboardLayoutContent } from "@/components/layout/main-content";
import EmailClient from "@/emails/dashboard/page";

const EmailChannelPage = () => {
  return (
    <DashboardLayoutContent breadcrumbs={[]} currentPage="Email">
      <EmailClient />
    </DashboardLayoutContent>
  );
};

export default EmailChannelPage;
