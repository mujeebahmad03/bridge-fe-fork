"use client";

import { ChevronDown, ChevronRight, Copy } from "lucide-react";

import { JsonNode } from "./json-node";

import { getItemCount } from "@/lib/utils";
import type { JsonObject, JsonValue } from "@/types/leads";

interface JsonObjectNodeProps {
  value: JsonObject;
  isExpanded: boolean;
  onToggle: () => void;
  path: string;
  keyName?: string;
  onAddColumn?: (path: string, value: JsonValue) => void;
}

export function JsonObjectNode({
  value,
  isExpanded,
  onToggle,
  path,
  keyName,
  onAddColumn,
}: JsonObjectNodeProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(value, null, 2));
  };

  return (
    <div>
      <div className="flex items-start">
        <button
          onClick={onToggle}
          className="mr-1 mt-0.5 text-muted-foreground transition-colors hover:text-foreground"
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>

        {keyName && (
          <>
            <span className="mr-1 text-xs text-primary">
              &quot;{keyName}&quot;
            </span>
            <span className="mr-1 text-xs">:</span>
          </>
        )}

        <span>
          {"{"}
          {!isExpanded && "..."}
          {!isExpanded && "}"}
        </span>

        {!isExpanded && (
          <span className="ml-2 text-sm text-muted-foreground">
            {getItemCount(value)} items
          </span>
        )}

        <div className="group relative inline-flex items-center">
          {!isExpanded && (
            <button
              onClick={handleCopy}
              className="invisible ml-2 text-muted-foreground transition-colors hover:text-foreground group-hover:visible"
            >
              <Copy className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="relative">
          {/* Guide line */}
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-border"></div>

          <div className="ml-4 text-sm text-muted-foreground">
            {getItemCount(value)} items
          </div>
          {Object.entries(value).map(([key, val]) => (
            <div key={key} className="flex items-start">
              <div className="flex-grow">
                <div className="flex items-start">
                  <JsonNode
                    value={val}
                    path={path ? `${path}.${key}` : key}
                    keyName={key}
                    onAddColumn={onAddColumn}
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="relative ml-2">
            <div className="absolute left-[-7px] top-1/2 h-px w-[7px] bg-border"></div>
            {"}"}
          </div>
        </div>
      )}
    </div>
  );
}
