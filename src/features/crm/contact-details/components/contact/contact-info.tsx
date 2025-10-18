"use client";

import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { EditableField } from "./editable-field";

interface Contact {
  email: string;
  phone: string;
  address: string;
  websiteUrl: string;
}

interface ContactInfoProps {
  contact: Contact;
  onUpdateField: (field: string, value: string) => void;
  isCompany: boolean;
}

export function ContactInfo({
  contact,
  onUpdateField,
  isCompany,
}: ContactInfoProps) {
  return (
    <div className="space-y-3">
      <EditableField
        label="Email"
        value={contact.email}
        icon={<Mail className="h-4 w-4 text-muted-foreground" />}
        onSave={(value) => onUpdateField("email", value)}
      />

      <EditableField
        label="Phone"
        value={contact.phone}
        icon={<Phone className="h-4 w-4 text-muted-foreground" />}
        onSave={(value) => onUpdateField("phone", value)}
      />

      {isCompany && (
        <>
          <EditableField
            label="Address"
            multiline
            value={contact.address}
            icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
            onSave={(value) => onUpdateField("address", value)}
          />

          <EditableField
            label="Website"
            value={contact.websiteUrl}
            icon={<ExternalLink className="h-4 w-4 text-muted-foreground" />}
            onSave={(value) => onUpdateField("websiteUrl", value)}
          />
        </>
      )}
    </div>
  );
}
