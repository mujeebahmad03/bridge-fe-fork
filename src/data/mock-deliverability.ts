import type { DeliverabilityReport } from "@/types/deliverability";
import { addDays, format } from "date-fns";

const generateChartData = (days = 30) => {
  const data = [];
  for (let i = days; i >= 0; i--) {
    const date = addDays(new Date(), -i);
    const baseScore = 75 + Math.random() * 20;
    data.push({
      date: format(date, "yyyy-MM-dd"),
      score: Math.round(baseScore),
      sent: Math.round(100 + Math.random() * 200),
      delivered: Math.round(90 + Math.random() * 180),
      bounced: Math.round(5 + Math.random() * 15),
      opened: Math.round(30 + Math.random() * 60),
      clicked: Math.round(5 + Math.random() * 20),
      complained: Math.round(Math.random() * 5),
    });
  }
  return data;
};

export const mockDeliverabilityReports: DeliverabilityReport[] = [
  {
    emailAccount: "stephendandy@gmail.com",
    metrics: {
      bounceRate: 2.1,
      spamRate: 0.8,
      replyRate: 4.2,
      openRate: 26.3,
      clickRate: 3.7,
      deliverabilityScore: 85,
      totalEmailsSent: 2847,
      complaints: 14,
      unsubscribes: 23,
    },
    chartData: generateChartData(),
    suggestions: [
      {
        id: "1",
        title: "Avoid Sending to Unengaged Contacts",
        description:
          "Remove or pause contacts who haven't interacted in a while.",
        impact: "high",
        category: "list-hygiene",
        actionRequired: true,
      },
      {
        id: "2",
        title: "Use a Recognizable Sender Name",
        description: "Use a clear 'From' name so recipients know who you are.",
        impact: "medium",
        category: "sending-behavior",
        actionRequired: false,
      },
      {
        id: "3",
        title: "Implement DMARC Authentication",
        description:
          "Set up DMARC to improve email authentication and deliverability.",
        impact: "high",
        category: "authentication",
        actionRequired: true,
      },
    ],
    lastUpdated: new Date(),
  },
  {
    emailAccount: "thenoskshade@gmail.com",
    metrics: {
      bounceRate: 1.8,
      spamRate: 0.5,
      replyRate: 5.1,
      openRate: 28.7,
      clickRate: 4.2,
      deliverabilityScore: 92,
      totalEmailsSent: 1923,
      complaints: 8,
      unsubscribes: 15,
    },
    chartData: generateChartData(),
    suggestions: [
      {
        id: "4",
        title: "Optimize Email Content",
        description:
          "Review your email content for spam trigger words and improve engagement.",
        impact: "medium",
        category: "content",
        actionRequired: false,
      },
    ],
    lastUpdated: new Date(),
  },
  {
    emailAccount: "andrebitcham@gmail.com",
    metrics: {
      bounceRate: 3.2,
      spamRate: 1.2,
      replyRate: 3.8,
      openRate: 24.1,
      clickRate: 2.9,
      deliverabilityScore: 78,
      totalEmailsSent: 3156,
      complaints: 22,
      unsubscribes: 41,
    },
    chartData: generateChartData(),
    suggestions: [
      {
        id: "5",
        title: "Clean Your Email List",
        description: "Remove invalid email addresses and inactive subscribers.",
        impact: "high",
        category: "list-hygiene",
        actionRequired: true,
      },
      {
        id: "6",
        title: "Reduce Sending Frequency",
        description:
          "Consider reducing email frequency to improve engagement rates.",
        impact: "medium",
        category: "sending-behavior",
        actionRequired: true,
      },
    ],
    lastUpdated: new Date(),
  },
];
