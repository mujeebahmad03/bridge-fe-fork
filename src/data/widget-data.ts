import { WidgetData } from "@/types/widget";

export const WIDGET_TEMPLATES: WidgetData[] = [
  {
    id: "email",
    type: "email",
    title: "Email Analytics",
    metrics: [
      { label: "Sent", value: 1250, change: 5.2 },
      { label: "Delivered", value: 1180, change: 4.8 },
      { label: "Opened", value: 750, change: 3.2 },
      { label: "Replied", value: 125, change: -1.5 },
      { label: "Bounced", value: 70, change: -2.1 },
    ],
  },
  {
    id: "linkedin",
    type: "linkedin",
    title: "LinkedIn Analytics",
    metrics: [
      { label: "Connections Sent", value: 450, change: 8.5 },
      { label: "Connections Accepted", value: 280, change: 6.2 },
      { label: "InMails Sent", value: 180, change: 4.1 },
      { label: "Replied", value: 35, change: 2.8 },
      { label: "Profile Views", value: 890, change: 12.4 },
    ],
  },
  {
    id: "calls",
    type: "calls",
    title: "Calls Analytics",
    metrics: [
      { label: "Calls Logged", value: 320, change: 7.5 },
      { label: "Connected", value: 180, change: 5.2 },
      { label: "No Answer", value: 140, change: -3.8 },
      { label: "Voicemails", value: 62, change: -4.8 },
    ],
  },
  {
    id: "campaign",
    type: "campaign",
    title: "Campaign Analytics",
    metrics: [
      { label: "Total Outreach", value: 2850, change: 6.8 },
      { label: "Engagement Rate", value: 42, change: 3.5 },
      { label: "Response Rate", value: 18, change: 2.1 },
    ],
  },
];

export const performanceData = {
  email: {
    primary: { label: "Sent", value: 85 },
    secondary: { label: "Reply", value: 32 },
  },
  linkedin: {
    primary: { label: "Sent", value: 78 },
    secondary: { label: "Reply", value: 28 },
  },
  calls: {
    primary: { label: "Logged", value: 92 },
    secondary: { label: "Answer", value: 45 },
  },
};
