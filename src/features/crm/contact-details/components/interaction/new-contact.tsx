import { Button } from "@/components/ui";
import { Card } from "@/components/ui/card";
import { MoreVertical } from "lucide-react";

interface NewContactProps {
  title: string;
  description?: string;
  isNote?: boolean;
}

export const NewContact = ({ title, description, isNote }: NewContactProps) => {
  return (
    <Card className="w-full border-0 shadow-none">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-foreground">{title}</h3>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">13 days ago</p>

          <div className={`${isNote ? "rounded-lg bg-muted/30 p-4" : ""} mt-3`}>
            <p className="text-xs text-foreground">{description}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};
