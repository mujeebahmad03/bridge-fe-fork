import { Company } from "../types";

// Sample companies data
export const sampleCompanies: Company[] = [
  {
    id: "comp-001",
    name: "Tech Solutions Inc",
    companyOwner: "John Smith",
    industry: "Technology",
    assignedTo: "Alice Johnson",
    organizationSize: "50-100",
    links: {
      email: "contact@techsolutions.com",
      linkedin: "techsolutions-inc",
      phone: "+1-555-0123",
      website: "https://techsolutions.com",
    },
    status: "active",
  },
  {
    id: "comp-002",
    name: "Global Manufacturing Co",
    companyOwner: "Maria Garcia",
    industry: "Manufacturing",
    assignedTo: "Bob Wilson",
    organizationSize: "500+",
    links: {
      email: "info@globalmanufacturing.com",
      linkedin: "global-manufacturing",
      phone: "+1-555-0456",
      website: "https://globalmanufacturing.com",
    },
    status: "active",
  },
  {
    id: "comp-003",
    name: "Healthcare Partners LLC",
    companyOwner: "Dr. Sarah Brown",
    industry: "Healthcare",
    assignedTo: "Carol Davis",
    organizationSize: "10-50",
    links: {
      email: "contact@healthcarepartners.com",
      linkedin: "healthcare-partners",
      phone: "+1-555-0789",
    },
    status: "inactive",
  },
  {
    id: "comp-004",
    name: "Financial Advisors Group",
    companyOwner: "Michael Johnson",
    industry: "Financial Services",
    assignedTo: "David Miller",
    organizationSize: "100-500",
    links: {
      email: "hello@financialadvisors.com",
      linkedin: "financial-advisors-group",
      phone: "+1-555-0321",
      website: "https://financialadvisors.com",
    },
    status: "active",
  },
  {
    id: "comp-005",
    name: "Retail Solutions Ltd",
    companyOwner: "Emily White",
    industry: "Retail",
    assignedTo: "Eve Anderson",
    organizationSize: "1-10",
    links: {
      email: "support@retailsolutions.com",
      phone: "+1-555-0654",
      website: "https://retailsolutions.com",
    },
    status: "active",
  },
];
