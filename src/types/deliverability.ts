export interface DeliverabilityMetrics {
  bounceRate: number;
  spamRate: number;
  replyRate: number;
  openRate: number;
  clickRate: number;
  deliverabilityScore: number;
  totalEmailsSent: number;
  complaints: number;
  unsubscribes: number;
}

export interface DeliverabilityData {
  date: string;
  score: number;
  sent: number;
  delivered: number;
  bounced: number;
  opened: number;
  clicked: number;
  complained: number;
}

export interface DeliverabilityReport {
  emailAccount: string;
  metrics: DeliverabilityMetrics;
  chartData: DeliverabilityData[];
  suggestions: DeliverabilitySuggestion[];
  lastUpdated: Date;
}

export interface DeliverabilitySuggestion {
  id: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  category: "authentication" | "content" | "list-hygiene" | "sending-behavior";
  actionRequired: boolean;
}
