import {
  Home,
  Users,
  BarChart,
  Mail,
  Linkedin,
  Phone,
  FileText,
  ListChecks,
  Puzzle,
} from "lucide-react";

import { dashboardRoutes } from "./routes";
import { NavItem } from "@/types/components";

export const dashboardNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: dashboardRoutes.home,
    icon: Home,
  },
  {
    title: "Leads Enrichment",
    href: dashboardRoutes.leadsEnrichment,
    icon: Puzzle,
  },
  {
    title: "Campaign",
    href: dashboardRoutes.campaign,
    icon: BarChart,
  },
  {
    title: "Channels",
    href: dashboardRoutes.channels,
    icon: Mail,
    submenu: [
      {
        title: "Email",
        href: dashboardRoutes.emails,
        icon: Mail,
      },
      {
        title: "LinkedIn",
        href: dashboardRoutes.linkedIn,
        icon: Linkedin,
      },
      {
        title: "Phone",
        href: dashboardRoutes.phone,
        icon: Phone,
      },
    ],
  },
  {
    title: "CRM",
    href: dashboardRoutes.crm,
    icon: Users,
  },
  {
    title: "Tasks",
    href: dashboardRoutes.tasks,
    icon: ListChecks,
  },
  {
    title: "Templates",
    href: dashboardRoutes.templates,
    icon: FileText,
  },
];
