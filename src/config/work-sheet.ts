import { Linkedin, Type } from "lucide-react";

import { LeadsTypeEnum } from "./leads";
import { LeadsColumn, LeadsRow, TemplateType } from "@/types/leads";
import linkedinData from "@/data/linkedin-data";

export const DefaultTemplateFieldsMap: Record<
  Exclude<TemplateType, TemplateType.CUSTOM>,
  LeadsColumn[]
> = {
  [TemplateType.FIND_WORK_EMAIL]: [
    {
      id: "first_name",
      name: "First Name",
      type: LeadsTypeEnum.Text,
      icon: Type,
    },
    {
      id: "last_name",
      name: "Last Name",
      type: LeadsTypeEnum.Text,
      icon: Type,
    },
    {
      id: "company_domain",
      name: "Company Domain/Name",
      type: LeadsTypeEnum.Text,
      icon: Type,
    },
    {
      id: "work_email",
      name: "Work Email",
      type: LeadsTypeEnum.FindWorkEmail,
      sortable: true,
      icon: Type,
    },
  ],
  [TemplateType.LINKEDIN_TO_EMAIL]: [
    {
      id: "linkedin_url",
      name: "LinkedIn URL",
      type: LeadsTypeEnum.Text,
      icon: Type,
    },
    {
      id: "linkedin_data",
      name: "LinkedIn Data",
      type: LeadsTypeEnum.LinkedInScraper,
      icon: Linkedin,
    },
    { id: "first_name", name: "First Name", type: LeadsTypeEnum.Text },
    { id: "last_name", name: "Last Name", type: LeadsTypeEnum.Text },
    { id: "company_domain", name: "Company Domain", type: LeadsTypeEnum.Text },
    {
      id: "work_email",
      name: "Email",
      type: LeadsTypeEnum.FindWorkEmail,
      sortable: true,
    },
    {
      id: "verify_email",
      name: "Verify Email",
      type: LeadsTypeEnum.VerifyEmail,
      sortable: true,
    },
  ],
  [TemplateType.FULL_NAME_TO_LINKEDIN]: [
    {
      id: "first_name",
      name: "First Name",
      type: LeadsTypeEnum.Text,
      sortable: true,
    },
    {
      id: "last_name",
      name: "Last Name",
      type: LeadsTypeEnum.Text,
      sortable: true,
    },
  ],

  [TemplateType.EMAIL_TO_LINKEDIN]: [
    {
      id: "work_email",
      name: "Work Email",
      type: LeadsTypeEnum.Text,
    },
  ],

  [TemplateType.FIND_WORK_EMAIL_AND_LINKEDIN]: [
    {
      id: "first_name",
      name: "First Name",
      type: LeadsTypeEnum.Text,
      sortable: true,
    },
    {
      id: "last_name",
      name: "Last Name",
      type: LeadsTypeEnum.Text,
      sortable: true,
    },
  ],

  [TemplateType.FIND_LEADS_BY_DOMAIN]: [
    {
      id: "company_name",
      name: "Company Name",
      type: LeadsTypeEnum.Text,
      sortable: true,
      icon: Type,
    },
    { id: "domain", name: "Domain", type: LeadsTypeEnum.Text, icon: Type },
    { id: "leads", name: "Leads", type: LeadsTypeEnum.Text, icon: Type },
  ],
  [TemplateType.COMPANY_DATA]: [
    {
      id: "company_website",
      name: "Company Website",
      type: LeadsTypeEnum.Text,
      icon: Type,
    },
  ],
  [TemplateType.VERIFY_EMAIL]: [
    {
      id: "verify_email",
      name: "Verify Email",
      type: LeadsTypeEnum.VerifyEmail,
    },
  ],
};

export const DefaultRowMap: Record<
  Exclude<TemplateType, TemplateType.CUSTOM>,
  LeadsRow[]
> = {
  [TemplateType.FIND_WORK_EMAIL]: [],
  [TemplateType.LINKEDIN_TO_EMAIL]: [
    {
      id: "1",
      linkedin_url: "https://www.linkedin.com/in/kaijiabofeng/",
      linkedin_data: JSON.stringify(linkedinData),
      first_name: "Kai",
      last_name: "Bofeng",
      company_domain: "Linkedin",
      work_email: "t5m5a@example.com",
      verify_email: "valid",
    },
  ],
  [TemplateType.FULL_NAME_TO_LINKEDIN]: [
    {
      id: "1",
      first_name: "Kai",
      last_name: "Bofeng",
    },
  ],
  [TemplateType.EMAIL_TO_LINKEDIN]: [
    {
      id: "1",
      workEmail: "t5m5a@example.com",
    },
  ],
  [TemplateType.FIND_WORK_EMAIL_AND_LINKEDIN]: [
    {
      id: "1",
      first_name: "Kai",
      last_name: "Bofeng",
    },
  ],
  [TemplateType.FIND_LEADS_BY_DOMAIN]: [
    {
      id: "1",
      company_name: "Google",
      domain: "google.com",
    },
  ],
  [TemplateType.COMPANY_DATA]: [
    {
      id: "1",
      company_website: "https://google.com",
    },
  ],
  [TemplateType.VERIFY_EMAIL]: [
    {
      id: "1",
      email: "t5m5a@example.com",
    },
  ],
};
