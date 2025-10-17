"use client";

import { useState } from "react";

import { JsonObjectNode } from "./json-object-node";
import { JsonArrayNode } from "./json-array-node";
import { JsonPrimitiveNode } from "./json-primitive-node";

import { cn } from "@/lib/utils";
import type { JsonValue, JsonObject, JsonArray } from "@/types/leads";

interface JsonNodeProps {
  value: JsonValue;
  isRoot?: boolean;
  path: string;
  keyName?: string;
  onAddColumn?: (path: string, value: JsonValue) => void;
}

export function JsonNode({
  value,
  isRoot = false,
  path,
  keyName,
  onAddColumn,
}: JsonNodeProps) {
  const [isExpanded, setIsExpanded] = useState(isRoot);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const isObject = value !== null && typeof value === "object";
  const isArray = Array.isArray(value);

  return (
    <div className={cn("relative", keyName && "ml-6")}>
      {isObject ? (
        isArray ? (
          <JsonArrayNode
            value={value as JsonArray}
            isExpanded={isExpanded}
            onToggle={handleToggle}
            path={path}
            keyName={keyName}
            onAddColumn={onAddColumn}
          />
        ) : (
          <JsonObjectNode
            value={value as JsonObject}
            isExpanded={isExpanded}
            onToggle={handleToggle}
            path={path}
            keyName={keyName}
            onAddColumn={onAddColumn}
          />
        )
      ) : (
        <JsonPrimitiveNode
          value={value}
          path={path}
          keyName={keyName}
          onAddColumn={onAddColumn}
        />
      )}
    </div>
  );
}
