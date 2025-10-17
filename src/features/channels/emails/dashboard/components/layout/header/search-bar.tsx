"use client";

import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { AnimatedButton } from "@/emails/dashboard/components/shared";

import { useEmailListLogic } from "@/emails/dashboard/hooks/ui";
import type { SearchBarProps } from "@/emails/dashboard/types";

export function SearchBar({
  onSearchToggle,
  placeholder = "Search",
}: SearchBarProps) {
  const { searchQuery, onSearchChange } = useEmailListLogic();

  return (
    <div className="max-w-md flex-1">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
        <Input
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 pr-9"
          autoFocus
        />
        {onSearchToggle && (
          <AnimatedButton
            onClick={onSearchToggle}
            className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 transform p-0"
          >
            <X className="h-3 w-3" />
          </AnimatedButton>
        )}
      </div>
    </div>
  );
}
