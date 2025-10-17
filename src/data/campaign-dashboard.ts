/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Campaign,
  FilterParams,
  PaginatedResponse,
  Tag,
  User,
} from "@/types/campaign";

// Sample data for demo purposes
const demoUsers: User[] = [
  { id: "u1", name: "Bridge Admin" },
  { id: "u2", name: "John Doe" },
  { id: "u3", name: "Jane Smith" },
];

const demoTags: Tag[] = [
  { id: "t1", name: "newTag" },
  { id: "t2", name: "marketing" },
  { id: "t3", name: "sales" },
  { id: "t4", name: "customers" },
];

const demoCampaigns: Campaign[] = [
  {
    id: "c1",
    status: "draft",
    name: "Bridge Admin's campaign",
    leadsCompleted: 10,
    leadsTotal: 100,
    sender: null,
    tags: ["newTag"],
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    creator: "u1",
  },
  {
    id: "c2",
    status: "in_progress",
    name: "Customer Outreach",
    leadsCompleted: 45,
    leadsTotal: 100,
    sender: "John Doe",
    tags: ["marketing", "customers"],
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    creator: "u2",
  },
  {
    id: "c3",
    status: "completed",
    name: "Q1 Newsletter",
    leadsCompleted: 200,
    leadsTotal: 200,
    sender: "Jane Smith",
    tags: ["marketing"],
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    creator: "u3",
  },
  {
    id: "c4",
    status: "paused",
    name: "Sales Follow-up",
    leadsCompleted: 78,
    leadsTotal: 150,
    sender: "John Doe",
    tags: ["sales"],
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    creator: "u2",
  },
  {
    id: "c5",
    status: "in_error",
    name: "Product Launch",
    leadsCompleted: 15,
    leadsTotal: 100,
    sender: "Jane Smith",
    tags: ["marketing", "sales"],
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    creator: "u3",
  },
];

// Simulated API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Filter campaigns based on provided filters
const filterCampaigns = (
  campaigns: Campaign[],
  filters: FilterParams,
): Campaign[] => {
  return campaigns.filter((campaign) => {
    // Search filter
    if (
      filters.search &&
      !campaign.name.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    // Status filter
    if (
      filters.status &&
      filters.status.length > 0 &&
      !filters.status.includes("all")
    ) {
      if (!filters.status.includes(campaign.status)) {
        return false;
      }
    }

    // Senders filter
    if (
      filters.senders &&
      filters.senders.length > 0 &&
      !filters.senders.includes("all")
    ) {
      if (!campaign.sender || !filters.senders.includes(campaign.sender)) {
        return false;
      }
    }

    // Tags filter
    if (
      filters.tags &&
      filters.tags.length > 0 &&
      !filters.tags.includes("all")
    ) {
      if (!campaign.tags.some((tag) => filters.tags!.includes(tag))) {
        return false;
      }
    }

    // Creators filter
    if (
      filters.creators &&
      filters.creators.length > 0 &&
      !filters.creators.includes("all")
    ) {
      if (!filters.creators.includes(campaign.creator)) {
        return false;
      }
    }

    return true;
  });
};

// Sort campaigns
const sortCampaigns = (
  campaigns: Campaign[],
  sortBy: string = "createdAt",
  sortOrder: "asc" | "desc" = "desc",
): Campaign[] => {
  return [...campaigns].sort((a, b) => {
    let aValue: any = a[sortBy as keyof Campaign];
    let bValue: any = b[sortBy as keyof Campaign];

    // Handle special cases
    if (sortBy === "leadsCompleted") {
      aValue = a.leadsCompleted / (a.leadsTotal || 1);
      bValue = b.leadsCompleted / (b.leadsTotal || 1);
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
};

// Paginate campaigns
const paginateCampaigns = (
  campaigns: Campaign[],
  page: number = 1,
  limit: number = 10,
): PaginatedResponse<Campaign> => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedCampaigns = campaigns.slice(startIndex, endIndex);

  return {
    data: paginatedCampaigns,
    meta: {
      total: campaigns.length,
      page,
      limit,
      totalPages: Math.ceil(campaigns.length / limit),
    },
  };
};

export const api = {
  // Get campaigns with filtering, sorting, and pagination
  getCampaigns: async (
    params: FilterParams = {},
  ): Promise<PaginatedResponse<Campaign>> => {
    await delay(500); // Simulate network delay

    const filteredCampaigns = filterCampaigns(demoCampaigns, params);
    const sortedCampaigns = sortCampaigns(
      filteredCampaigns,
      params.sortBy,
      params.sortOrder,
    );
    return paginateCampaigns(
      sortedCampaigns,
      params.page || 1,
      params.limit || 10,
    );
  },

  // Get users (for creators and senders filters)
  getUsers: async (): Promise<User[]> => {
    await delay(300);
    return demoUsers;
  },

  // Get tags
  getTags: async (): Promise<Tag[]> => {
    await delay(300);
    return demoTags;
  },

  // Create a new tag
  createTag: async (name: string): Promise<Tag> => {
    await delay(500);
    const newTag = { id: `t${demoTags.length + 1}`, name };
    demoTags.push(newTag);
    return newTag;
  },

  // Update campaign tags
  updateCampaignTags: async (
    campaignIds: string[],
    tags: string[],
  ): Promise<void> => {
    await delay(500);

    campaignIds.forEach((campaignId) => {
      const campaign = demoCampaigns.find((c) => c.id === campaignId);
      if (campaign) {
        campaign.tags = tags;
      }
    });
  },

  // Pause campaigns
  pauseCampaigns: async (campaignIds: string[]): Promise<void> => {
    await delay(500);

    campaignIds.forEach((campaignId) => {
      const campaign = demoCampaigns.find((c) => c.id === campaignId);
      if (campaign) {
        campaign.status = "paused";
      }
    });
  },

  // Resume campaigns
  resumeCampaigns: async (campaignIds: string[]): Promise<void> => {
    await delay(500);

    campaignIds.forEach((campaignId) => {
      const campaign = demoCampaigns.find((c) => c.id === campaignId);
      if (campaign && campaign.status === "paused") {
        campaign.status = "in_progress";
      }
    });
  },

  // Archive campaigns
  archiveCampaigns: async (campaignIds: string[]): Promise<void> => {
    await delay(500);

    campaignIds.forEach((campaignId) => {
      const campaign = demoCampaigns.find((c) => c.id === campaignId);
      if (campaign) {
        campaign.status = "archived";
      }
    });
  },

  // Delete campaigns
  deleteCampaigns: async (campaignIds: string[]): Promise<void> => {
    await delay(500);

    // Filtered out the campaigns to delete
    const remainingCampaigns = demoCampaigns.filter(
      (campaign) => !campaignIds.includes(campaign.id),
    );

    // Update the campaigns array
    demoCampaigns.length = 0;
    demoCampaigns.push(...remainingCampaigns);
  },
};
