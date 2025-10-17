import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TableSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
  placeholder?: string;
  className?: string;
}

export function TableSearch({
  searchQuery,
  onSearchChange,
  onClearSearch,
  placeholder = "Search...",
  className = "max-w-[400px]",
}: TableSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className={`ps-9 ${className} w-full`}
      />
      {searchQuery.length > 0 && (
        <Button
          variant="ghost"
          className="absolute end-1.5 top-1/2 h-6 w-6 -translate-y-1/2"
          onClick={onClearSearch}
        >
          <X />
        </Button>
      )}
    </div>
  );
}
