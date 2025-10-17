import { Badge } from "@/components/ui/badge";

export function DashboardHeader() {
  return (
    <div className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <Badge
          variant="default"
          className="bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          LinkedIn Performance
        </Badge>
        <div className="w-16" /> {/* Spacer for centering */}
      </div>
    </div>
  );
}
