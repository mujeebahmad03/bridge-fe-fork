"use client";

import { Linkedin, Plus } from "lucide-react";
import { Button } from "@/components/ui";

export function LinkedInPageHeader({
  onAddAccount,
}: {
  onAddAccount: () => void;
}) {
  return (
    <div className="relative mb-8">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 opacity-50 dark:from-blue-950/20 dark:to-purple-950/20" />
      <div className="relative flex flex-col justify-between gap-4 rounded-2xl border border-white/20 p-6 backdrop-blur-sm dark:border-white/10 sm:flex-row sm:items-center">
        <div>
          <h1 className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
            <Linkedin className="h-10 w-10 text-blue-600" />
            LinkedIn
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            This is your LinkedIn inbox, you can view and reply to all your
            messages from your connected LinkedIn accounts.
          </p>
        </div>

        <Button onClick={onAddAccount}>
          <Plus className="mr-2 h-4 w-4" />
          Add Account
        </Button>
      </div>
    </div>
  );
}
