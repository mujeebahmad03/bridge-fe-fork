"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ActivityChange {
  field: string;
  from?: string;
  to: string;
}

interface Activity {
  id: number;
  type: string;
  title: string;
  description: string;
  user: string;
  timestamp: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  changes: ActivityChange[];
  tags?: string[];
}

interface ActivityCardProps {
  activity: Activity;
  index: number;
}

export function ActivityCard({ activity, index }: ActivityCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = activity.icon;

  return (
    <Card
      className="group animate-fade-in border-l-4 transition-all duration-200 hover:shadow-md"
      style={{
        animationDelay: `${index * 100}ms`,
        borderLeftColor: `var(--${activity.color.split("-")[1]}-500)`,
      }}
    >
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-start gap-3 sm:gap-4">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg sm:h-10 sm:w-10 ${activity.bgColor} flex-shrink-0`}
          >
            <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${activity.color}`} />
          </div>

          <div className="min-w-0 flex-1 space-y-2">
            <div className="space-y-2 sm:space-y-1">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${activity.color.replace("text-", "bg-")} flex-shrink-0`}
                    />
                    <span className="truncate text-sm font-medium">
                      {activity.user}
                    </span>
                    <span className="break-words text-sm text-muted-foreground">
                      {activity.title}
                    </span>
                  </div>
                  <p className="break-words text-sm leading-relaxed text-muted-foreground">
                    {activity.description}
                  </p>
                </div>
                <span className="flex-shrink-0 self-start text-xs text-muted-foreground">
                  {activity.timestamp}
                </span>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
            >
              {isExpanded ? (
                <ChevronUp className="mr-1 h-3 w-3" />
              ) : (
                <ChevronDown className="mr-1 h-3 w-3" />
              )}
              Show changes
            </Button>

            {isExpanded && (
              <div className="mt-3 animate-fade-in space-y-2 rounded-lg bg-muted/50 p-3">
                <div className="space-y-2">
                  {activity.changes.map((change, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:justify-between sm:gap-2"
                    >
                      <span className="flex-shrink-0 font-medium">
                        {change.field}:
                      </span>
                      <div className="flex min-w-0 items-center gap-2">
                        {change.from && (
                          <>
                            <span className="truncate text-muted-foreground line-through">
                              {change.from}
                            </span>
                            <span className="flex-shrink-0 text-muted-foreground">
                              →
                            </span>
                          </>
                        )}
                        <span className="break-words font-medium text-foreground">
                          {change.to}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {activity.tags && (
                  <div className="mt-3 border-t border-border pt-2">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <span className="flex-shrink-0 text-xs text-muted-foreground">
                        Tags:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {activity.tags.map((tag, tagIdx) => (
                          <Badge
                            key={tagIdx}
                            variant="secondary"
                            className="px-2 py-0.5 text-xs"
                            style={{
                              backgroundColor:
                                tagIdx === 0
                                  ? "#dcfce7"
                                  : tagIdx === 1
                                    ? "#dbeafe"
                                    : "#fce7f3",
                              color:
                                tagIdx === 0
                                  ? "#166534"
                                  : tagIdx === 1
                                    ? "#1e40af"
                                    : "#be185d",
                            }}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
