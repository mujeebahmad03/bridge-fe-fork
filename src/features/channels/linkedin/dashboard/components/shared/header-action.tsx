import { MoreHorizontal, Search } from "lucide-react";

import { Button } from "@/components/ui";

import { cn } from "@/lib/utils";

interface HeaderActionsProps {
  showMessageSearch: boolean;
  onSearchToggle: () => void;
}

export function HeaderActions({
  showMessageSearch,
  onSearchToggle,
}: HeaderActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={onSearchToggle}
        className={cn(showMessageSearch && "bg-muted text-primary")}
        title="Search messages"
      >
        <Search className="h-5 w-5" />
      </Button>

      <Button variant="ghost" size="icon" title="More options">
        <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
      </Button>
    </div>
  );
}
