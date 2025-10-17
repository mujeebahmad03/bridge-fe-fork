"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { dashboardRoutes } from "@/config/routes";

export function ActionButtons() {
  const { push } = useRouter();
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="bg-primary text-xs text-primary-foreground hover:bg-primary/90"
        onClick={() => push(`${dashboardRoutes.emails}/management`)}
      >
        Email Account Management
      </Button>
    </div>
  );
}
