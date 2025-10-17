"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export function ConversationTabs() {
  const [tab, setTab] = useState("focused");

  return (
    <Tabs value={tab} onValueChange={setTab} className="mb-4">
      <TabsList className="w-full rounded-lg bg-muted p-1">
        <TabsTrigger value="focused" className="flex-1 text-sm">
          Focused
        </TabsTrigger>
        <TabsTrigger value="other" className="flex-1 text-sm">
          Other
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
