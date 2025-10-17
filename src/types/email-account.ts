export interface EmailAccount {
  id: string;
  email: string;
  provider: "Gmail" | "Outlook" | "Custom";
  configuration: {
    signature: string;
    sendingLimit: {
      daily: number;
      hourly: number;
    };
    optOutLink: string;
    subdomainTracking: boolean;
    domainAuthentication: {
      dkim: boolean;
      spf: boolean;
      dmarc: boolean;
    };
  };
  warmUp: {
    progress: number;
    status: "warming" | "completed" | "paused";
  };
  status: "syncing" | "connected" | "failed" | "disconnected";
  deliverabilityScore: number | null;
  lastSynced: Date;
}

export type ConfigurationTab =
  | "signature"
  | "sending-limit"
  | "opt-out-link"
  | "subdomain-tracking"
  | "domain-authentication";
