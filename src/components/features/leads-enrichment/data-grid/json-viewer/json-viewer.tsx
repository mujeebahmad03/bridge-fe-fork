"use client";

import { Play, LayoutList } from "lucide-react";

import { JsonNode } from "./json-node";
import { Button } from "@/components/ui";

import type { JsonValue } from "@/types/leads";

interface JsonViewerProps {
  data: JsonValue;
  title: string;
  subtitle: string;
}

export default function JsonViewer({ data, title, subtitle }: JsonViewerProps) {
  return (
    <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-xl border border-border bg-background shadow-sm">
      <div className="flex items-center justify-between border-b border-border p-4">
        <div>
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
          <h2 className="text-muted-foreground">{subtitle}</h2>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-md"
          >
            <LayoutList className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            className="h-10 w-10 rounded-md bg-primary hover:bg-primary/90"
          >
            <Play className="h-5 w-5 text-primary-foreground" />
          </Button>
        </div>
      </div>
      <div className="max-h-[80vh] overflow-auto p-4">
        <JsonNode value={data} isRoot={true} path="" />
      </div>
      <div className="border-t border-border p-2">
        <div className="flex items-center text-primary">
          <span className="mr-2 rounded-md bg-primary px-2 py-0.5 text-sm text-primary-foreground">
            1
          </span>
        </div>
      </div>
    </div>
  );
}
