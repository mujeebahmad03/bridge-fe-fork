import { Video } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CalendarEventProps {
  title: string;
  timeAgo: string;
  meetingTitle: string;
  dateTime: string;
  month: string;
  day: string;
  onJoin?: () => void;
  meetingInfo?: string;
}

export const CalendarEvent = ({
  title,
  timeAgo,
  meetingTitle,
  dateTime,
  month,
  day,
  onJoin,
  meetingInfo,
}: CalendarEventProps) => {
  return (
    <Card className="w-full border-0 shadow-none">
      <div className="flex gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-sm font-medium text-foreground">{title}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{timeAgo}</p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-lg bg-muted/30 p-3">
            <div className="w-12 flex-shrink-0 overflow-hidden rounded border border-border pb-1 text-center">
              <div className="bg-destructive pt-1 text-[10px] font-medium uppercase tracking-wide text-white">
                {month}
              </div>
              <div className="py-1 text-xl leading-none">{day}</div>
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-semibold text-foreground">
                {meetingTitle}
              </h4>
              <p className="mt-1 text-xs text-muted-foreground">{dateTime}</p>
              <p className="mt-3 text-xs font-light italic">{meetingInfo}</p>
            </div>

            {onJoin && (
              <Button
                variant="outline"
                size="sm"
                onClick={onJoin}
                className="flex-shrink-0 gap-2"
              >
                <Video className="h-4 w-4" />
                Join
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
