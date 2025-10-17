"use client";

import { useState, useEffect, useRef } from "react";
import { Search, ChevronUp, ChevronDown, X } from "lucide-react";

import { useDataGrid } from "../data-grid-context";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";

import type { SearchMatch } from "@/types/leads";

export function SearchPanel() {
  const { columns, data, setSearchState } = useDataGrid();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState<SearchMatch[]>([]);
  const [activeMatchIndex, setActiveMatchIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Update search state when any of the search parameters change
  useEffect(() => {
    setSearchState({
      query,
      matches,
      activeMatchIndex: activeMatchIndex >= 0 ? activeMatchIndex : -1,
    });
  }, [query, matches, activeMatchIndex, setSearchState]);

  // Find all matches when query changes
  useEffect(() => {
    if (!query) {
      setMatches([]);
      setActiveMatchIndex(-1);
      return;
    }

    const newMatches: SearchMatch[] = [];

    data.forEach((row) => {
      columns
        .filter((col) => !col.hidden)
        .forEach((column) => {
          const value = row[column.id];
          if (!value) return;

          // Use a regex to find all matches
          const regex = new RegExp(query, "gi");
          let match;

          while ((match = regex.exec(value)) !== null) {
            newMatches.push({
              rowId: row.id,
              columnId: column.id,
              value: match[0],
              index: match.index,
            });
          }
        });
    });

    setMatches(newMatches);
    setActiveMatchIndex(newMatches.length > 0 ? 0 : -1);
  }, [query, data, columns]);

  const navigateMatch = (direction: "next" | "previous") => {
    if (matches.length === 0) return;

    let newIndex = activeMatchIndex;
    if (direction === "next") {
      newIndex = newIndex + 1 >= matches.length ? 0 : newIndex + 1;
    } else {
      newIndex = newIndex - 1 < 0 ? matches.length - 1 : newIndex - 1;
    }

    setActiveMatchIndex(newIndex);
    scrollToMatch(matches[newIndex]);
  };

  const scrollToMatch = (match: SearchMatch) => {
    const cell = document.querySelector(
      `[data-row-id="${match.rowId}"][data-column-id="${match.columnId}"]`,
    );
    if (cell) {
      cell.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  };

  const closeSearch = () => {
    setIsOpen(false);
    setQuery("");
    setMatches([]);
    setActiveMatchIndex(-1);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Search className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom">Search</TooltipContent>
      </Tooltip>

      <PopoverContent className="w-[400px] p-0" align="start">
        <div className="flex items-center gap-2 p-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-primary pl-8 focus-visible:ring-primary"
              placeholder="Search..."
            />
          </div>
          <div className="flex min-w-[100px] items-center gap-1">
            <span className="text-sm text-muted-foreground">
              {matches.length > 0
                ? `${activeMatchIndex + 1} of ${matches.length}`
                : "0 of 0"}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled={matches.length === 0}
              onClick={() => navigateMatch("previous")}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled={matches.length === 0}
              onClick={() => navigateMatch("next")}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={closeSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
