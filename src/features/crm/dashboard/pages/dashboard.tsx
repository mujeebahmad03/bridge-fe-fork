import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { LeadsManagement } from "@/crm/dashboard/components/leads";
import { NewCompanyTable } from "@/crm/dashboard/components/new-company-table";
import { NewContactTable } from "@/crm/dashboard/components/new-contact-table";
import { LeadListTable } from "../components";

export function CRMPage() {
  return (
    <Tabs defaultValue="contact">
      <TabsList>
        <TabsTrigger value="contact">Contact</TabsTrigger>
        <TabsTrigger value="company">Company</TabsTrigger>
        <TabsTrigger value="leads">Leads</TabsTrigger>
        <TabsTrigger value="leadList">Lead List</TabsTrigger>
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
      <TabsContent value="leadList">
        <LeadListTable />
      </TabsContent>
    </Tabs>
  );
}
