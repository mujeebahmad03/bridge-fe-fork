// Define type options as an array of objects with names and values

import {
  Type,
  Globe,
  Mail,
  CheckSquare,
  Smartphone,
  Target,
  UserSearch,
} from "lucide-react";
import { LeadsColumnType } from "@/types/leads";

export enum LeadsTypeEnum {
  Text = "text",
  FindWorkEmail = "find_work_email",
  LinkedInScraper = "Linkedin_scraper",
  FullNameToLinkedInProfile = "full_name_to_linkedin_profile",
  EmailToLinkedInProfile = "email_to_linkedin_profile",
  FindWorkEmailAndLinkedInUrl = "find_work_email_and_linkedin_url",
  FindLinkedInUrl = "find_linkedin_url",
  FindLeadsUsingDomain = "find_leads_using_domain",
  FindPhoneNumber = "find_phone_number",
  CompanyData = "company_data",
  VerifyEmail = "verify_email",
  WebScraper = "web_scraper",
  MobilePhone = "mobile_phone",
  HubSpot = "hubspot",
  Salesforce = "salesforce",
}

export const leadsTypeOptions: LeadsColumnType[] = [
  {
    id: LeadsTypeEnum.Text,
    name: "Text",
    description: "Text can be referenced by other columns as context",
    icon: <Type className="text-gray-400" />,
  },
  {
    id: LeadsTypeEnum.LinkedInScraper,
    name: "LinkedIn Scraper",
    description: "Capture content from a LinkedIn profile (Person or Company).",
    icon: (
      <div className="flex items-center justify-center">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="2" fill="#0A66C2" />
          <path
            d="M5 9.5H8.5V19H5V9.5ZM6.75 8C5.75 8 5 7.25 5 6.25C5 5.25 5.75 4.5 6.75 4.5C7.75 4.5 8.5 5.25 8.5 6.25C8.5 7.25 7.75 8 6.75 8ZM13 19H10V9.5H13V11C13.5 10 14.75 9 16.5 9C19 9 20 11 20 13.25V19H17V14C17 12.75 16.25 12 15.25 12C14.25 12 13 13 13 14.25V19Z"
            fill="white"
          />
        </svg>
      </div>
    ),
  },
  {
    id: LeadsTypeEnum.FindWorkEmail,
    name: "Find Work Email",
    description:
      "Locate a professional email based on a person's name and company.",
    icon: <Mail className="text-blue-600" />,
  },
  {
    id: LeadsTypeEnum.VerifyEmail,
    name: "Verify Email",
    description: "Check if an email address is valid and active.",
    icon: <CheckSquare className="text-blue-400" />,
  },
  {
    id: LeadsTypeEnum.FindPhoneNumber,
    name: "Mobile Phone Number",
    description: "Retrieve or verify mobile phone numbers.",
    icon: <Smartphone className="text-gray-700" />,
  },
  {
    id: LeadsTypeEnum.FindLeadsUsingDomain,
    name: "Find Leads",
    description: "Find leads using a specific domain.",
    icon: <Target className="text-blue-600" />,
  },
  {
    id: LeadsTypeEnum.FindLinkedInUrl,
    name: "Find LinkedIn URL",
    description: "Find a LinkedIn profile URL based on a person's name.",
    icon: <UserSearch className="text-gray-700" />,
  },
  {
    id: LeadsTypeEnum.WebScraper,
    name: "Web Scraper",
    description: "Extract content from web pages dynamically.",
    icon: (
      <div className="flex h-4 w-4 items-center justify-center rounded border border-purple-500 text-purple-500">
        <Globe className="h-3 w-3" />
      </div>
    ),
  },
  {
    id: LeadsTypeEnum.HubSpot,
    name: "HubSpot",
    description: "Sync data with HubSpot CRM.",
    icon: (
      <div className="flex h-4 w-4 items-center justify-center rounded-full bg-orange-500">
        <span className="text-xs font-bold text-orange-500">H</span>
      </div>
    ),
  },
  {
    id: LeadsTypeEnum.Salesforce,
    name: "Salesforce",
    description: "Manage customer relationships using Salesforce.",
    icon: (
      <div className="flex items-center justify-center">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.5 7C10.9 5.6 13.1 5.6 14.5 7C15.9 8.4 15.9 10.6 14.5 12C13.1 13.4 10.9 13.4 9.5 12C8.1 10.6 8.1 8.4 9.5 7Z"
            fill="#00A1E0"
          />
          <path
            d="M5.5 11C6.9 9.6 9.1 9.6 10.5 11C11.9 12.4 11.9 14.6 10.5 16C9.1 17.4 6.9 17.4 5.5 16C4.1 14.6 4.1 12.4 5.5 11Z"
            fill="#00A1E0"
          />
          <path
            d="M13.5 11C14.9 9.6 17.1 9.6 18.5 11C19.9 12.4 19.9 14.6 18.5 16C17.1 17.4 14.9 17.4 13.5 16C12.1 14.6 12.1 12.4 13.5 11Z"
            fill="#00A1E0"
          />
        </svg>
      </div>
    ),
  },
] as const;
