"use client";

import { Button } from "@/components/ui/button";
import { Users, Mail, ExternalLink, MessageSquare } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex animate-fade-in flex-col items-center justify-center py-8 text-center lg:py-12">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted lg:h-16 lg:w-16">
        <Users className="h-6 w-6 text-muted-foreground lg:h-8 lg:w-8" />
      </div>
      <h3 className="mb-2 text-base font-medium lg:text-lg">
        No accounts connected
      </h3>
      <p className="mb-6 max-w-md text-sm text-muted-foreground lg:text-base">
        Connect your communication channels to see all your conversations with
        this lead in one place.
      </p>

      <div className="w-full max-w-sm space-y-3">
        {[
          { icon: Mail, label: "Email", color: "text-chart-1" },
          { icon: ExternalLink, label: "LinkedIn", color: "text-chart-2" },
          { icon: MessageSquare, label: "WhatsApp", color: "text-chart-5" },
          { icon: MessageSquare, label: "Telegram", color: "text-chart-3" },
        ].map((item, index) => (
          <Button
            key={item.label}
            variant="outline"
            className="w-full animate-fade-in justify-start gap-3 bg-transparent"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <item.icon className={`h-4 w-4 ${item.color}`} />
            {item.label}
            <div className="ml-auto">
              <ExternalLink className="h-4 w-4" />
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
