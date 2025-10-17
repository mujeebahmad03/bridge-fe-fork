import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export function ConversationSidebarSkeleton({ className }: Props) {
  return (
    <div
      className={cn("flex flex-col border-r border-border bg-card", className)}
    >
      {/* Header skeleton */}
      <div className="space-y-4 border-b border-border p-4">
        <Skeleton className="h-6 w-32" /> {/* Title */}
        <Skeleton className="h-8 w-full rounded-md" /> {/* Tabs */}
        <Skeleton className="h-9 w-full rounded-md" /> {/* Search */}
      </div>

      {/* Conversation items skeleton */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="flex gap-3 px-2 py-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/5" />
                <Skeleton className="h-3 w-4/5" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
