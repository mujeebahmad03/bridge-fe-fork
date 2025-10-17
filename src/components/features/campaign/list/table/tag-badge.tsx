import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface TagBadgeProps {
  name: string;
  onRemove?: () => void;
  className?: string;
}

export function TagBadge({ name, onRemove, className }: TagBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex animate-fade-in items-center gap-1 rounded-md bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300",
        className,
      )}
    >
      {name}
      {onRemove && (
        <button
          onClick={onRemove}
          className="rounded-full p-0.5 hover:bg-blue-200 dark:hover:bg-blue-800"
          aria-label={`Remove ${name} tag`}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
}

export function TagBadgeList({
  tags,
  limit = 1,
}: {
  tags: string[];
  limit?: number;
}) {
  if (!tags.length) return <span className="text-muted-foreground">-</span>;

  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.slice(0, limit).map((tag) => (
        <TagBadge key={tag} name={tag} />
      ))}
      {tags.length > limit && (
        <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
          +{tags.length - limit}
        </span>
      )}
    </div>
  );
}
