import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RiBardFill } from "@remixicon/react";

interface EmptyInsightCardProps {
  onRequestInsights: () => void;
}

export const EmptyInsightCard = ({
  onRequestInsights,
}: EmptyInsightCardProps) => {
  return (
    <Card className="w-full border-0 shadow-none">
      <div className="flex gap-3">
        <div className="flex-1">
          <div className="relative flex min-h-[190px] w-full items-center justify-center rounded-xl blur-md">
            <div className="absolute inset-0 flex flex-col gap-3 p-3">
              <div className="h-5 w-3/4 rounded bg-purple-100 dark:bg-purple-500" />
              <div className="h-5 w-full rounded bg-purple-100 dark:bg-purple-500" />
              <div className="h-5 w-2/3 rounded bg-purple-100 dark:bg-purple-500" />
            </div>

            <div className="relative top-0 z-10 w-full space-y-4 rounded-lg p-3 text-center backdrop-blur-sm">
              <p className="text-xs text-foreground">
                Get contact details using AI.
              </p>
              <Button
                onClick={onRequestInsights}
                size={"sm"}
                className="gap-2 bg-purple-500 text-xs hover:bg-purple-600"
              >
                <RiBardFill className="h-2 w-2" />
                Request Insights
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
