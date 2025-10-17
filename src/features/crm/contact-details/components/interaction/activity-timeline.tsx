"use client";

import { useState } from "react";
import { ActivityCard } from "./activity-card";
import { ActivityFilter } from "./activity-filter";
import {
  Edit3,
  Target,
  Mail,
  UserPlus,
  FileText,
  Calendar,
} from "lucide-react";

const activityTypes = [
  { id: "all", label: "All", color: "text-foreground" },
  { id: "notes", label: "Notes", color: "text-blue-500" },
  { id: "events", label: "Events", color: "text-green-500" },
  { id: "campaigns", label: "Campaigns", color: "text-purple-500" },
  { id: "messages", label: "Messages", color: "text-orange-500" },
  { id: "emails", label: "Emails", color: "text-red-500" },
  { id: "interactions", label: "Interactions", color: "text-teal-500" },
  { id: "updates", label: "Updates", color: "text-pink-500" },
];

const activities = [
  {
    id: 1,
    type: "updates",
    title: "Updated the lead",
    description: "Lead status changed from 'Cold' to 'Qualified'",
    user: "Bridge Admin",
    timestamp: "about 3h ago",
    date: "August - 2025",
    icon: Edit3,
    color: "text-pink-500",
    bgColor: "bg-pink-50 dark:bg-pink-950/20",
    changes: [
      { field: "Lead Status", from: "Cold", to: "Qualified" },
      { field: "Priority", from: "Low", to: "High" },
    ],
    tags: ["Agency", "Scale Up", "Startup"],
  },
  {
    id: 2,
    type: "campaigns",
    title: "Added to campaign sequence",
    description: "Contact enrolled in 'Enterprise Outreach Campaign'",
    user: "Sarah Johnson",
    timestamp: "about 5h ago",
    date: "August - 2025",
    icon: Target,
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    changes: [
      { field: "Campaign", from: "None", to: "Enterprise Outreach Campaign" },
      { field: "Sequence Step", from: "0", to: "1" },
    ],
  },
  {
    id: 3,
    type: "emails",
    title: "Email sent",
    description: "Outbound email: 'Introduction to our services'",
    user: "Marketing Team",
    timestamp: "1 day ago",
    date: "August - 2025",
    icon: Mail,
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-950/20",
    changes: [
      { field: "Email Subject", from: "", to: "Introduction to our services" },
      { field: "Status", from: "Draft", to: "Sent" },
    ],
  },
  {
    id: 4,
    type: "interactions",
    title: "LinkedIn connection accepted",
    description: "Contact accepted LinkedIn connection request",
    user: "System",
    timestamp: "2 days ago",
    date: "August - 2025",
    icon: UserPlus,
    color: "text-teal-500",
    bgColor: "bg-teal-50 dark:bg-teal-950/20",
    changes: [{ field: "LinkedIn Status", from: "Pending", to: "Connected" }],
  },
  {
    id: 5,
    type: "notes",
    title: "Note added",
    description: "Follow-up call scheduled for next week",
    user: "John Smith",
    timestamp: "3 days ago",
    date: "August - 2025",
    icon: FileText,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    changes: [
      { field: "Note", from: "", to: "Follow-up call scheduled for next week" },
    ],
  },
  {
    id: 6,
    type: "events",
    title: "Meeting completed",
    description: "Discovery call - 45 minutes",
    user: "Sales Team",
    timestamp: "1 week ago",
    date: "August - 2025",
    icon: Calendar,
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    changes: [
      { field: "Meeting Status", from: "Scheduled", to: "Completed" },
      { field: "Duration", from: "30 min", to: "45 min" },
    ],
  },
];

export function ActivityTimeline() {
  const [activityFilter, setActivityFilter] = useState("all");

  const filteredActivities = activities.filter(
    (activity) => activityFilter === "all" || activity.type === activityFilter,
  );

  return (
    <div className="animate-fade-in space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold">
          {filteredActivities.length} activities
        </h2>
        <ActivityFilter
          activityTypes={activityTypes}
          currentFilter={activityFilter}
          onFilterChange={setActivityFilter}
        />
      </div>

      <div className="space-y-4">
        {/* Date Header */}
        <div className="border-b border-border pb-2 text-sm font-medium text-muted-foreground">
          August - 2025
        </div>

        {filteredActivities.map((activity, index) => (
          <ActivityCard key={activity.id} activity={activity} index={index} />
        ))}
      </div>
    </div>
  );
}
