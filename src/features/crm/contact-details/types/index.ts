export interface Contact {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
  company: {
    name: string;
    industry: string;
    size: string;
    location: string;
    website: string;
    description: string;
  };
  address: string;
  websiteUrl: string;
  linkedinUrl: string;
  status: string;
  owner: unknown;
  value: number;
  isCompany: boolean;
  socials?: string;
  leadStatus: string;
  campaignStatus: {
    name: string;
    step: number;
    totalSteps: number;
    nextAction: string;
  };
}
