import { Badge, Button, Card } from "@/components/ui";
import { MoreVertical } from "lucide-react";
import React from "react";

const campaigns = [
  {
    id: "1",
    status: "in_progress",
    name: "Q4 Product Launch Campaign",
    leadsCompleted: 1250,
    leadsTotal: 2000,
    sender: "sales@company.com",
    tags: ["product", "launch", "q4"],
    createdAt: "2024-10-01",
    creator: "Sarah Johnson",
  },
  {
    id: "2",
    status: "completed",
    name: "Summer Promotion 2024",
    leadsCompleted: 3500,
    leadsTotal: 3500,
    sender: "marketing@company.com",
    tags: ["promotion", "summer"],
    createdAt: "2024-06-15",
    creator: "Mike Chen",
  },
  {
    id: "3",
    status: "draft",
    name: "Holiday Season Campaign",
    leadsCompleted: 0,
    leadsTotal: 5000,
    sender: null,
    tags: ["holiday", "seasonal"],
    createdAt: "2024-10-10",
    creator: "Emma Davis",
  },
  {
    id: "4",
    status: "paused",
    name: "Enterprise Outreach",
    leadsCompleted: 450,
    leadsTotal: 1000,
    sender: "enterprise@company.com",
    tags: ["enterprise", "b2b"],
    createdAt: "2024-09-20",
    creator: "John Smith",
  },
  {
    id: "5",
    status: "in_error",
    name: "Newsletter Blast",
    leadsCompleted: 200,
    leadsTotal: 2500,
    sender: "newsletter@company.com",
    tags: ["newsletter"],
    createdAt: "2024-10-05",
    creator: "Lisa Wong",
  },
  {
    id: "6",
    status: "archived",
    name: "Spring Campaign 2024",
    leadsCompleted: 2800,
    leadsTotal: 2800,
    sender: "marketing@company.com",
    tags: ["spring", "archived"],
    createdAt: "2024-03-01",
    creator: "Mike Chen",
  },
];

const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  in_progress: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  paused: "bg-yellow-100 text-yellow-700",
  in_error: "bg-red-100 text-red-700",
  archived: "bg-gray-200 text-gray-600",
};

const CampaignInterface = () => {
  return (
    <div className="space-y-4 p-6">
      <h2 className="mb-4 text-2xl font-semibold">Campaigns</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((c) => {
          const progress = Math.round((c.leadsCompleted / c.leadsTotal) * 100);
          const formattedDate = new Date(c.createdAt).toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
            },
          );

          return (
            <>
              <Card className="flex flex-col gap-4 p-4 transition-shadow hover:shadow-md">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-foreground">
                      {c.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Created {formattedDate}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 flex-shrink-0 p-0"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className={statusColors[c.status]}>
                    {c.status.replace("_", " ")}
                  </Badge>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">
                      {c.leadsCompleted.toLocaleString()} /{" "}
                      {c.leadsTotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-primary transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 border-t border-border pt-3">
                  {c.sender && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Sender</span>
                      <span className="truncate font-medium text-foreground">
                        {c.sender}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Creator</span>
                    <span className="font-medium text-foreground">
                      {c.creator}
                    </span>
                  </div>
                </div>

                {c.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {c.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </Card>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default CampaignInterface;
