import {
  ExternalLink,
  Mail,
  Phone,
  Linkedin,
  Globe,
  Users,
  LinkIcon,
  Target,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Contact, Company, Lead } from "@/crm/dashboard/types";

export function ContactExpandedRow({ item: contact }: { item: Contact }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <ExternalLink className="h-4 w-4" />
        <span>Contact Links:</span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-2 rounded-md bg-gradient-to-r from-muted/20 to-muted/10 p-2">
          <Mail className="h-4 w-4 shrink-0 text-primary" />
          <a
            href={`mailto:${contact.email}`}
            className="truncate text-sm text-foreground transition-colors hover:text-primary"
          >
            {contact.email}
          </a>
        </div>

        <div className="flex items-center gap-2 rounded-md bg-gradient-to-r from-muted/20 to-muted/10 p-2">
          <Linkedin className="h-4 w-4 shrink-0 text-primary" />
          <a
            href={`https://linkedin.com/in/${contact.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate text-sm text-foreground transition-colors hover:text-primary"
          >
            LinkedIn
          </a>
        </div>

        <div className="flex items-center gap-2 rounded-md bg-gradient-to-r from-muted/20 to-muted/10 p-2">
          <Phone className="h-4 w-4 shrink-0 text-primary" />
          <a
            href={`tel:${contact.phone}`}
            className="truncate text-sm text-foreground transition-colors hover:text-primary"
          >
            {contact.phone}
          </a>
        </div>
      </div>
    </div>
  );
}

export function CompanyExpandedRow({ item: company }: { item: Company }) {
  return (
    <div className="mt-3 rounded-lg border-l-4 border-l-primary/30 bg-gradient-to-r from-muted/30 to-muted/10 p-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Globe className="h-4 w-4" />
            Links:
          </div>
          <div className="flex flex-wrap gap-2">
            {company.links.email && (
              <Button
                variant="outline"
                size="sm"
                className="h-8 bg-transparent text-xs"
              >
                <Mail className="mr-1 h-3 w-3" />
                <span className="hidden sm:inline">{company.links.email}</span>
                <span className="sm:hidden">Email</span>
              </Button>
            )}
            {company.links.linkedin && (
              <Button
                variant="outline"
                size="sm"
                className="h-8 bg-transparent text-xs"
              >
                <Linkedin className="mr-1 h-3 w-3" />
                LinkedIn
              </Button>
            )}
            {company.links.phone && (
              <Button
                variant="outline"
                size="sm"
                className="h-8 bg-transparent text-xs"
              >
                <Phone className="mr-1 h-3 w-3" />
                <span className="hidden sm:inline">{company.links.phone}</span>
                <span className="sm:hidden">Phone</span>
              </Button>
            )}
            {company.links.website && (
              <Button
                variant="outline"
                size="sm"
                className="h-8 bg-transparent text-xs"
              >
                <Globe className="mr-1 h-3 w-3" />
                Website
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Users className="h-4 w-4" />
            Organization Size:
          </div>
          <Badge variant="secondary" className="w-fit text-xs">
            {company.organizationSize}
          </Badge>
        </div>
      </div>
    </div>
  );
}

export function LeadExpandedRow({ item: lead }: { item: Lead }) {
  return (
    <div className="mt-3 rounded-lg border-l-4 border-l-primary/30 bg-gradient-to-r from-muted/30 to-muted/10 p-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <LinkIcon className="h-4 w-4" />
            Sequence:
          </div>
          <Badge variant="outline" className="w-fit text-xs">
            {lead.sequence}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Target className="h-4 w-4" />
            Lead Stage:
          </div>
          <Badge
            variant={
              lead.leadStage === "Pending"
                ? "secondary"
                : lead.leadStage === "Qualified" ||
                    lead.leadStage === "Converted"
                  ? "default"
                  : "destructive"
            }
            className="w-fit text-xs"
          >
            {lead.leadStage}
          </Badge>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Users className="h-4 w-4" />
          Individual Contacts ({lead.contacts.length}):
        </div>
        <div className="max-h-64 space-y-2 overflow-y-auto pr-2">
          {lead.contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex flex-col gap-3 rounded-lg border bg-background/50 p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage
                    src={`/placeholder.svg?height=32&width=32&text=${contact.name.charAt(
                      0,
                    )}`}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-xs text-primary">
                    {contact.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">
                    {contact.name}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">
                    {contact.role}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="whitespace-nowrap text-xs">
                  {contact.sequence}
                </Badge>
                <Badge
                  variant={
                    contact.leadStage === "Pending"
                      ? "secondary"
                      : contact.leadStage === "Qualified" ||
                          contact.leadStage === "Converted"
                        ? "default"
                        : "destructive"
                  }
                  className="whitespace-nowrap text-xs"
                >
                  {contact.leadStage}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
