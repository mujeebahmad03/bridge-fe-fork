export interface LinkedInMessage {
  id: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: Date;
  status: "sent" | "delivered" | "read" | "replied" | "failed";
  linkedInAccountId: string;
  campaignId?: string;
  hasEmail?: boolean;
}

export interface LinkedInMessageFilters {
  campaigns: string[];
  linkedInAccounts: string[];
  emailStatus: string[];
  showProfilesWithEmails: boolean;
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
  searchQuery: string;
}

export type LinkedInMessageTab = "inbox" | "scheduled" | "queue";

export interface LinkedInCampaign {
  id: string;
  name: string;
}

export interface LinkedInEmailStatus {
  id: string;
  name: string;
}
