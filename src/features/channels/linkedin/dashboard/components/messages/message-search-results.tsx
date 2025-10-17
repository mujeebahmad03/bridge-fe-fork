"use client";

import { X } from "lucide-react";
import type { Message } from "@/linkedin/dashboard/types";

interface MessageSearchResultsProps {
  results: Message[];
  query: string;
  onClose: () => void;
}

export function MessageSearchResults({
  results,
  query,
  onClose,
}: MessageSearchResultsProps) {
  const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark
          key={index}
          className="rounded bg-yellow-200 px-1 dark:bg-yellow-800"
        >
          {part}
        </mark>
      ) : (
        part
      ),
    );
  };

  return (
    <div className="border-b border-border bg-muted/30">
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-medium text-foreground">
            {results.length} result{results.length !== 1 ? "s" : ""} for &quot;
            {query}&quot;
          </h3>
          <button onClick={onClose} className="rounded-md p-1 hover:bg-muted">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <div className="max-h-40 space-y-2 overflow-y-auto">
          {results.length === 0 ? (
            <p className="text-sm text-muted-foreground">No messages found</p>
          ) : (
            results.map((message) => (
              <div
                key={message.id}
                className="cursor-pointer rounded-lg bg-background p-2 hover:bg-muted/50"
              >
                <div className="flex items-start gap-2">
                  <div className="text-xs text-muted-foreground">
                    {message.timestamp}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm">
                      <span className="font-medium text-foreground">
                        {message.sender === "user" ? "You" : "Contact"}:
                      </span>{" "}
                      {highlightText(message.content, query)}
                    </div>
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-1 text-xs text-muted-foreground">
                        📎{" "}
                        {message.attachments
                          .map((att) => highlightText(att.name, query))
                          .join(", ")}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
