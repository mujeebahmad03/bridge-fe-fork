import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MoreVertical } from "lucide-react";

interface SuggestionCardProps {
  title: string;
  description: string;
  badge?: string;
  badgeVariant?:
    | "default"
    | "destructive"
    | "secondary"
    | "outline"
    | "success"
    | null
    | undefined;
  onGenerateEmail: () => void;
  onRemindLater: () => void;
  onMarkDone: () => void;
  onDismiss: () => void;
}

export const SuggestionCard = ({
  title,
  description,
  badge,
  badgeVariant = "destructive",
  onGenerateEmail,
  onRemindLater,
  onMarkDone,
  onDismiss,
}: SuggestionCardProps) => {
  return (
    <Card className="border-0 border-none shadow-none">
      <div className="flex gap-3">
        <div className="flex-1">
          <div className="mb-2 flex items-center justify-between">
            <div className="">
              <div className="mb-1 flex items-center gap-2">
                <h3 className="text-sm font-medium text-foreground">
                  1 new suggestion
                </h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Based on your recent activity
              </p>
            </div>

            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4 text-foreground" />
            </Button>
          </div>

          <div className="mt-3 rounded-md bg-muted/50 p-3">
            <div className="mb-2 flex items-start justify-between">
              <h4 className="text-sm font-medium text-foreground">{title}</h4>
              {badge && (
                <Badge variant={badgeVariant} className="text-xs">
                  {badge}
                </Badge>
              )}
            </div>
            <p className="mb-3 text-xs text-muted-foreground">{description}</p>

            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={onGenerateEmail}>
                Generate email
              </Button>
              <Button size="sm" variant="outline" onClick={onRemindLater}>
                Remind me later
              </Button>
              <Button size="sm" variant="outline" onClick={onMarkDone}>
                Mark as done
              </Button>
              <Button size="sm" variant="ghost" onClick={onDismiss}>
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
