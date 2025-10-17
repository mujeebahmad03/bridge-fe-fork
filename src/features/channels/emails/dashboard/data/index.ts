import {
  Mail,
  Send,
  FileText,
  Archive,
  Trash2,
  Users,
  Bell,
  MessageCircle,
  ShoppingCart,
  Tag,
} from "lucide-react";
import { Email } from "@/emails/dashboard/types";

export const folders = [
  { id: "inbox", name: "Inbox", icon: Mail, count: 128 },
  { id: "drafts", name: "Drafts", icon: FileText, count: 9 },
  { id: "sent", name: "Sent", icon: Send, count: 0 },
  { id: "junk", name: "Junk", icon: Archive, count: 23 },
  { id: "trash", name: "Trash", icon: Trash2, count: 0 },
  { id: "archive", name: "Archive", icon: Mail, count: 0 },
  { id: "social", name: "Social", icon: Users, count: 972 },
  { id: "updates", name: "Updates", icon: Bell, count: 342 },
  { id: "forums", name: "Forums", icon: MessageCircle, count: 128 },
  { id: "shopping", name: "Shopping", icon: ShoppingCart, count: 8 },
  { id: "promotions", name: "Promotions", icon: Tag, count: 21 },
];

export const mockEmails: Email[] = [
  {
    id: "1",
    sender: "William Smith",
    subject: "Meeting Tomorrow",
    preview:
      "I have an exciting new project idea to discuss with you. It involves expanding our services to target a niche market that has shown considerable growth in recent months. I've prepared a detailed...",
    content: `Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.

Please come prepared with any questions or insights you may have. Looking forward to our meeting!

Best regards, William`,
    time: "Oct 22, 2023, 9:00:00 AM",
    tags: ["meeting", "work", "important"],
    isOnline: false,
    isRead: false,
    isStarred: false,
    folder: "inbox",
    replyTo: "williamsmith@example.com",
  },
  {
    id: "2",
    sender: "Sophia White",
    subject: "Team Dinner",
    preview:
      "Let's have a team dinner next week to celebrate our success. We've achieved some significant milestones, and it's time to acknowledge our hard work and dedication. I've made reservations a...",
    content: `Hi team,

Let's have a team dinner next week to celebrate our success. We've achieved some significant milestones, and it's time to acknowledge our hard work and dedication. I've made reservations at a lovely restaurant, and I'm sure it'll be an enjoyable evening.

Please let me know if you have any dietary restrictions or preferences.

Looking forward to celebrating with you all!

Best,
Sophia`,
    time: "over 2 years ago",
    tags: ["meeting", "work"],
    isOnline: true,
    isRead: true,
    isStarred: true,
    folder: "inbox",
  },
  {
    id: "3",
    sender: "Daniel Johnson",
    subject: "Feedback Request",
    preview:
      "I'd like your feedback on the latest project deliverables. We've made significant progress, and I value your input to ensure we're on the right track. I've attached the deliverables for your review,...",
    content: `Hello,

I'd like your feedback on the latest project deliverables. We've made significant progress, and I value your input to ensure we're on the right track. I've attached the deliverables for your review, and I'm particularly interested in any areas where you think we can improve.

Your expertise would be invaluable in helping us refine our approach and deliver the best possible results.

Thank you for your time and consideration.

Best regards,
Daniel`,
    time: "almost 3 years ago",
    tags: ["work"],
    isOnline: true,
    isRead: true,
    isStarred: false,
    folder: "inbox",
  },
  {
    id: "4",
    sender: "Marketing Team",
    subject: "Draft Campaign Review",
    preview:
      "Please review the attached marketing campaign draft for the upcoming product launch...",
    content: `Hi there,

Please review the attached marketing campaign draft for the upcoming product launch. We need your feedback by end of week to stay on schedule.

Key areas to focus on:
- Messaging clarity
- Target audience alignment
- Budget allocation

Thanks!
Marketing Team`,
    time: "2 days ago",
    tags: ["work", "review"],
    isOnline: false,
    isRead: false,
    isStarred: true,
    folder: "drafts",
  },
  {
    id: "5",
    sender: "John Doe",
    subject: "Project Update Sent",
    preview:
      "Your project update has been successfully sent to all stakeholders...",
    content: `This is a confirmation that your project update has been successfully sent to all stakeholders.

Recipients:
- CEO
- Project Manager
- Development Team
- QA Team

Sent at: ${new Date().toLocaleString()}`,
    time: "1 hour ago",
    tags: ["confirmation"],
    isOnline: false,
    isStarred: false,
    isRead: true,
    folder: "sent",
  },
  {
    id: "6",
    sender: "John Doe",
    subject: "Project Update Sent",
    preview:
      "Your project update has been successfully sent to all stakeholders...",
    content: `This is a confirmation that your project update has been successfully sent to all stakeholders.

Recipients:
- CEO
- Project Manager
- Development Team
- QA Team

Sent at: ${new Date().toLocaleString()}`,
    time: "1 hour ago",
    tags: ["confirmation"],
    isOnline: false,
    isStarred: false,
    isRead: true,
    folder: "inbox",
  },
];
