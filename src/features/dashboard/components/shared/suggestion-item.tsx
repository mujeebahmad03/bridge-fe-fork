"use client";

import { motion } from "framer-motion";
import { Phone, Mail, Linkedin, Copy, Edit } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { Suggestion } from "@/dashboard/types";

interface SuggestionItemProps {
  suggestion: Suggestion;
}

export function SuggestionItem({ suggestion }: SuggestionItemProps) {
  const getTypeIcon = () => {
    switch (suggestion.type) {
      case "call":
        return <Phone className="h-4 w-4" />;
      case "email":
        return <Mail className="h-4 w-4" />;
      case "linkedin":
        return <Linkedin className="h-4 w-4" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  const getTypeColor = () => {
    switch (suggestion.type) {
      case "call":
        return "bg-green-100 text-green-700";
      case "email":
        return "bg-blue-100 text-blue-700";
      case "linkedin":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="rounded-lg border border-border bg-background p-4 transition-colors hover:bg-muted/50"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${getTypeColor()}`}
            >
              {getTypeIcon()}
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground">
                {suggestion.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                To: {suggestion.recipient}
              </p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {suggestion.campaign}
          </Badge>
        </div>

        <div className="rounded-md bg-muted/50 p-3">
          <p className="line-clamp-3 text-xs text-muted-foreground">
            {suggestion.preview}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              className="h-7 bg-transparent text-xs"
            >
              <Copy className="mr-1 h-3 w-3" />
              Copy
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-7 bg-transparent text-xs"
            >
              <Edit className="mr-1 h-3 w-3" />
              Edit
            </Button>
          </div>
          <Button
            size="sm"
            className="h-7 bg-primary text-xs hover:bg-primary/90"
          >
            Use Template
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
