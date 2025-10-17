"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardHeader } from "@/components/ui/card";
import {
  CrmTabContent,
  ScheduleContent,
  TrackingTabContent,
} from "./tab-contents";
import { GeneralSettings } from "./tab-contents/general";

interface SettingsTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  return (
    <CardHeader className="relative pb-0 pt-6">
      <Tabs value={activeTab} className="mt-6" onValueChange={onTabChange}>
        <TabsList className="mb-8 grid w-full grid-cols-2 bg-background/80 backdrop-blur-sm md:grid-cols-4">
          <TabsTrigger
            value="general"
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            General
          </TabsTrigger>
          <TabsTrigger
            value="tracking"
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            Tracking
          </TabsTrigger>
          <TabsTrigger
            value="schedules"
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            Schedules
          </TabsTrigger>
          <TabsTrigger
            value="crm"
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            CRM
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6 space-y-4">
          <GeneralSettings />
        </TabsContent>

        <TabsContent value="tracking" className="mt-6 space-y-4">
          <TrackingTabContent />
        </TabsContent>

        <TabsContent value="schedules" className="mt-6 space-y-4">
          <ScheduleContent />
        </TabsContent>

        <TabsContent value="crm" className="mt-6 space-y-4">
          <CrmTabContent />
        </TabsContent>
      </Tabs>
    </CardHeader>
  );
}
