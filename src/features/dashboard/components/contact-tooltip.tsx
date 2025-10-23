"use client";

import React from "react";

import {
  Mail,
  Phone,
  Linkedin,
  Building2,
  Users,
  Briefcase,
  Globe,
} from "lucide-react";

import { Company, Contact } from "@/crm/dashboard/types";

interface ContactTooltipProps {
  contact?: Contact;
  company?: Company;
  children: React.ReactNode;
}

export function ContactTooltip({
  contact,
  company,
  children,
}: ContactTooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>

      {isVisible && (contact || company) && (
        <div className="absolute left-0 top-full z-50 mt-2 w-72 rounded-lg border border-border bg-popover p-4 shadow-lg animate-in fade-in-0 zoom-in-95">
          {contact && (
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                  {contact.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-foreground">
                    {contact.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {contact.role}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {contact.organization}
                  </p>
                </div>
                <div
                  className={`rounded px-2 py-0.5 text-xs ${
                    contact.status === "active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  {contact.status}
                </div>
              </div>

              <div className="space-y-2 border-t border-border pt-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="truncate text-muted-foreground hover:text-foreground"
                  >
                    {contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {contact.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Linkedin className="h-4 w-4 text-[#0A66C2]" />
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate text-muted-foreground hover:text-foreground"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>
          )}

          {company && (
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Building2 className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-foreground">
                    {company.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {company.industry}
                  </p>
                </div>
                <div
                  className={`rounded px-2 py-0.5 text-xs ${
                    company.status === "active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  {company.status}
                </div>
              </div>

              <div className="space-y-2 border-t border-border pt-2">
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Owner: {company.companyOwner}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {company.organizationSize}
                  </span>
                </div>

                {company.links.website && (
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    <a
                      href={company.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate text-muted-foreground hover:text-foreground"
                    >
                      {company.links.website}
                    </a>
                  </div>
                )}
                {company.links.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <a
                      href={`mailto:${company.links.email}`}
                      className="truncate text-muted-foreground hover:text-foreground"
                    >
                      {company.links.email}
                    </a>
                  </div>
                )}
                {company.links.linkedin && (
                  <div className="flex items-center gap-2 text-sm">
                    <Linkedin className="h-4 w-4 text-[#0A66C2]" />
                    <a
                      href={company.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate text-muted-foreground hover:text-foreground"
                    >
                      LinkedIn Page
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
