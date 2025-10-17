"use client";

import { CheckIcon, ChevronDownIcon, SearchIcon, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterPopoverProps {
  title: string;
  options: FilterOption[];
  selectedIds: string[];
  onChange: (selectedIds: string[]) => void;
  className?: string;
}

export function FilterPopover({
  title,
  options,
  selectedIds,
  onChange,
  className,
}: FilterPopoverProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleClearFilter = () => {
    onChange(["all"]);
    setIsOpen(false);
  };

  const handleToggleOption = (id: string) => {
    if (id === "all") {
      onChange(["all"]);
      return;
    }

    const newSelectedIds = selectedIds.includes(id)
      ? selectedIds.filter((selectedId) => selectedId !== id)
      : [...selectedIds.filter((sid) => sid !== "all"), id];

    onChange(newSelectedIds.length ? newSelectedIds : ["all"]);
  };

  const isAllSelected = selectedIds.includes("all");
  const selectedCount = isAllSelected ? 0 : selectedIds.length;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-9 justify-start border-dashed px-3",
            selectedCount > 0 &&
              "border-primary bg-primary/10 text-primary hover:bg-primary/20",
            className,
          )}
        >
          {title}: {isAllSelected ? "All" : `${selectedCount} selected`}
          <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0" align="start">
        <div className="border-b p-2">
          <div className="flex items-center gap-2 rounded-md border px-2">
            <SearchIcon className="h-4 w-4 opacity-50" />
            <Input
              placeholder={`Search ${title.toLowerCase()}...`}
              className="h-8 flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Clear</span>
              </Button>
            )}
          </div>
        </div>
        <div className="max-h-[300px] overflow-auto p-1">
          <div
            role="button"
            className={cn(
              "flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
              isAllSelected && "bg-accent text-accent-foreground",
            )}
            onClick={() => handleToggleOption("all")}
          >
            <div className="mr-2 flex h-4 w-4 items-center justify-center rounded-sm border">
              {isAllSelected && <CheckIcon className="h-3 w-3" />}
            </div>
            <span>All</span>
          </div>
          {filteredOptions.map((option) => (
            <div
              key={option.id}
              role="button"
              className={cn(
                "flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                selectedIds.includes(option.id) &&
                  !isAllSelected &&
                  "bg-accent text-accent-foreground",
              )}
              onClick={() => handleToggleOption(option.id)}
            >
              <div className="mr-2 flex h-4 w-4 items-center justify-center rounded-sm border">
                {selectedIds.includes(option.id) && !isAllSelected && (
                  <CheckIcon className="h-3 w-3" />
                )}
              </div>
              <span>{option.label}</span>
              {option.count !== undefined && (
                <span className="ml-auto text-xs text-muted-foreground">
                  {option.count}
                </span>
              )}
            </div>
          ))}
          {filteredOptions.length === 0 && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </div>
          )}
        </div>
        {selectedCount > 0 && (
          <div className="border-t p-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-center text-xs"
              onClick={handleClearFilter}
            >
              Clear filter
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
