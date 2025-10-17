"use client";

import { useState, useRef, useEffect } from "react";
import type { JSX } from "react/jsx-runtime";

import { JsonStringValue } from "./json-string-value";
import { ActionButtons } from "./action-buttons";

import type { JsonValue } from "@/types/leads";

interface JsonPrimitiveNodeProps {
  value: JsonValue;
  path: string;
  keyName?: string;
  onAddColumn?: (path: string, value: JsonValue) => void;
}

export function JsonPrimitiveNode({
  value,
  keyName,
  onAddColumn,
}: JsonPrimitiveNodeProps) {
  const [showAddColumn, setShowAddColumn] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  const renderValue = (value: JsonValue): JSX.Element => {
    if (value === null)
      return <span className="text-muted-foreground">null</span>;
    if (typeof value === "boolean")
      return (
        <span className="text-blue-500 dark:text-blue-400">
          {value.toString()}
        </span>
      );
    if (typeof value === "number")
      return <span className="text-blue-500 dark:text-blue-400">{value}</span>;
    if (typeof value === "string") {
      return <JsonStringValue value={value} />;
    }
    return <></>;
  };

  const handleCopy = () => {
    if (typeof value === "string") {
      navigator.clipboard.writeText(value);
    } else {
      navigator.clipboard.writeText(JSON.stringify(value, null, 2));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (nodeRef.current && !nodeRef.current.contains(event.target as Node)) {
        setShowAddColumn(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex">
      {keyName && (
        <p className="py-1">
          <span className="mr-1 text-primary">&quot;{keyName}&quot;</span>
          <span className="mr-1">:</span>
        </p>
      )}
      <div className="group relative flex flex-wrap items-center" ref={nodeRef}>
        <span className="py-1">{renderValue(value)}</span>

        <ActionButtons
          onCopy={handleCopy}
          onAddToColumn={() => onAddColumn && onAddColumn(keyName!, value)}
        />

        {showAddColumn && (
          <div className="absolute right-0 top-0 z-10 translate-x-full transform rounded-md border border-border bg-popover px-4 py-2 text-popover-foreground shadow-lg">
            <div className="absolute left-0 top-1/2 h-0 w-0 -translate-x-2 -translate-y-1/2 transform border-b-8 border-r-8 border-t-8 border-b-transparent border-r-popover border-t-transparent"></div>
            Add {keyName} as new column
          </div>
        )}
      </div>
    </div>
  );
}
