import { Search, X } from "lucide-react";

import { Button, Input } from "@/components/ui";
import { useMessaging } from "@/linkedin/dashboard/hooks/client";

interface MessageSearchInputProps {
  onSearchClose: () => void;
}

export function MessageSearchInput({ onSearchClose }: MessageSearchInputProps) {
  const { messageSearchQuery, setMessageSearchQuery } = useMessaging();

  return (
    <div className="relative mt-4">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
      <Input
        autoFocus
        placeholder="Search in this conversation..."
        value={messageSearchQuery}
        onChange={(e) => setMessageSearchQuery(e.target.value)}
        className="pl-10 pr-10"
      />
      {messageSearchQuery && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onSearchClose}
          className="absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 transform p-1"
          title="Clear search"
        >
          <X className="h-3 w-3 text-muted-foreground" />
        </Button>
      )}
    </div>
  );
}
