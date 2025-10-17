import {
  CompanyIcon,
  EmailIcon,
  LinkedInIcon,
} from "@/components/common/icons";

// Mock templates data
export const templates = [
  {
    id: "1",
    title: "Find Work Email",
    description:
      "Find work email of a person using their name and company domain",
    icon: EmailIcon,
  },
  {
    id: "2",
    title: "LinkedIn URL to Work Email",
    description: "Find work email of a person using their LinkedIn URL",
    icon: LinkedInIcon,
  },
  {
    id: "3",
    title: "Full Name to LinkedIn Profile",
    description: "Find the LinkedIn profile of a person via their full name",
    icon: LinkedInIcon,
  },
  {
    id: "4",
    title: "Email to LinkedIn Profile",
    description: "Find the LinkedIn profile of a person using their work email",
    icon: LinkedInIcon,
  },
  {
    id: "5",
    title: "Find Work Email & LinkedIn URL",
    description:
      "Find work email and LinkedIn URL of a person using their name",
    icon: EmailIcon,
  },
  {
    id: "6",
    title: "Find Leads using Domain",
    description: "Find leads using company name and domain",
    icon: EmailIcon,
  },
  {
    id: "7",
    title: "Company Data",
    description: "Find company data using company website and domain",
    icon: CompanyIcon,
  },
  {
    id: "8",
    title: "Verify Email",
    description: "Verify if the email address is valid, risky or invalid",
    icon: EmailIcon,
  },
];
