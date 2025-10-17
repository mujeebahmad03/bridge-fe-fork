"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail } from "lucide-react";
import { VariantCard } from "./variant-card";
import { WinnerSummary } from "./winner-summary";

const abTestData = {
  variantA: {
    leads: 600,
    subject: "Quick question about your resume",
    openRate: "4.4%",
    replyRate: "4.4%",
  },
  variantB: {
    leads: 600,
    subject: "Hi john, check this out",
    openRate: "4.4%",
    replyRate: "4.4%",
  },
};

export function ABTestTab() {
  const [selectedEmail, setSelectedEmail] = useState("step-2");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Select value={selectedEmail} onValueChange={setSelectedEmail}>
          <SelectTrigger className="w-64 border-slate-200/50 bg-white/50 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/50">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="step-1">Step 1 Email</SelectItem>
            <SelectItem value="step-2">Step 2 Email</SelectItem>
            <SelectItem value="step-3">Step 3 Email</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <VariantCard
          variant="A"
          leads={abTestData.variantA.leads}
          subject={abTestData.variantA.subject}
          openRate={abTestData.variantA.openRate}
          replyRate={abTestData.variantA.replyRate}
        />
        <VariantCard
          variant="B"
          leads={abTestData.variantB.leads}
          subject={abTestData.variantB.subject}
          openRate={abTestData.variantB.openRate}
          replyRate={abTestData.variantB.replyRate}
        />
      </div>

      <WinnerSummary
        winningVariant="B"
        reason="Variant B had 20% more replies due to personalization and engaging subject line."
      />
    </div>
  );
}
