"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Info,
  CheckCircle,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { DeliverabilitySuggestion } from "@/types/deliverability";
import { cn } from "@/lib/utils";

interface SuggestionsPanelProps {
  suggestions: DeliverabilitySuggestion[];
  className?: string;
}

export function SuggestionsPanel({
  suggestions,
  className,
}: SuggestionsPanelProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentSuggestion = suggestions[currentIndex];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
      case "medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "low":
        return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "high":
        return <AlertTriangle className="h-4 w-4" />;
      case "medium":
        return <Info className="h-4 w-4" />;
      case "low":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const nextSuggestion = () => {
    setCurrentIndex((prev) => (prev + 1) % suggestions.length);
  };

  const prevSuggestion = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + suggestions.length) % suggestions.length,
    );
  };

  if (!currentSuggestion) return null;

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-950/20" />
      <CardHeader className="relative">
        <CardTitle className="flex items-center justify-between">
          <span>Suggestions</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} of {suggestions.length}
            </span>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevSuggestion}
                disabled={suggestions.length <= 1}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={nextSuggestion}
                disabled={suggestions.length <= 1}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex-shrink-0">
              {getImpactIcon(currentSuggestion.impact)}
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="font-semibold text-foreground">
                {currentSuggestion.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {currentSuggestion.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge className={getImpactColor(currentSuggestion.impact)}>
              {currentSuggestion.impact.charAt(0).toUpperCase() +
                currentSuggestion.impact.slice(1)}{" "}
              Impact
            </Badge>
            <Badge variant="outline">{currentSuggestion.category}</Badge>
            {currentSuggestion.actionRequired && (
              <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400">
                Action Required
              </Badge>
            )}
          </div>
        </div>

        {/* Navigation Dots */}
        {suggestions.length > 1 && (
          <div className="flex justify-center gap-2 pt-2">
            {suggestions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition-colors",
                  index === currentIndex
                    ? "bg-blue-600"
                    : "bg-gray-300 dark:bg-gray-600",
                )}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
