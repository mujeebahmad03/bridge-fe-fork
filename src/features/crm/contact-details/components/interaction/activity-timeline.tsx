"use client";

import { useState } from "react";
import { ActivityFilter } from "./activity-filter";
import {
  Edit3,
  Target,
  Mail,
  UserPlus,
  FileText,
  Calendar,
  CheckSquare,
  PartyPopper,
} from "lucide-react";
import { SuggestionCard } from "./suggestion-card";
import { RiBardFill } from "@remixicon/react";
import { NewTaskCard } from "./task-card-2";
import { TaskCard } from "./task-card";
import { NewEmailThread } from "./email-trend";
import { CalendarEvent } from "./calender-event";
import { NewContact } from "./new-contact";
import { TimelineIcon } from "./timeline-icon";
import { EmptySuggestionCard } from "./empty-suggestion-card";

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
    id: "1",
    type: "updates",
    title: "Updated the lead",
    description: "Lead status changed from 'Cold' to 'Qualified'",
    user: "Bridge Admin",
    timestamp: "about 3h ago",
    date: "August - 2025",
    actualDate: "2025-10-06",
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
    id: "2",
    type: "campaigns",
    title: "Added to campaign sequence",
    description: "Contact enrolled in 'Enterprise Outreach Campaign'",
    user: "Sarah Johnson",
    timestamp: "about 5h ago",
    date: "August - 2025",
    actualDate: "2025-10-05",
    icon: Target,
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    changes: [
      { field: "Campaign", from: "None", to: "Enterprise Outreach Campaign" },
      { field: "Sequence Step", from: "0", to: "1" },
    ],
  },
  {
    id: "3",
    type: "emails",
    title: "Email sent",
    description: "Outbound email: 'Introduction to our services'",
    user: "Marketing Team",
    timestamp: "1 day ago",
    date: "August - 2025",
    actualDate: "2025-10-06",
    icon: Mail,
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-950/20",
    changes: [
      { field: "Email Subject", from: "", to: "Introduction to our services" },
      { field: "Status", from: "Draft", to: "Sent" },
    ],
  },
  {
    id: "4",
    type: "interactions",
    title: "LinkedIn connection accepted",
    description: "Contact accepted LinkedIn connection request",
    user: "System",
    timestamp: "2 days ago",
    date: "August - 2025",
    actualDate: "2025-10-06",
    icon: UserPlus,
    color: "text-teal-500",
    bgColor: "bg-teal-50 dark:bg-teal-950/20",
    changes: [{ field: "LinkedIn Status", from: "Pending", to: "Connected" }],
  },
  {
    id: "5",
    type: "notes",
    title: "Note added",
    description: "Follow-up call scheduled for next week",
    user: "John Smith",
    timestamp: "3 days ago",
    date: "August - 2025",
    actualDate: "2025-10-04",
    icon: FileText,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-50/20",
    changes: [
      { field: "Note", from: "", to: "Follow-up call scheduled for next week" },
    ],
  },
  {
    id: "6",
    type: "events",
    title: "Meeting completed",
    description: "Discovery call - 45 minutes",
    user: "Sales Team",
    timestamp: "1 week ago",
    date: "August - 2025",
    actualDate: "2025-10-05",
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

  const hasSuggestions = false;

  const groupedActivities = filteredActivities.reduce<
    Record<string, (typeof activities)[number][]>
  >((groups, activity) => {
    const date = activity.actualDate;
    if (!groups[date]) groups[date] = [];
    groups[date].push(activity);
    return groups;
  }, {});

  const handleGenerateEmail = () => {};

  const handleRemindLater = () => {};

  const handleMarkDone = () => {};

  const handleDismiss = () => {};

  const handleNewTask = () => {};

  const handleReply = () => {};

  const handleRequestSuggestions = () => {};

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
      </div>

      <div className="min-h-screen">
        <div className="mx-auto max-w-3xl p-6">
          <div className="relative">
            <div className="absolute bottom-0 left-2 top-1 w-px bg-border"></div>

            <div className="relative z-10 mb-6">
              <div className="flex items-start gap-4 pl-10">
                <TimelineIcon
                  icon={<RiBardFill />}
                  bgColor="bg-purple-100"
                  iconColor="text-purple-600"
                />
                <div className="min-w-0 flex-1">
                  {hasSuggestions ? (
                    <SuggestionCard
                      title="Follow up after Meeting with contacts on Oct 6, 2025"
                      description="You had a meeting scheduled with Joshua Obafemi and others on October 6, 2025, but there has been no email activity since then. To keep the deal progressing and maintain engagement, you should send a follow-up email today to recap the meeting, address any open points, and discuss next steps."
                      badge="past due"
                      badgeVariant="destructive"
                      onGenerateEmail={handleGenerateEmail}
                      onRemindLater={handleRemindLater}
                      onMarkDone={handleMarkDone}
                      onDismiss={handleDismiss}
                    />
                  ) : (
                    <EmptySuggestionCard
                      onRequestSuggestions={handleRequestSuggestions}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="relative z-10 mb-6">
              <div className="flex items-start gap-4 pl-10">
                <TimelineIcon
                  icon={<CheckSquare />}
                  bgColor="bg-green-50 dark:bg-green-950/20"
                  iconColor="text-green-500"
                />
                <NewTaskCard hasNewTasks={false} onNewTask={handleNewTask} />
              </div>
            </div>

            {Object.entries(groupedActivities).map(
              ([date, activitiesForDate]) => {
                const formattedDate = new Date(date).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                  },
                );

                return (
                  <div key={date}>
                    <div className="relative z-10 flex items-center justify-center gap-4 py-8">
                      <span className="text-sm font-medium text-gray-500">
                        {formattedDate}
                      </span>
                    </div>

                    {activitiesForDate.map((activity) => (
                      <div key={activity.id} className="relative z-10 mb-6">
                        <div className="flex items-start gap-4 pl-10">
                          <TimelineIcon
                            icon={<activity.icon />}
                            bgColor={activity.bgColor}
                            iconColor={activity.color}
                            badgeText={
                              activity.type === "emails" ||
                              activity.type === "events"
                                ? "M"
                                : undefined
                            }
                          />

                          <div className="min-w-0 flex-1">
                            {activity.type === "emails" && (
                              <NewEmailThread
                                subject={activity.title}
                                date={activity.timestamp}
                                guests={[
                                  {
                                    email: "emjay.provde@gmail.com",
                                    name: "emjay provde",
                                    role: "organizer",
                                  },
                                  {
                                    email: "Joshua Obafemi",
                                    name: "Joshua Obafemi",
                                  },
                                  {
                                    email: "abdulmujeebalihma065@gmail.com",
                                    name: "Abdulmujeeb Ahmad",
                                  },
                                ]}
                                when="Monday, Oct 6, 2025 8am - 9am (Eastern Time - New York)"
                                accepted={true}
                                onReply={handleReply}
                              />
                            )}

                            {activity.type === "events" && (
                              <CalendarEvent
                                title={activity.title}
                                timeAgo={activity.timestamp}
                                meetingTitle={activity.description}
                                dateTime="May 6, 2025 5:00 PM - 6:00 PM"
                                month="MAY"
                                day="6"
                                meetingInfo={`Created by ${activity.user}`}
                              />
                            )}

                            {activity.type === "task" && (
                              <TaskCard
                                task={{
                                  id: activity.id,
                                  title: "Follow up on contract proposal",
                                  description:
                                    "Send follow-up email regarding the Q1 contract proposal and schedule a meeting to discuss terms.",
                                  assignee: {
                                    name: "Sam Queen",
                                    avatar: "SQ",
                                    id: "1",
                                  },
                                  dueDate: "2025-01-20",
                                  dueTime: "14:00",
                                  priority: "high",
                                  completed: false,
                                  createdAt: "2025-01-15T10:00:00Z",
                                  updatedAt: "2025-01-15T10:00:00Z",
                                }}
                                onToggleComplete={() => {}}
                                onEdit={() => {}}
                                onDelete={() => {}}
                              />
                            )}

                            {(activity.type === "campaigns" ||
                              activity.type === "updates" ||
                              activity.type === "interactions" ||
                              activity.type === "notes") && (
                              <NewContact
                                title={activity.title}
                                description={activity.description}
                                isNote={activity.type === "notes"}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              },
            )}
            <div className="relative z-10 mb-6">
              <div className="flex items-start gap-4 pl-10">
                <TimelineIcon
                  icon={<PartyPopper />}
                  bgColor="bg-blue-50 dark:bg-blue-50/20"
                  iconColor="text-blue-500"
                />
                <NewContact title="New contact added" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
