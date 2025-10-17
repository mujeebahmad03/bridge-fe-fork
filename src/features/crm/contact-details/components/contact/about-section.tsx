"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ContactInfo } from "./contact-info";
import { StatusSection } from "./status-section";
import { CompanyInfo } from "./company-info";
import { Contact } from "@/crmContacts/types";

interface AboutSectionProps {
  contact: Contact;
  setContact: (contact: Contact) => void;
}

export function AboutSection({ contact, setContact }: AboutSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleUpdateField = (field: string, value: string) => {
    if (field === "description") {
      setContact({
        ...contact,
        company: {
          ...contact.company,
          description: value,
        },
      });
    } else {
      setContact({
        ...contact,
        [field]: value,
      });
    }
  };

  const handleLeadStatusChange = (value: string) => {
    setContact({
      ...contact,
      leadStatus: value,
    });
  };

  return (
    <div className="space-y-4">
      <Button
        variant="ghost"
        className="h-auto w-full justify-between p-0 text-xs font-medium uppercase tracking-wide text-muted-foreground hover:bg-transparent lg:text-sm"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        About
        {isExpanded ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>

      {isExpanded && (
        <div className="animate-fade-in space-y-4">
          <ContactInfo contact={contact} onUpdateField={handleUpdateField} />

          <Separator />

          <StatusSection
            leadStatus={contact.leadStatus}
            campaignStatus={contact.campaignStatus}
            onLeadStatusChange={handleLeadStatusChange}
          />

          <Separator />

          <CompanyInfo
            company={contact.company}
            onUpdateField={(value) => handleUpdateField("description", value)}
          />
        </div>
      )}
    </div>
  );
}
