import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { WidgetType } from "@/types/widget";
import { cn } from "@/lib/utils";

interface WidgetSelectorProps {
  onSelect: (type: WidgetType) => void;
  availableWidgets: WidgetType[];
  addedWidgetTypes: Set<WidgetType>;
  children: React.ReactNode;
}

const widgetDetails = {
  email: {
    name: "Email Analytics",
    description: "Track email campaign performance metrics",
    icon: (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-widget-email">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-icon-email"
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      </div>
    ),
  },
  linkedin: {
    name: "LinkedIn Analytics",
    description: "Monitor LinkedIn social media engagement and growth",
    icon: (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-widget-linkedin">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-icon-linkedin"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      </div>
    ),
  },
  calls: {
    name: "Calls Analytics",
    description: "Analyze call metrics and conversation analytics",
    icon: (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-widget-calls">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-icon-calls"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </div>
    ),
  },
  campaign: {
    name: "Campaign Analytics",
    description: "View unified analytics across all channels",
    icon: (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-widget-campaign">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-icon-campaign"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      </div>
    ),
  },
  task: {
    name: "Task Board",
    description: "Monitor, manage and assign various tasks to team members",
    icon: (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-widget-task">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-icon-task"
        >
          <line x1="8" x2="21" y1="6" y2="6" />
          <line x1="8" x2="21" y1="12" y2="12" />
          <line x1="8" x2="21" y1="18" y2="18" />
          <line x1="3" x2="3.01" y1="6" y2="6" />
          <line x1="3" x2="3.01" y1="12" y2="12" />
          <line x1="3" x2="3.01" y1="18" y2="18" />
        </svg>
      </div>
    ),
  },
};

export function WidgetSelector({
  onSelect,
  availableWidgets,
  addedWidgetTypes,
  children,
}: WidgetSelectorProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader className="mb-8 text-left">
          <SheetTitle className="text-2xl font-bold">Add Widgets</SheetTitle>
        </SheetHeader>
        <div className="relative h-full overflow-y-auto py-6">
          <div className="space-y-5">
            {availableWidgets.map((widgetType) => {
              const isAdded = addedWidgetTypes.has(widgetType);

              return (
                <SheetTrigger asChild key={widgetType} disabled={isAdded}>
                  <button
                    className={cn(
                      "flex w-full animate-scale-in items-start gap-4 rounded-lg bg-card p-5 text-left transition-colors hover:bg-accent dark:border dark:border-border",
                      {
                        "cursor-not-allowed opacity-50": isAdded,
                      },
                    )}
                    onClick={() => !isAdded && onSelect(widgetType)}
                    disabled={isAdded}
                  >
                    {widgetDetails[widgetType].icon}
                    <div className="flex-1">
                      <h3 className="mb-1 text-lg font-medium">
                        {widgetDetails[widgetType].name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {widgetDetails[widgetType].description}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground/70">
                        5 metrics available
                      </p>
                    </div>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background">
                      {isAdded ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-muted-foreground"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-muted-foreground"
                        >
                          <path d="M5 12h14" />
                          <path d="M12 5v14" />
                        </svg>
                      )}
                    </span>
                  </button>
                </SheetTrigger>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
