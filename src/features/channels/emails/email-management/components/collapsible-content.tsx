import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CollapsibleTriggerContentProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isOpen?: boolean;
}

export function CollapsibleTriggerContent({
  icon,
  title,
  description,
  isOpen = false,
}: CollapsibleTriggerContentProps) {
  return (
    <Button
      variant="ghost"
      className="flex h-auto w-full items-center justify-between p-4 text-left hover:bg-muted/50"
      type="button"
    >
      <div className="flex items-center gap-4">
        {icon}
        <div className="space-y-1">
          <h3 className="font-medium">{title}</h3>
          <p className="text-wrap text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
      <ChevronDown
        className={`h-4 w-4 transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </Button>
  );
}
