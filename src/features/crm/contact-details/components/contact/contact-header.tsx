"use client";

import { Edit } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Contact } from "@/crmContacts/types";

interface ContactHeaderProps {
  contact: Contact;
  setContact: (contact: Contact) => void;
}

export function ContactHeader({ contact }: ContactHeaderProps) {
  return (
    <div className="sticky top-0 -mx-4 space-y-4 border-b border-border/50 bg-card/80 px-4 py-4 backdrop-blur-sm lg:-mx-6 lg:px-6">
      <div className="flex items-start gap-4">
        <Avatar className="h-12 w-12 ring-2 ring-primary/20 lg:h-16 lg:w-16">
          <AvatarImage src={contact.avatar || "/placeholder.svg"} />
          <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary lg:text-lg">
            {contact.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold lg:text-xl">{contact.name}</h1>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
              <Edit className="h-3 w-3" />
            </Button>
          </div>
          <Badge
            variant="secondary"
            className="bg-primary/10 text-xs text-primary hover:bg-primary/20"
          >
            {contact.role}
          </Badge>
        </div>
      </div>
    </div>
  );
}
