import { LayoutGrid } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PanelToggleProps {
  onToggleFloatingMode: () => void;
  isFloatingMode: boolean;
}

export function PanelToggleButton({
  onToggleFloatingMode,
  isFloatingMode,
}: PanelToggleProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleFloatingMode}
            className={`border-border hover:bg-muted ${
              isFloatingMode
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : ""
            }`}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="border bg-popover text-popover-foreground">
          <p>
            {isFloatingMode ? "Exit floating mode" : "Enable floating mode"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
