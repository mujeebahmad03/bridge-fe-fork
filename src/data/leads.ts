import { LeadsTypeEnum } from "@/config/leads";
import { LeadsColumn, LeadsRow, UploadHistory } from "@/types/leads";

// Sample data
export const initialCustomColumns: LeadsColumn[] = [
  { id: "firstName", name: "First Name", sortable: true },
  { id: "lastName", name: "Last Name", sortable: true },
  { id: "companyWebsite", name: "Company Website", sortable: true },
  {
    id: "email",
    name: "Email",
    type: LeadsTypeEnum.FindWorkEmail,
    sortable: true,
  },
  {
    id: "verifyEmail",
    name: "Verify Email",
    type: LeadsTypeEnum.VerifyEmail,
    sortable: true,
  },
];

export const initialCustomRow: LeadsRow[] = [
  {
    id: "1",
    firstName: "Stephen",
    lastName: "Curry",
    companyWebsite: "StephenandAisha.com",
    email: "stephcurry@gmail.com",
    verifyEmail: "",
  },
  ...Array(6)
    .fill(0)
    .map((_, i) => ({
      id: String(i + 2),
      firstName: "",
      lastName: "",
      companyWebsite: "",
      email: "",
      verifyEmail: "",
    })),
];

// Sample data
export const mockUploadHistoryData: UploadHistory[] = [
  {
    id: 1,
    serialNumber: 1,
    dateTime: "25th February, 2025 12:33 PM",
    title: "Find Work Email",
    outputFile: ".csv, .xlx",
  },
  {
    id: 2,
    serialNumber: 2,
    dateTime: "24th February, 2025 09:13 AM",
    title: "LinkedIn Profile",
    outputFile: ".csv",
  },
  {
    id: 3,
    serialNumber: 3,
    dateTime: "24th February, 2025 09:13 AM",
    title: "LinkedIn Profile",
    outputFile: ".csv, .xlx",
  },
  {
    id: 4,
    serialNumber: 4,
    dateTime: "24th February, 2025 09:13 AM",
    title: "LinkedIn Profile",
    outputFile: ".csv",
  },
];
