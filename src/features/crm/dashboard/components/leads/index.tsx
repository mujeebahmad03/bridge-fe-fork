"use client";

import { Building2, Users } from "lucide-react";
import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CompanyLeadsTable } from "./company";
import { ContactLeadsTable } from "./contact";
import { sampleCompanyLeads } from "../../data/leads";
import { sampleContactLeads } from "../../data/leads";

export function LeadsManagement() {
  const [activeTab, setActiveTab] = useState("companies");

  // Calculate stats
  const totalCompanies = sampleCompanyLeads.length;

  const totalContacts = sampleContactLeads.length;

  return (
    <div className="space-y-6">
      {/* Tabbed Tables */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="companies" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Companies
            <Badge variant="secondary" className="ml-1">
              {totalCompanies}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="contacts" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Contacts
            <Badge variant="secondary" className="ml-1">
              {totalContacts}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="companies" className="space-y-4">
          <CompanyLeadsTable data={sampleCompanyLeads} />
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <ContactLeadsTable data={sampleContactLeads} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
