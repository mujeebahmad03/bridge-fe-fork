import { Checkbox } from "@/components/ui/checkbox";

interface EmailListHeaderProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
}

export function EmailListHeader({
  selectedCount,
  totalCount,
  onSelectAll,
}: EmailListHeaderProps) {
  return (
    <div className="hidden items-center gap-4 border-b border-border/40 px-4 py-3 text-sm text-muted-foreground md:flex">
      <Checkbox
        checked={selectedCount === totalCount}
        onCheckedChange={onSelectAll}
        className="flex-shrink-0"
      />
      <div className="min-w-0 flex-1">From</div>
      <div className="w-32 flex-shrink-0 text-right">Time</div>
      <div className="w-8 flex-shrink-0"></div>
    </div>
  );
}
