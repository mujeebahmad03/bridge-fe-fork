"use client";

import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  HelpCircle,
  Thermometer,
  TrendingUp,
  Shield,
  Clock,
} from "lucide-react";
import type { EmailAccount } from "@/types/email-account";

interface WarmUpSwitchProps {
  warmUp: EmailAccount["warmUp"];
  onToggle: (enabled: boolean) => void;
}

export function WarmUpSwitch({ warmUp, onToggle }: WarmUpSwitchProps) {
  const isEnabled =
    warmUp.status === "warming" || warmUp.status === "completed";

  return (
    <div className="flex items-center gap-2">
      <Switch checked={isEnabled} onCheckedChange={onToggle} />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="text-muted-foreground transition-colors hover:text-foreground">
              <HelpCircle className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="max-w-xs border bg-card p-4 shadow-lg"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-semibold">Email Warm-up</span>
              </div>
              <div className="space-y-2 text-xs text-muted-foreground">
                <p>
                  Email warm-up gradually increases your sending volume to build
                  a positive reputation with email providers.
                </p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span>Improves deliverability rates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-3 w-3 text-blue-500" />
                    <span>Protects sender reputation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-orange-500" />
                    <span>Takes 2-4 weeks to complete</span>
                  </div>
                </div>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
