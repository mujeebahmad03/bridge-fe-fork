export interface Contact {
  id: string;
  name: string;
  avatar: string;
  organization: string;
  role: string;
  assignedTo: string;
  email: string;
  phone: string;
  linkedin: string;
  status: "active" | "inactive";
}

export interface ContactsResponse {
  data: Contact[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ContactsParams {
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface Company {
  id: string;
  name: string;
  companyOwner: string;
  industry: string;
  assignedTo: string;
  organizationSize: string;
  links: {
    email?: string;
    linkedin?: string;
    phone?: string;
    website?: string;
  };
  status: "active" | "inactive";
}

export interface CompaniesResponse {
  data: Company[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CompaniesParams {
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface Lead {
  id: string;
  campaignName: string;
  organization: string;
  contactsCount: number;
  assignedTo: string;
  sequence: string;
  leadStage: "Pending" | "Qualified" | "Converted" | "Lost";
  contacts: {
    id: string;
    name: string;
    role: string;
    sequence: string;
    leadStage: "Pending" | "Qualified" | "Converted" | "Lost";
  }[];
  status: "active" | "inactive";
}

export type EntityRowData = Contact | Company | Lead;

export interface ImportRowMap {
  contacts: Contact;
  companies: Company;
  leads: Lead;
}

export interface LeadsResponse {
  data: Lead[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface LeadsParams {
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface TableFilters {
  search?: string;
  filter?: string;
}

export interface PaginationConfig {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export interface CompanyLeads {
  id: string;
  campaignName: string;
  organization: string;
  contactsCount: number;
  assignedTo: string;
  sequence: string;
  leadStage: "Pending" | "Qualified" | "Converted" | "Lost";
  status: "active" | "inactive";
}

export interface ContactLeads {
  id: string;
  name: string;
  role: string;
  sequence: string;
  assignedTo: string;
  campaignName: string;
  organization: string;
  leadStage: "Pending" | "Qualified" | "Converted" | "Lost";
  status: "active" | "inactive";
}

export interface Leads {
  companies: CompanyLeads[];
  contacts: ContactLeads[];
}
