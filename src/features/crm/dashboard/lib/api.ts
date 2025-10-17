import {
  CompaniesParams,
  CompaniesResponse,
  Company,
  Contact,
  ContactsParams,
  ContactsResponse,
  Lead,
  LeadsParams,
  LeadsResponse,
} from "../types";

const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Sunday Jenkins",
    avatar: "/placeholder.svg?height=40&width=40",
    organization: "GreyandCore's Inc",
    role: "Chief Marketing Officer",
    assignedTo: "Stephen Ogundele",
    email: "emailmaria@hubspot.com",
    phone: "+234 567 890 890",
    linkedin: "emailmaria@hubspot.com",
    status: "active",
  },
  {
    id: "2",
    name: "Morgan Shelly",
    avatar: "/placeholder.svg?height=40&width=40",
    organization: "TechCorp Solutions",
    role: "Account Executive Deal",
    assignedTo: "Stephen Ogundele",
    email: "morgan.shelly@techcorp.com",
    phone: "+234 567 890 891",
    linkedin: "morgan.shelly@linkedin.com",
    status: "active",
  },
  {
    id: "3",
    name: "Justin Welsh",
    avatar: "/placeholder.svg?height=40&width=40",
    organization: "Welsh Consulting",
    role: "Founder Justin Welsh",
    assignedTo: "Stephen Ogundele",
    email: "justin@welsh.com",
    phone: "+234 567 890 892",
    linkedin: "justin@welsh.com",
    status: "active",
  },
  {
    id: "4",
    name: "Alex Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    organization: "Innovation Labs",
    role: "Product Manager",
    assignedTo: "Sarah Johnson",
    email: "alex@innovationlabs.com",
    phone: "+234 567 890 893",
    linkedin: "alex.rodriguez@linkedin.com",
    status: "active",
  },
  {
    id: "5",
    name: "Emma Thompson",
    avatar: "/placeholder.svg?height=40&width=40",
    organization: "Digital Solutions",
    role: "UX Designer",
    assignedTo: "Michael Brown",
    email: "emma@digitalsolutions.com",
    phone: "+234 567 890 894",
    linkedin: "emma.thompson@linkedin.com",
    status: "inactive",
  },
];

const mockCompanies: Company[] = [
  {
    id: "1",
    name: "Apple",
    companyOwner: "Tim Cook",
    industry: "Software and Technology",
    assignedTo: "Stephen Ogundele",
    organizationSize: "100 - 50,000 Employees",
    links: {
      email: "emailmaria@hubspot.com",
      linkedin: "emailmaria@hubspot.com",
      phone: "+234 567 890 890",
      website: "https://apple.com",
    },
    status: "active",
  },
  {
    id: "2",
    name: "Microsoft",
    companyOwner: "Satya Nadella",
    industry: "Software and Technology",
    assignedTo: "Sarah Johnson",
    organizationSize: "50,000+ Employees",
    links: {
      email: "contact@microsoft.com",
      linkedin: "microsoft",
      phone: "+1 425 882 8080",
      website: "https://microsoft.com",
    },
    status: "active",
  },
  {
    id: "3",
    name: "Google",
    companyOwner: "Sundar Pichai",
    industry: "Software and Technology",
    assignedTo: "Michael Brown",
    organizationSize: "50,000+ Employees",
    links: {
      email: "contact@google.com",
      linkedin: "google",
      phone: "+1 650 253 0000",
      website: "https://google.com",
    },
    status: "active",
  },
];

const mockLeads: Lead[] = [
  {
    id: "1",
    campaignName: "New Clothing Line",
    organization: "Apple",
    contactsCount: 3,
    assignedTo: "Stephen Ogundele",
    sequence: "LinkedIn message",
    leadStage: "Pending",
    contacts: [
      {
        id: "1",
        name: "Tim Cook",
        role: "CEO",
        sequence: "LinkedIn message",
        leadStage: "Pending",
      },
      {
        id: "2",
        name: "Craig Federighi",
        role: "Senior VP Software Engineering",
        sequence: "Email follow-up",
        leadStage: "Qualified",
      },
      {
        id: "3",
        name: "Johnny Srouji",
        role: "Senior VP Hardware Technologies",
        sequence: "Phone call",
        leadStage: "Pending",
      },
    ],
    status: "active",
  },
  {
    id: "2",
    campaignName: "Enterprise Solutions",
    organization: "Microsoft",
    contactsCount: 2,
    assignedTo: "Sarah Johnson",
    sequence: "Email outreach",
    leadStage: "Qualified",
    contacts: [
      {
        id: "4",
        name: "Satya Nadella",
        role: "CEO",
        sequence: "Email outreach",
        leadStage: "Qualified",
      },
      {
        id: "5",
        name: "Amy Hood",
        role: "CFO",
        sequence: "LinkedIn message",
        leadStage: "Pending",
      },
    ],
    status: "active",
  },
  {
    id: "3",
    campaignName: "AI Partnership",
    organization: "Google",
    contactsCount: 4,
    assignedTo: "Michael Brown",
    sequence: "Cold call",
    leadStage: "Converted",
    contacts: [
      {
        id: "6",
        name: "Sundar Pichai",
        role: "CEO",
        sequence: "Cold call",
        leadStage: "Converted",
      },
      {
        id: "7",
        name: "Ruth Porat",
        role: "CFO",
        sequence: "Email follow-up",
        leadStage: "Converted",
      },
      {
        id: "8",
        name: "Thomas Kurian",
        role: "CEO Google Cloud",
        sequence: "LinkedIn message",
        leadStage: "Qualified",
      },
      {
        id: "9",
        name: "Neal Mohan",
        role: "CEO YouTube",
        sequence: "Phone call",
        leadStage: "Pending",
      },
    ],
    status: "active",
  },
];

// Mock API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchContacts(
  params: ContactsParams = {},
): Promise<ContactsResponse> {
  await delay(500); // Simulate API delay

  const {
    page = 1,
    pageSize = 24,
    search = "",
    filter = "",
    sortBy = "name",
    sortOrder = "asc",
  } = params;

  let filteredContacts = [...mockContacts];

  // Apply search filter
  if (search) {
    filteredContacts = filteredContacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase()) ||
        contact.organization.toLowerCase().includes(search.toLowerCase()) ||
        contact.role.toLowerCase().includes(search.toLowerCase()) ||
        contact.email.toLowerCase().includes(search.toLowerCase()),
    );
  }

  // Apply status filter
  if (filter && filter !== "all") {
    filteredContacts = filteredContacts.filter(
      (contact) => contact.status === filter,
    );
  }

  // Apply sorting
  filteredContacts.sort((a, b) => {
    const aValue = a[sortBy as keyof Contact];
    const bValue = b[sortBy as keyof Contact];

    if (sortOrder === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  // Apply pagination
  const total = filteredContacts.length;
  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedContacts = filteredContacts.slice(startIndex, endIndex);

  return {
    data: paginatedContacts,
    total,
    page,
    pageSize,
    totalPages,
  };
}

export async function fetchCompanies(
  params: CompaniesParams = {},
): Promise<CompaniesResponse> {
  await delay(500); // Simulate API delay

  const {
    page = 1,
    pageSize = 24,
    search = "",
    filter = "",
    sortBy = "name",
    sortOrder = "asc",
  } = params;

  let filteredCompanies = [...mockCompanies];

  // Apply search filter
  if (search) {
    filteredCompanies = filteredCompanies.filter(
      (company) =>
        company.name.toLowerCase().includes(search.toLowerCase()) ||
        company.companyOwner.toLowerCase().includes(search.toLowerCase()) ||
        company.industry.toLowerCase().includes(search.toLowerCase()),
    );
  }

  // Apply industry filter
  if (filter && filter !== "all") {
    filteredCompanies = filteredCompanies.filter((company) =>
      company.industry.toLowerCase().includes(filter.toLowerCase()),
    );
  }

  // Apply sorting
  filteredCompanies.sort((a, b) => {
    const aValue = a[sortBy as keyof Company];
    const bValue = b[sortBy as keyof Company];

    if (sortOrder === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  // Apply pagination
  const total = filteredCompanies.length;
  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);

  return {
    data: paginatedCompanies,
    total,
    page,
    pageSize,
    totalPages,
  };
}

export async function fetchLeads(
  params: LeadsParams = {},
): Promise<LeadsResponse> {
  await delay(500); // Simulate API delay

  const {
    page = 1,
    pageSize = 24,
    search = "",
    filter = "",
    sortBy = "campaignName",
    sortOrder = "asc",
  } = params;

  let filteredLeads = [...mockLeads];

  // Apply search filter
  if (search) {
    filteredLeads = filteredLeads.filter(
      (lead) =>
        lead.campaignName.toLowerCase().includes(search.toLowerCase()) ||
        lead.organization.toLowerCase().includes(search.toLowerCase()),
    );
  }

  // Apply lead stage filter
  if (filter && filter !== "all") {
    filteredLeads = filteredLeads.filter(
      (lead) => lead.leadStage.toLowerCase() === filter.toLowerCase(),
    );
  }

  // Apply sorting
  filteredLeads.sort((a, b) => {
    const aValue = a[sortBy as keyof Lead];
    const bValue = b[sortBy as keyof Lead];

    if (sortOrder === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  // Apply pagination
  const total = filteredLeads.length;
  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedLeads = filteredLeads.slice(startIndex, endIndex);

  return {
    data: paginatedLeads,
    total,
    page,
    pageSize,
    totalPages,
  };
}
