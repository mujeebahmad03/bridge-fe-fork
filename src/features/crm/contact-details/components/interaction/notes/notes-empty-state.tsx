"use client";

import { FileText } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface NotesEmptyStateProps {
  hasSearchQuery: boolean;
}

export function NotesEmptyState({ hasSearchQuery }: NotesEmptyStateProps) {
  return (
    <Card>
      <CardContent className="p-8 text-center">
        <div className="space-y-2">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground">No notes found</p>
          <p className="text-sm text-muted-foreground">
            {hasSearchQuery
              ? "Try adjusting your search query"
              : "Create your first note to get started"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
