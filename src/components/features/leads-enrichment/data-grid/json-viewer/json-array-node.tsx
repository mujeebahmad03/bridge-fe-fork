"use client";

import { ChevronDown, ChevronRight, Copy } from "lucide-react";

import { JsonNode } from "./json-node";

import { getItemCount } from "@/lib/utils";
import type { JsonArray, JsonValue } from "@/types/leads";

interface JsonArrayNodeProps {
  value: JsonArray;
  isExpanded: boolean;
  onToggle: () => void;
  path: string;
  keyName?: string;
  onAddColumn?: (path: string, value: JsonValue) => void;
}

export function JsonArrayNode({
  value,
  isExpanded,
  onToggle,
  path,
  keyName,
  onAddColumn,
}: JsonArrayNodeProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(value, null, 2));
  };
  console.log({ value, path, keyName });

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
            <span className="mr-1 text-primary">&quot;{keyName}&quot;</span>
            <span className="mr-1">:</span>
          </>
        )}

        <span>
          {"["}
          {!isExpanded && "..."}
          {!isExpanded && "]"}
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
          {value.map((item, index) => (
            <div key={index} className="ml-2">
              <JsonNode
                value={item}
                path={`${path}[${index}]`}
                keyName={index.toString()}
                onAddColumn={onAddColumn}
              />
            </div>
          ))}
          <div className="relative ml-2">
            <div className="absolute left-[-7px] top-1/2 h-px w-[7px] bg-border"></div>
            {"]"}
          </div>
        </div>
      )}
    </div>
  );
}
