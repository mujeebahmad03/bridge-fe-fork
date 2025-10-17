"use client";

import { ArrowLeft, Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { folders } from "@/emails/dashboard/data";
import { useEmailListLogic } from "@/emails/dashboard/hooks/ui";

interface MobileSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSearch({ isOpen, onClose }: MobileSearchProps) {
  const { activeFolder, searchQuery, setSearchQuery } = useEmailListLogic();

  const [localQuery, setLocalQuery] = useState(searchQuery);
  const currentFolder = folders.find((f) => f.id === activeFolder);

  if (!isOpen) return null;

  const handleSearch = () => {
    setSearchQuery(localQuery);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-background">
      <div className="flex items-center gap-2 border-b border-border/50 p-4">
        <Button variant="ghost" size="sm" onClick={onClose}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
          <Input
            placeholder={`Search in ${currentFolder?.name || "Inbox"}`}
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-9"
            autoFocus
          />
        </div>
        <Button onClick={handleSearch} size="sm">
          Search
        </Button>
      </div>
    </div>
  );
}
