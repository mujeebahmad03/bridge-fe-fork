"use client";

import type React from "react";

import {
  Mail,
  Linkedin,
  User,
  Building,
  CheckCircle,
  FileText,
  ChevronDown,
} from "lucide-react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui";

import { cn } from "@/lib/utils";
import { TemplateType } from "@/types/leads";

interface TemplateSelectorProps {
  value: TemplateType;
  onChange: (template: TemplateType) => void;
}

interface TemplateOption {
  value: TemplateType;
  label: string;
  icon: React.ReactNode;
  description?: string;
}

const TEMPLATE_OPTIONS: TemplateOption[] = [
  {
    value: TemplateType.FIND_WORK_EMAIL,
    label: "Find Work Email",
    icon: <Mail className="h-4 w-4 text-blue-500" />,
    description:
      "Find work emails using first name, last name, and company domain",
  },
  {
    value: TemplateType.LINKEDIN_TO_EMAIL,
    label: "LinkedIn URL to Work Email",
    icon: <Linkedin className="h-4 w-4 text-blue-600" />,
    description: "Convert LinkedIn profiles to work emails",
  },
  {
    value: TemplateType.FULL_NAME_TO_LINKEDIN,
    label: "Full Name to LinkedIn Profile",
    icon: <User className="h-4 w-4 text-green-500" />,
    description: "Find LinkedIn profiles using full names",
  },
  {
    value: TemplateType.EMAIL_TO_LINKEDIN,
    label: "Email to LinkedIn Profile",
    icon: <Linkedin className="h-4 w-4 text-blue-600" />,
    description: "Find LinkedIn profiles using email addresses",
  },
  {
    value: TemplateType.FIND_WORK_EMAIL_AND_LINKEDIN,
    label: "Find Work Email & LinkedIn URL",
    icon: <Mail className="h-4 w-4 text-purple-500" />,
    description: "Find both work emails and LinkedIn profiles",
  },
  {
    value: TemplateType.FIND_LEADS_BY_DOMAIN,
    label: "Find Leads using Domain",
    icon: <Building className="h-4 w-4 text-orange-500" />,
    description: "Find leads at companies using their domain",
  },
  // {
  //   value: TemplateType.COMPANY_DATA,
  //   label: "Company Data",
  //   icon: <Building className="h-4 w-4 text-gray-500" />,
  //   description: "Get company information and details",
  // },
  {
    value: TemplateType.VERIFY_EMAIL,
    label: "Verify Email",
    icon: <CheckCircle className="h-4 w-4 text-green-500" />,
    description: "Verify email addresses for deliverability",
  },
  {
    value: TemplateType.CUSTOM,
    label: "Custom",
    icon: <FileText className="h-4 w-4 text-gray-500" />,
    description: "Create a custom template with your own fields",
  },
];

export function TemplateSelector({ value, onChange }: TemplateSelectorProps) {
  const selectedTemplate =
    TEMPLATE_OPTIONS.find((t) => t.value === value) || TEMPLATE_OPTIONS[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex h-9 items-center gap-2 px-3">
          {selectedTemplate.icon}
          <span>{selectedTemplate.label}</span>
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[300px]">
        {TEMPLATE_OPTIONS.map((template) => (
          <DropdownMenuItem
            key={template.value}
            onClick={() => onChange(template.value)}
            className={cn(
              "flex items-start gap-2 py-2",
              template.value === value && "bg-muted",
            )}
          >
            <div className="mt-0.5">{template.icon}</div>
            <div>
              <div className="font-medium">{template.label}</div>
              {template.description && (
                <div className="mt-1 text-xs text-muted-foreground">
                  {template.description}
                </div>
              )}
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-xs text-muted-foreground">
          Templates provide predefined column structures for common tasks
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
