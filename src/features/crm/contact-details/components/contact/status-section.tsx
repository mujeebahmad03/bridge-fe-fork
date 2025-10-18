"use client";

import { Target } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CampaignStatus {
  name: string;
  step: number;
  totalSteps: number;
  nextAction: string;
}

interface StatusSectionProps {
  leadStatus: string;
  campaignStatus: CampaignStatus;
  onLeadStatusChange: (value: string) => void;
}

const leadStatusOptions = [
  { value: "new", label: "New", color: "bg-blue-500" },
  { value: "contacted", label: "Contacted", color: "bg-yellow-500" },
  { value: "qualified", label: "Qualified", color: "bg-green-500" },
  { value: "proposal", label: "Proposal", color: "bg-purple-500" },
  { value: "negotiation", label: "Negotiation", color: "bg-orange-500" },
  { value: "closed-won", label: "Closed Won", color: "bg-emerald-500" },
  { value: "closed-lost", label: "Closed Lost", color: "bg-red-500" },
];

export function StatusSection({
  leadStatus,
  onLeadStatusChange,
}: StatusSectionProps) {
  /*  const campaignProgress =
    (campaignStatus.step / campaignStatus.totalSteps) * 100; */

  return (
    <div className="space-y-3">
      <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Status
      </h4>

      {/* Lead Status */}
      <div className="flex items-center gap-3 text-sm">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
          <Target className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex-1 space-y-2">
          <p className="text-xs text-muted-foreground">Lead Status</p>
          <Select value={leadStatus} onValueChange={onLeadStatusChange}>
            <SelectTrigger className="h-8 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {leadStatusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${option.color}`} />
                    {option.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Campaign Status */}
      {/* <div className="flex items-start gap-3 text-sm">
        <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
          <Workflow className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex-1 space-y-2">
          <p className="text-xs text-muted-foreground">Campaign Status</p>
          <Card className="gradient-subtle border-border/50">
            <CardContent className="space-y-3 p-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{campaignStatus.name}</p>
                <span className="text-xs text-muted-foreground">
                  {campaignStatus.step}/{campaignStatus.totalSteps}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-primary transition-all duration-300"
                    style={{ width: `${campaignProgress}%` }}
                  />
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Next: {campaignStatus.nextAction}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div> */}
    </div>
  );
}
