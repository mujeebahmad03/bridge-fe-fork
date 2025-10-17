import { MoreVertical } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmailListItemProps {
  email: {
    id: number;
    company: string;
    subject: string;
    time: string;
    read: boolean;
  };
  isSelected: boolean;
  onSelect: (emailId: number) => void;
}

export function EmailListItem({
  email,
  isSelected,
  onSelect,
}: EmailListItemProps) {
  return (
    <div
      className={cn(
        "flex cursor-pointer items-start gap-3 border-b border-border/20 p-4 transition-colors hover:bg-muted/50",
        isSelected && "bg-muted/30",
      )}
      onClick={() => onSelect(email.id)}
    >
      {/* Checkbox */}
      <Checkbox
        checked={isSelected}
        onCheckedChange={() => onSelect(email.id)}
        onClick={(e) => e.stopPropagation()}
        className="mt-1 flex-shrink-0"
      />

      {/* Content */}
      <div className="min-w-0 flex-1 space-y-1">
        {/* Company name and time on mobile */}
        <div className="flex items-center justify-between gap-2">
          <div
            className={cn(
              "truncate text-sm font-medium",
              !email.read ? "text-primary" : "text-foreground",
            )}
          >
            {email.company}
          </div>
          <div className="flex-shrink-0 whitespace-nowrap text-xs text-muted-foreground">
            {email.time}
          </div>
        </div>

        {/* Subject */}
        <div className="line-clamp-2 text-sm text-muted-foreground md:line-clamp-1">
          {email.subject}
        </div>
      </div>

      {/* Actions menu for mobile */}
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 flex-shrink-0 p-0 md:hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <MoreVertical className="h-4 w-4" />
      </Button>
    </div>
  );
}
