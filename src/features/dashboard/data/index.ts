import type { Task, Suggestion, QuickStat } from "@/dashboard/types";

export const tasks: Task[] = [
  {
    id: 1,
    type: "call",
    title: "Follow up call with John Smith",
    description: "Discuss Q4 proposal and next steps",
    priority: "high",
    dueTime: "2:00 PM",
    campaign: "Enterprise Solutions",
  },
  {
    id: 2,
    type: "email",
    title: "Send contract to Sarah Johnson",
    description: "Blackberry campaign contract review",
    priority: "medium",
    dueTime: "4:30 PM",
    campaign: "Blackberry",
  },
  {
    id: 3,
    type: "linkedin",
    title: "Connect with Mike Chen",
    description: "New lead from tech conference",
    priority: "low",
    dueTime: "Tomorrow",
    campaign: "Tech Outreach",
  },
  {
    id: 4,
    type: "email",
    title: "Draft proposal for ABC Corp",
    description: "Custom solution presentation",
    priority: "high",
    dueTime: "6:00 PM",
    campaign: "Custom Solutions",
  },
];

export const suggestions: Suggestion[] = [
  {
    id: 1,
    type: "email",
    title: "Follow-up Email Template",
    preview:
      "Hi Jane, I hope you're doing well. Following up on our discussion about the blackberry campaign...",
    recipient: "Jane Doe",
    campaign: "Blackberry",
  },
  {
    id: 2,
    type: "linkedin",
    title: "Connection Request",
    preview:
      "Hi Mike, Great meeting you at the tech conference. I'd love to connect and discuss potential collaboration...",
    recipient: "Mike Chen",
    campaign: "Tech Outreach",
  },
  {
    id: 3,
    type: "call",
    title: "Call Script",
    preview:
      "Good afternoon John, I'm calling to follow up on the Q4 proposal we discussed. Do you have a few minutes to chat?",
    recipient: "John Smith",
    campaign: "Enterprise Solutions",
  },
  {
    id: 4,
    type: "call",
    title: "Call Script",
    preview:
      "Good afternoon John, I'm calling to follow up on the Q4 proposal we discussed. Do you have a few minutes to chat?",
    recipient: "John Smith",
    campaign: "Enterprise Solutions",
  },
];

export const quickStats: QuickStat[] = [
  { label: "Calls Today", value: 3, icon: "phone", type: "calls" },
  { label: "Emails", value: 7, icon: "mail", type: "emails" },
  { label: "New Leads", value: 12, icon: "user", type: "leads" },
];
