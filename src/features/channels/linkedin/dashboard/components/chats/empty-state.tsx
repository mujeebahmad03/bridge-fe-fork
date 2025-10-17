import { cn } from "@/lib/utils";

interface EmptyStateViewProps {
  className?: string;
}

export function EmptyStateView({ className = "" }: EmptyStateViewProps) {
  return (
    <div
      className={cn(
        "flex flex-1 items-center justify-center bg-muted/20",
        className,
      )}
    >
      <div className="text-center">
        <h3 className="mb-2 text-lg font-semibold text-foreground">
          Select a conversation
        </h3>
        <p className="text-muted-foreground">
          Choose a conversation from the sidebar to start messaging
        </p>
      </div>
    </div>
  );
}
