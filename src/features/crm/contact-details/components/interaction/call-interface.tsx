"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CallRecord } from "./call-record";
import { CallComposer } from "./call-composer";
import { Phone, Search, Filter, Plus } from "lucide-react";

const mockCalls = [
  {
    id: "1",
    type: "outgoing" as const,
    status: "completed" as const,
    participant: {
      name: "Sarah Johnson",
      avatar: "/professional-woman.png",
      title: "VP of Sales",
      company: "TechCorp Inc.",
    },
    duration: "12:34",
    timestamp: "2 hours ago",
    transcription:
      "Hi Sarah, thanks for taking the time to speak with me today. I wanted to follow up on our discussion about the new product features and get your thoughts on the implementation timeline. Based on what we discussed, it seems like Q2 would be the ideal launch window. What are your thoughts on that? I think we should also consider the marketing strategy and how we want to position this in the market.",
    recording: true,
    notes:
      "Great call! Sarah is very interested in the Q2 launch. Need to follow up with technical specifications next week.",
  },
  {
    id: "2",
    type: "incoming" as const,
    status: "completed" as const,
    participant: {
      name: "Michael Chen",
      avatar: "/professional-man.png",
      title: "Product Manager",
      company: "Innovation Labs",
    },
    duration: "8:45",
    timestamp: "Yesterday",
    transcription:
      "Hey, I wanted to touch base about the project timeline. We're looking at some potential delays on our end due to resource constraints. I think we might need to push back the delivery date by about two weeks. Let me know if that works with your schedule and we can adjust accordingly.",
    recording: true,
    notes:
      "Timeline discussion - 2 week delay expected. Need to update project plan.",
  },
  {
    id: "3",
    type: "missed" as const,
    status: "missed" as const,
    participant: {
      name: "Emily Rodriguez",
      avatar: "/professional-woman-2.png",
      title: "Marketing Director",
      company: "Growth Solutions",
    },
    duration: "0:00",
    timestamp: "3 days ago",
    recording: false,
    notes: "Missed call - need to reschedule for next week.",
  },
  {
    id: "4",
    type: "outgoing" as const,
    status: "completed" as const,
    participant: {
      name: "David Kim",
      avatar: "/professional-person.png",
      title: "CTO",
      company: "StartupXYZ",
    },
    duration: "25:12",
    timestamp: "1 week ago",
    transcription:
      "David, great to connect with you again. I wanted to discuss the technical architecture for the integration we talked about. From what I understand, you're looking for a solution that can handle high-volume data processing while maintaining real-time capabilities. Our platform is designed exactly for this use case. We've successfully implemented similar solutions for companies like yours, and I think we can deliver exactly what you need. The key advantages of our approach include scalability, reliability, and cost-effectiveness.",
    recording: true,
    notes:
      "Technical discussion about integration requirements. David is interested in a demo next month.",
  },
];

export function CallInterface() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showComposer, setShowComposer] = useState(false);

  const filteredCalls = mockCalls.filter((call) => {
    const matchesSearch =
      call.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.participant.company
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterType === "all" ||
      (filterType === "completed" && call.status === "completed") ||
      (filterType === "missed" && call.status === "missed") ||
      (filterType === "incoming" && call.type === "incoming") ||
      (filterType === "outgoing" && call.type === "outgoing");

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Calls</h2>
          <span className="text-sm text-muted-foreground">
            ({filteredCalls.length})
          </span>
        </div>

        <Button
          onClick={() => setShowComposer(true)}
          className="w-full sm:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" />
          Make Call
        </Button>
      </div>

      {showComposer && <CallComposer onClose={() => setShowComposer(false)} />}

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
          <Input
            placeholder="Search calls..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter calls" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Calls</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="missed">Missed</SelectItem>
            <SelectItem value="incoming">Incoming</SelectItem>
            <SelectItem value="outgoing">Outgoing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {filteredCalls.length > 0 ? (
          filteredCalls.map((call) => <CallRecord key={call.id} call={call} />)
        ) : (
          <div className="py-12 text-center">
            <Phone className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-medium">No calls found</h3>
            <p className="mb-4 text-muted-foreground">
              {searchQuery || filterType !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Start by making your first call"}
            </p>
            {!searchQuery && filterType === "all" && (
              <Button onClick={() => setShowComposer(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Make Call
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
