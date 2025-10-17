"use client";

import { Search } from "lucide-react";
import { type ComponentProps, useState } from "react";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import {
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import { SidebarNodeItem } from "./sidebar-node-item";

import { conditionNodeTypes, stepNodeTypes } from "@/lib/nodeTypes";

export function FlowSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("steps");

  // Filter node types based on search term
  const filteredStepNodes = stepNodeTypes.filter(
    (node) =>
      node.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredConditionNodes = conditionNodeTypes.filter(
    (node) =>
      node.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Group the condition nodes by their icon prefix
  const leadInfoConditions = filteredConditionNodes.filter(
    (node) => node.icon === "📇",
  );
  const leadActionConditions = filteredConditionNodes.filter(
    (node) => node.icon === "📈",
  );

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarContent className="flex-1">
        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search nodes..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Tabs
            defaultValue="steps"
            className="w-full"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="w-full">
              <TabsTrigger value="steps" className="flex-1">
                Steps
              </TabsTrigger>
              <TabsTrigger value="conditions" className="flex-1">
                Conditions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="steps" className="mt-4 space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Automatic Steps</h3>
                <div className="space-y-2">
                  {filteredStepNodes.slice(0, 6).map((nodeType) => (
                    <SidebarNodeItem key={nodeType.type} nodeType={nodeType} />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Manual Execution</h3>
                <div className="space-y-2">
                  {filteredStepNodes.slice(6).map((nodeType) => (
                    <SidebarNodeItem key={nodeType.type} nodeType={nodeType} />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="conditions" className="mt-4 space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Lead Information</h3>
                <div className="space-y-2">
                  {leadInfoConditions.map((nodeType) => (
                    <SidebarNodeItem key={nodeType.type} nodeType={nodeType} />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Lead Actions</h3>
                <div className="space-y-2">
                  {leadActionConditions.map((nodeType) => (
                    <SidebarNodeItem key={nodeType.type} nodeType={nodeType} />
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
