"use client";

import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useMessaging } from "@/linkedin/dashboard/hooks/client";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  placeholder = "Search...",
  className,
}: SearchBarProps) {
  const { searchQuery, setSearchQuery } = useMessaging();

  return (
    <div className={cn("relative", className)}>
      {/* Search icon (left) */}
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      {/* Input field */}
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        className="pl-10 pr-10"
      />

      {/* Clear (X) button */}
      {searchQuery && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setSearchQuery("")}
          className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 p-0 text-muted-foreground"
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}
