"use client";

import {
  Phone,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Clock,
  ChevronDown,
  ChevronRight,
  Play,
  Download,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface CallRecordProps {
  call: {
    id: string;
    type: "incoming" | "outgoing" | "missed";
    status: "completed" | "missed" | "declined" | "busy";
    participant: {
      name: string;
      avatar?: string;
      title: string;
      company: string;
    };
    duration: string;
    timestamp: string;
    transcription?: string;
    recording?: boolean;
    notes?: string;
  };
}

export function CallRecord({ call }: CallRecordProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getCallIcon = () => {
    switch (call.type) {
      case "incoming":
        return <PhoneIncoming className="h-4 w-4" />;
      case "outgoing":
        return <PhoneOutgoing className="h-4 w-4" />;
      case "missed":
        return <PhoneMissed className="h-4 w-4" />;
      default:
        return <Phone className="h-4 w-4" />;
    }
  };

  const getStatusColor = () => {
    switch (call.status) {
      case "completed":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "missed":
        return "bg-red-500/10 text-red-700 dark:text-red-400";
      case "declined":
        return "bg-orange-500/10 text-orange-700 dark:text-orange-400";
      case "busy":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="p-4 transition-shadow hover:shadow-sm">
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "rounded-full p-2",
            call.type === "missed"
              ? "bg-red-500/10 text-red-600"
              : "bg-primary/10 text-primary",
          )}
        >
          {getCallIcon()}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage
                  src={call.participant.avatar || "/placeholder.svg"}
                />
                <AvatarFallback className="text-xs">
                  {call.participant.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="truncate text-sm font-medium">
                    {call.participant.name}
                  </h4>
                  <Badge
                    variant="secondary"
                    className={cn("text-xs", getStatusColor())}
                  >
                    {call.status}
                  </Badge>
                </div>
                <p className="truncate text-xs text-muted-foreground">
                  {call.participant.title} at {call.participant.company}
                </p>
              </div>
            </div>

            <div className="flex flex-shrink-0 items-center gap-2">
              <div className="text-right">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {call.duration}
                </div>
                <p className="text-xs text-muted-foreground">
                  {call.timestamp}
                </p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-8 w-8 p-0"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {isExpanded && (
            <div className="mt-4 space-y-4 border-t pt-4">
              {call.recording && (
                <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                  <div className="flex items-center gap-2">
                    <Play className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Call Recording</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Play className="mr-1 h-4 w-4" />
                      Play
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {call.transcription && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-medium">Transcription</h5>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="rounded-lg bg-muted/30 p-3 text-sm leading-relaxed">
                    {call.transcription}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
