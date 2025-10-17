import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { LeadsManagement } from "@/crm/dashboard/components/leads";
import { NewCompanyTable } from "@/crm/dashboard/components/new-company-table";
import { NewContactTable } from "@/crm/dashboard/components/new-contact-table";

const DemoPage = () => {
  return (
    <Tabs defaultValue="contact">
      <TabsList>
        <TabsTrigger value="contact">Contact</TabsTrigger>
        <TabsTrigger value="company">Company</TabsTrigger>
        <TabsTrigger value="leads">Leads</TabsTrigger>
      </TabsList>
      <TabsContent value="contact">
        <NewContactTable />
      </TabsContent>
      <TabsContent value="company">
        <NewCompanyTable />
      </TabsContent>
      <TabsContent value="leads">
        <LeadsManagement />
      </TabsContent>
    </Tabs>
  );
};

export default DemoPage;
