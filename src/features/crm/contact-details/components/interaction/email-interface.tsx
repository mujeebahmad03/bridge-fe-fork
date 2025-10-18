"use client";

import { useState } from "react";
/* import { EmailThread } from "./email-thread";*/
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Filter, RefreshCwIcon as Refresh } from "lucide-react";
import { NewEmailThread } from "./email-trend";
import { EmailModal } from "../contact/modals/email-modal";

// Mock data
const contact = {
  id: "1",
  name: "Nadia Carta",
  role: "CEO",
  email: "nadia.carta@company.com",
  phone: "+1 234 567 890",
  avatar: "/professional-woman-headshot.png",
  address: "1600 Amphitheatre Parkway, Mountain View, CA 94043",
  company: {
    name: "Google",
    industry: "Software and Technology",
    size: "100-500",
    location: "New York, US",
    website: "https://about.google/",
    description:
      "Leading technology company focused on organizing the world's information and making it universally accessible and useful.",
  },
  websiteUrl: "https://about.google/",
  linkedinUrl: "linkedin.com/in/nadiacarta",
  status: "Pending",
  owner: null,
  value: 0,
  isCompany: true,
  leadStatus: "qualified",
  campaignStatus: {
    name: "Enterprise Outreach Campaign",
    step: 3,
    totalSteps: 5,
    nextAction: "Send follow-up email with proposal",
  },
};

const mockThreads = [
  {
    id: "thread-1",
    subject: "Project Proposal Discussion",
    lastActivity: "2025-01-17T10:30:00Z",
    participants: ["John Doe", "Jane Smith"],
    emails: [
      {
        id: "email-1",
        from: "john.doe@company.com",
        fromName: "John Doe",
        to: ["nadia.carta@example.com"],
        subject: "Project Proposal Discussion",
        body: "Hi Nadia,\n\nI wanted to follow up on our conversation about the new project proposal. I've attached the initial draft for your review.\n\nPlease let me know your thoughts and if you have any questions.\n\nBest regards,\nJohn",
        timestamp: "2025-01-17T09:00:00Z",
        isRead: true,
      },
      {
        id: "email-2",
        from: "nadia.carta@example.com",
        fromName: "Nadia Carta",
        to: ["john.doe@company.com"],
        cc: ["jane.smith@company.com"],
        subject: "Re: Project Proposal Discussion",
        body: "Hi John,\n\nThank you for sending the proposal. I've reviewed it and have a few suggestions:\n\n1. Consider expanding the timeline section\n2. Add more detail about the budget breakdown\n3. Include risk assessment\n\nLet's schedule a call to discuss these points further.\n\nBest,\nNadia",
        timestamp: "2025-01-17T10:30:00Z",
        isRead: false,
      },
    ],
  },
  {
    id: "thread-2",
    subject: "Meeting Follow-up",
    lastActivity: "2025-01-16T15:45:00Z",
    participants: ["Sarah Wilson"],
    emails: [
      {
        id: "email-3",
        from: "sarah.wilson@company.com",
        fromName: "Sarah Wilson",
        to: ["nadia.carta@example.com"],
        subject: "Meeting Follow-up",
        body: "Hi Nadia,\n\nGreat meeting today! As discussed, I'm sending over the action items:\n\n- Review Q1 budget proposals\n- Schedule team sync for next week\n- Prepare presentation for stakeholders\n\nLet me know if I missed anything.\n\nThanks,\nSarah",
        timestamp: "2025-01-16T15:45:00Z",
        isRead: true,
      },
    ],
  },
];

export type EmailData = Partial<(typeof mockThreads)[0]>;

export function EmailInterface() {
  const [threads] = useState(mockThreads);
  /* const [expandedThreads, setExpandedThreads] = useState<Set<string>>(
    new Set(),
  ); */
  const [showComposer, setShowComposer] = useState(false);
  const [replyingToMessage, setReplyingToMessage] = useState<{
    threadId: string;
    emailId: string;
    isReplyAll: boolean;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("all");

  /*  const toggleThreadExpansion = (threadId: string) => {
    const newExpanded = new Set(expandedThreads);
    if (newExpanded.has(threadId)) {
      newExpanded.delete(threadId);
    } else {
      newExpanded.add(threadId);
    }
    setExpandedThreads(newExpanded);
  }; */

  /* const handleSendEmail = (data: EmailData) => {
    console.log("Sending email:", data);
    // Here you would typically send the email via API
    setShowComposer(false);
    setReplyingToMessage(null);
  }; */

  /*
  const handleForward = (threadId: string, emailId: string) => {
    console.log("Forward email:", threadId, emailId);
    // Implement forward functionality
  };

  const handleCancelReply = () => {
    setReplyingToMessage(null);
  }; */

  const filteredThreads = threads.filter((thread) => {
    if (searchQuery) {
      return (
        thread.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        thread.emails.some(
          (email) =>
            email.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
            email.fromName.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      );
    }
    return true;
  });

  return (
    <div className="flex h-full flex-col">
      {/* Email Header */}
      <div className="space-y-4 border-b border-border p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Email</h2>
          <div className="flex items-center space-x-2">
            <Button size="sm" onClick={() => setShowComposer(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Compose
            </Button>
            <Button variant="ghost" size="sm">
              <Refresh className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <Input
              placeholder="Search emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-32">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="drafts">Drafts</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Email Content */}
      <div className="scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent flex-1 overflow-y-auto">
        {/* {showComposer && !replyingToMessage && (
          <div className="border-b border-border p-4">
            <EmailComposer
              isReply={false}
              onSend={() => {}}
              onCancel={() => setShowComposer(false)}
            />
          </div>
        )} */}

        <div className="p-4">
          {filteredThreads.length === 0 ? (
            <div className="py-12 text-center">
              <div className="mb-2 text-muted-foreground">No emails found</div>
              <Button onClick={() => setShowComposer(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Send your first email
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-6 space-y-4">
              {filteredThreads.map((thread) => (
                <>
                  {/* <EmailThread
                  key={thread.id}
                  thread={thread}
                  isExpanded={expandedThreads.has(thread.id)}
                  onToggle={() => toggleThreadExpansion(thread.id)}
                  onReply={handleReply}
                  onReplyAll={handleReplyAll}
                  onForward={handleForward}
                  replyingToMessage={replyingToMessage}
                  onSendReply={handleSendEmail}
                  onCancelReply={handleCancelReply}
                /> */}
                  <NewEmailThread
                    subject={thread.subject}
                    date={"1 day ago"}
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
                    onReply={() => {
                      setReplyingToMessage({
                        threadId: "one subject",
                        emailId: "egondu@gmail.com",
                        isReplyAll: false,
                      });
                      setShowComposer(true);
                    }}
                  />
                </>
              ))}
            </div>
          )}
        </div>
      </div>

      <EmailModal
        isOpen={showComposer}
        onClose={() => {
          setShowComposer(false);
          setReplyingToMessage(null);
        }}
        contact={contact}
        isReply={replyingToMessage ? true : false}
        existingEmail={replyingToMessage?.emailId}
        existingSubject={replyingToMessage?.threadId}
      />
    </div>
  );
}
