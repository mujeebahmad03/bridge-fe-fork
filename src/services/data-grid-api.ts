export interface IData {
  id: string;
  name: string;
  availability: "online" | "away" | "busy" | "offline";
  avatar: string;
  status: "Active" | "Inactive" | "Pending" | "Blocked";
  flag: string; // Emoji flags
  email: string;
  company: string;
  role: string;
  joined: string;
  location: string;
  balance: number;
}

// Mock API delay to simulate network request
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface DataGridApiParams {
  page: number;
  pageSize: number;
  search?: string;
  status?: string[];
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface DataGridApiResponse {
  data: IData[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Mock data - same as in the component
const mockData: IData[] = [
  {
    id: "1",
    name: "Kathryn Campbell",
    availability: "online",
    avatar: "1.png",
    status: "Active",
    flag: "🇺🇸",
    email: "kathryn@apple.com",
    company: "Apple",
    role: "CEO",
    joined: "2021-04-15",
    location: "San Francisco, USA",
    balance: 5143.03,
  },
  {
    id: "2",
    name: "Robert Smith",
    availability: "away",
    avatar: "2.png",
    status: "Inactive",
    flag: "🇬🇧",
    email: "robert@openai.com",
    company: "OpenAI",
    role: "CTO",
    joined: "2020-07-20",
    location: "London, UK",
    balance: 4321.87,
  },
  {
    id: "3",
    name: "Sophia Johnson",
    availability: "busy",
    avatar: "3.png",
    status: "Blocked",
    flag: "🇨🇦",
    email: "sophia@meta.com",
    company: "Meta",
    role: "Designer",
    joined: "2019-03-12",
    location: "Toronto, Canada",
    balance: 7654.98,
  },
  {
    id: "4",
    name: "Lucas Walker",
    availability: "offline",
    avatar: "4.png",
    status: "Inactive",
    flag: "🇦🇺",
    email: "lucas@tesla.com",
    company: "Tesla",
    role: "Developer",
    joined: "2022-01-18",
    location: "Sydney, Australia",
    balance: 3456.45,
  },
  {
    id: "5",
    name: "Emily Davis",
    availability: "online",
    avatar: "5.png",
    status: "Active",
    flag: "🇩🇪",
    email: "emily@sap.com",
    company: "SAP",
    role: "Lawyer",
    joined: "2023-05-23",
    location: "Berlin, Germany",
    balance: 9876.54,
  },
  {
    id: "6",
    name: "James Lee",
    availability: "away",
    avatar: "6.png",
    status: "Pending",
    flag: "🇲🇾",
    email: "james@keenthemes.com",
    company: "Keenthemes",
    role: "Director",
    joined: "2018-11-30",
    location: "Kuala Lumpur, MY",
    balance: 6214.22,
  },
  {
    id: "7",
    name: "Isabella Martinez",
    availability: "busy",
    avatar: "7.png",
    status: "Inactive",
    flag: "🇪🇸",
    email: "isabella@bbva.es",
    company: "BBVA",
    role: "Product Manager",
    joined: "2021-06-14",
    location: "Barcelona, Spain",
    balance: 5321.77,
  },
  {
    id: "8",
    name: "Benjamin Harris",
    availability: "offline",
    avatar: "8.png",
    status: "Blocked",
    flag: "🇯🇵",
    email: "benjamin@sony.jp",
    company: "Sony",
    role: "Marketing Lead",
    joined: "2020-10-22",
    location: "Tokyo, Japan",
    balance: 8452.39,
  },
  {
    id: "9",
    name: "Olivia Brown",
    availability: "online",
    avatar: "9.png",
    status: "Pending",
    flag: "🇫🇷",
    email: "olivia@lvmh.fr",
    company: "LVMH",
    role: "Data Scientist",
    joined: "2019-09-17",
    location: "Paris, France",
    balance: 7345.1,
  },
  {
    id: "10",
    name: "Michael Clark",
    availability: "away",
    avatar: "10.png",
    status: "Inactive",
    flag: "🇮🇹",
    email: "michael@eni.it",
    company: "ENI",
    role: "Engineer",
    joined: "2023-02-11",
    location: "Milan, Italy",
    balance: 5214.88,
  },
  {
    id: "11",
    name: "Ava Wilson",
    availability: "busy",
    avatar: "11.png",
    status: "Blocked",
    flag: "🇧🇷",
    email: "ava@vale.br",
    company: "Vale",
    role: "Software Engineer",
    joined: "2022-12-01",
    location: "Rio de Janeiro, Brazil",
    balance: 9421.5,
  },
  {
    id: "12",
    name: "David Young",
    availability: "offline",
    avatar: "12.png",
    status: "Active",
    flag: "🇮🇳",
    email: "david@tata.in",
    company: "Tata",
    role: "Sales Manager",
    joined: "2020-03-27",
    location: "Mumbai, India",
    balance: 4521.67,
  },
];

export const fetchDataGridData = async (
  params: DataGridApiParams,
): Promise<DataGridApiResponse> => {
  // Simulate API delay
  await delay(300);

  let filteredData = [...mockData];

  // Apply search filter
  if (params.search && params.search.trim()) {
    const searchLower = params.search.toLowerCase();
    filteredData = filteredData.filter((item) =>
      Object.values(item).join(" ").toLowerCase().includes(searchLower),
    );
  }

  // Apply status filter
  if (params.status && params.status.length > 0) {
    filteredData = filteredData.filter((item) =>
      params.status!.includes(item.status),
    );
  }

  // Apply sorting
  if (params.sortBy) {
    filteredData.sort((a, b) => {
      const aValue = a[params.sortBy as keyof IData];
      const bValue = b[params.sortBy as keyof IData];

      if (typeof aValue === "string" && typeof bValue === "string") {
        const comparison = aValue.localeCompare(bValue);
        return params.sortOrder === "desc" ? -comparison : comparison;
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        const comparison = aValue - bValue;
        return params.sortOrder === "desc" ? -comparison : comparison;
      }

      return 0;
    });
  }

  // Calculate pagination
  const total = filteredData.length;
  const totalPages = Math.ceil(total / params.pageSize);
  const startIndex = (params.page - 1) * params.pageSize;
  const endIndex = startIndex + params.pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    total,
    page: params.page,
    pageSize: params.pageSize,
    totalPages,
  };
};

export const getStatusCounts = async (): Promise<Record<string, number>> => {
  // Simulate API delay
  await delay(100);

  return mockData.reduce(
    (acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
};
