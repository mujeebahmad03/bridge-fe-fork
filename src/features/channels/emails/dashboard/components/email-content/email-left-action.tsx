import { Archive, ArchiveX, Clock, Trash2 } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatedActionButton } from "./action-button";

export function EmailLeftActions() {
  const leftActions = [
    { icon: Archive, tooltip: "Archive", delay: 0 },
    { icon: ArchiveX, tooltip: "Move to Junk", delay: 0.05 },
    { icon: Trash2, tooltip: "Move to Trash", delay: 0.1 },
    { icon: Clock, tooltip: "Snooze", delay: 0.15 },
  ];

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        {leftActions.map(({ icon, tooltip, delay }) => (
          <AnimatedActionButton
            key={tooltip}
            icon={icon}
            tooltip={tooltip}
            delay={0.2 + delay}
          />
        ))}
      </TooltipProvider>
    </div>
  );
}
