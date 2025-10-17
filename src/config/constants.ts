import { Step } from "@/types/campaign";
import {
  BarChart3,
  Bot,
  Database,
  Eye,
  Hand,
  Linkedin,
  ListChecks,
  LoaderPinwheel,
  Mail,
  MessageSquare,
  Mic,
  Phone,
  Server,
  Shield,
  UserPlus,
  Users,
  Video,
} from "lucide-react";

export const features = [
  {
    icon: Bot,
    title: "AI-Powered Personalization",
    description:
      "Leverage advanced AI to create highly personalized outreach campaigns",
  },
  {
    icon: Mail,
    title: "Email Automation",
    description: "Smart email sequences with advanced deliverability features",
  },
  {
    icon: Linkedin,
    title: "LinkedIn Integration",
    description: "Seamless LinkedIn automation and profile enrichment",
  },
  {
    icon: Phone,
    title: "Multi-Channel Outreach",
    description: "Coordinate across email, LinkedIn, and phone channels",
  },
  {
    icon: Database,
    title: "Unified CRM",
    description: "Centralized contact and company management system",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Comprehensive reporting and performance tracking",
  },
];

export const setupSteps = [
  {
    id: 1,
    title: "Connect Email Account",
    description:
      "Integrate your email accounts to start managing your communications.",
    icon: Mail,
    isCompleted: false,
  },
  {
    id: 2,
    title: "Connect LinkedIn Accounts",
    description:
      "Link your LinkedIn profiles to manage connections and engagements.",
    icon: Linkedin,
    isCompleted: false,
  },
  {
    id: 3,
    title: "Set Up Email Campaigns",
    description:
      "Create your first email campaign to reach out to potential clients.",
    icon: MessageSquare,
    isCompleted: false,
  },
  {
    id: 4,
    title: "Set Up LinkedIn and Email Campaigns",
    description: "Sync your LinkedIn and email engagement in a sequence.",
    icon: Linkedin,
    isCompleted: false,
  },
  {
    id: 5,
    title: "Register for Our Webinar",
    description: "Join our webinar to learn how to maximize the use of Bridge.",
    icon: Video,
    isCompleted: false,
  },
  {
    id: 6,
    title: "Import Contacts",
    description: "Import your contacts to start engaging with them.",
    icon: Users,
    isCompleted: false,
  },
  {
    id: 7,
    title: "Configure Deliverability Tools",
    description:
      "Set up tools to ensure your emails land in the inbox, not the spam folder.",
    icon: Shield,
    isCompleted: false,
  },
];

export const steps: Step = {
  automatic: [
    {
      icon: Mail,
      iconColor: "text-green-300",
      iconBg: "bg-green-200/20",
      label: "Email",
      sub: "Send automatic email",
    },
    {
      icon: MessageSquare,
      iconColor: "text-primary",
      iconBg: "bg-primary/20",
      label: "Chat message",
      sub: "Send on LinkedIn",
      linkedin: true,
    },
    {
      icon: Mic,
      iconColor: "text-primary",
      iconBg: "bg-primary/20",
      label: "Voice message",
      sub: "Send on LinkedIn",
      linkedin: true,
    },
    {
      icon: Mic,
      iconColor: "text-purple-500",
      iconBg: "bg-purple-500/10",
      label: "AI Voice message",
      sub: "Send on LinkedIn",
      beta: true,
      linkedin: true,
    },
    {
      icon: UserPlus,
      iconColor: "text-primary",
      iconBg: "bg-primary/20",
      label: "Invitation",
      sub: "Send on LinkedIn",
      linkedin: true,
    },
    {
      icon: Eye,
      iconColor: "text-primary",
      iconBg: "bg-primary/20",
      label: "Visit profile",
      sub: "Visit profile",
    },
  ],
  manual: [
    {
      icon: Phone,
      iconColor: "text-pink-600",
      iconBg: "bg-rose-400/10",
      label: "Call",
      sub: "Create a task",
    },
    {
      icon: ListChecks,
      iconColor: "text-pink-600",
      iconBg: "bg-rose-400/10",
      label: "Manual task",
      sub: "Create a task",
    },
  ],
  other: [
    {
      icon: Server,
      iconColor: "text-primary",
      iconBg: "bg-primary/20",
      label: "Call an API",
      sub: "Call an API",
    },
    {
      icon: Hand,
      iconColor: "text-foreground",
      iconBg: "bg-gray-50/10",
      label: "Send to another campaign",
      sub: "Send to another campaign",
    },
  ],
  ai: [
    {
      icon: Bot,
      iconColor: "text-cyan-400",
      iconBg:
        "dark:bg-background/20 bg-muted border dark:border-black border-gray-300",
      label: "Perplexity",
      sub: "Browse website, generate text, classify, analyze lead data.",
    },
    {
      icon: LoaderPinwheel,
      iconColor: "text-foreground dark:text-white",
      iconBg:
        "dark:bg-background/20 bg-muted border dark:border-black border-gray-300",
      label: "Open AI",
      sub: "Generate text, classify, analyze lead data.",
    },
    {
      icon: LoaderPinwheel,
      iconColor: "text-foreground dark:text-white",
      iconBg:
        "dark:bg-background/20 bg-muted border dark:border-black border-gray-300",
      label: "AI variable",
      sub: "Automatically fill a variable",
    },
  ],
};

export const leadInfo = [
  { label: "Has email address", sub: "" },
  { label: "Has LinkedIn URL", linkedin: true, sub: "Linkedin" },
  { label: "Has phone number", sub: "" },
  {
    label: "Custom condition",
    tooltip: "You can't start your campaign with this condition",
  },
];

export const leadActions = [
  { label: "Opened email", sub: "" },
  { label: "Clicked on link in email" },
  { label: "Unsubscribe from email", sub: "" },
  { label: "Accepted invite", linkedin: true, sub: "Linkedin" },
  { label: "Opened linkedin message", linkedin: true, sub: "Linkedin" },
  { label: "Booked a meeting" },
  { label: "Has score", score: true, sub: "Score" },
];
