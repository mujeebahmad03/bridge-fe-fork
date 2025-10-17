import type { EmailAccount } from "@/types/email-account";

export const mockEmailAccounts: EmailAccount[] = [
  {
    id: "1",
    email: "thenoskshade@gmail.com",
    provider: "Gmail",
    configuration: {
      signature: "Best regards,\nJohn Doe\nSales Manager",
      sendingLimit: {
        daily: 30,
        hourly: 5,
      },
      optOutLink: "https://example.com/unsubscribe",
      subdomainTracking: true,
      domainAuthentication: {
        dkim: true,
        spf: true,
        dmarc: false,
      },
    },
    warmUp: {
      progress: 45,
      status: "warming",
    },
    status: "syncing",
    deliverabilityScore: null,
    lastSynced: new Date("2025-05-27T15:45:00"),
  },
  {
    id: "2",
    email: "andrebitcham@gmail.com",
    provider: "Outlook",
    configuration: {
      signature: "Kind regards,\nAndre Bitcham\nMarketing Director",
      sendingLimit: {
        daily: 50,
        hourly: 8,
      },
      optOutLink: "https://company.com/unsubscribe",
      subdomainTracking: false,
      domainAuthentication: {
        dkim: true,
        spf: true,
        dmarc: true,
      },
    },
    warmUp: {
      progress: 45,
      status: "warming",
    },
    status: "failed",
    deliverabilityScore: null,
    lastSynced: new Date("2025-05-27T15:45:00"),
  },
  {
    id: "3",
    email: "jaysontyper@gmail.com",
    provider: "Gmail",
    configuration: {
      signature: "Cheers,\nJayson Typer\nBusiness Development",
      sendingLimit: {
        daily: 100,
        hourly: 15,
      },
      optOutLink: "https://business.com/opt-out",
      subdomainTracking: true,
      domainAuthentication: {
        dkim: true,
        spf: true,
        dmarc: true,
      },
    },
    warmUp: {
      progress: 45,
      status: "completed",
    },
    status: "connected",
    deliverabilityScore: 96,
    lastSynced: new Date("2025-05-27T15:45:00"),
  },
  {
    id: "4",
    email: "jaysontyper@company.com",
    provider: "Custom",
    configuration: {
      signature: "Best,\nJayson Typer\nCEO & Founder",
      sendingLimit: {
        daily: 200,
        hourly: 25,
      },
      optOutLink: "https://company.com/unsubscribe",
      subdomainTracking: true,
      domainAuthentication: {
        dkim: true,
        spf: true,
        dmarc: true,
      },
    },
    warmUp: {
      progress: 45,
      status: "completed",
    },
    status: "connected",
    deliverabilityScore: 96,
    lastSynced: new Date("2025-05-27T15:45:00"),
  },
];
