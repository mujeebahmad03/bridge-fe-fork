import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RiBardFill } from "@remixicon/react";

interface EmptySuggestionCardProps {
  onRequestSuggestions: () => void;
}

export const EmptySuggestionCard = ({
  onRequestSuggestions,
}: EmptySuggestionCardProps) => {
  return (
    <Card className="w-full border-0 shadow-none">
      <div className="flex gap-3">
        <div className="flex-1">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-sm font-medium text-foreground">
                No new suggestions
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Based on your recent activity
              </p>
            </div>
            <Button variant="ghost" size="icon" className="-mr-2 h-8 w-8">
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>

          <div className="relative flex min-h-[200px] w-full items-center justify-center rounded-xl blur-md">
            <div className="absolute inset-0 flex flex-col gap-3 p-3">
              <div className="h-4 w-3/4 rounded bg-purple-100 dark:bg-purple-500" />
              <div className="h-4 w-full rounded bg-purple-100" />
              <div className="h-4 w-2/3 rounded bg-purple-100" />
              <div className="h-4 w-1/2 rounded bg-purple-100" />
            </div>

            <div className="relative top-0 z-10 w-full space-y-4 rounded-lg p-6 text-center backdrop-blur-sm">
              <p className="text-xs text-foreground">
                Hang tight! Suggestions will appear here when new activity is
                detected.
              </p>
              <Button
                onClick={onRequestSuggestions}
                className="gap-2 bg-purple-500 text-xs hover:bg-purple-600"
              >
                <RiBardFill className="h-4 w-4" />
                Request suggestions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
