"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface NotesSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function NotesSearch({ searchQuery, onSearchChange }: NotesSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
      <Input
        placeholder="Search notes..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}
