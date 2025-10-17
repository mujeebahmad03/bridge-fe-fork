"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { dashboardRoutes } from "@/config/routes";

export function CampaignHeader() {
  const router = useRouter();

  return (
    <div className="mb-8 flex flex-col items-start justify-between sm:flex-row sm:items-center">
      <div>
        <h1 className="text-2xl font-bold text-primary">Campaign</h1>
        <p className="text-muted-foreground">
          Create your campaign within just a few clicks
        </p>
      </div>
      <Button
        className="mt-4 sm:mt-0"
        size="lg"
        onClick={() => router.push(`${dashboardRoutes.campaign}/new`)}
      >
        <Plus className="mr-2 h-4 w-4" /> Add New Campaign
      </Button>
    </div>
  );
}
