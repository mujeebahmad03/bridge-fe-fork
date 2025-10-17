"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Search,
  Mail,
  Phone,
  MoreHorizontal,
  Edit,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Contact } from "@/crmContacts/types";

interface ContactsSectionProps {
  contacts: Partial<Contact>[];
  setContacts: (contacts: Partial<Contact>[]) => void;
}

export function ContactsSection({
  contacts,
  setContacts,
}: ContactsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [editingContact, setEditingContact] = useState<Partial<Contact> | null>(
    null,
  );
  const [editForm, setEditForm] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    socials: "",
  });

  const filteredContacts = contacts.filter(
    (contact) =>
      (contact?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (contact?.role || "").toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const displayedContacts = showAll
    ? filteredContacts
    : filteredContacts.slice(0, 3);

  const handleEditContact = (contact: Partial<Contact>) => {
    setEditingContact(contact);
    setEditForm({
      name: contact.name || "",
      role: contact.role || "",
      email: contact.email || "",
      phone: contact.phone || "",
      socials: contact.socials || "",
    });
  };

  const handleSaveContact = () => {
    if (editingContact) {
      const updatedContacts = contacts.map((contact) =>
        contact.id === editingContact.id
          ? { ...contact, ...editForm }
          : contact,
      );
      setContacts(updatedContacts);
      setEditingContact(null);
    }
  };

  return (
    <div className="space-y-4">
      <Button
        variant="ghost"
        className="h-auto w-full justify-between p-0 text-xs font-medium uppercase tracking-wide text-muted-foreground hover:bg-transparent lg:text-sm"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          Contacts
          <Badge variant="secondary" className="text-xs">
            {contacts.length}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              // Handle add contact
            }}
          >
            <Plus className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              // Handle search
            }}
          >
            <Search className="h-3 w-3" />
          </Button>
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </div>
      </Button>
      {isExpanded && (
        <div className="animate-fade-in space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-sm"
            />
          </div>

          {displayedContacts.map((contact) => (
            <Card
              key={contact.id}
              className="transition-all duration-200 hover:shadow-sm"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h4 className="truncate text-sm font-medium">
                        {contact.name}
                      </h4>
                    </div>
                    <p className="mb-3 text-xs text-muted-foreground">
                      {contact.role}
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground">Office</span>
                        <span className="font-medium">{contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground">Office</span>
                        <span className="truncate font-medium">
                          {contact.email}
                        </span>
                      </div>
                      {contact.socials && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-muted-foreground">Socials</span>
                          <span className="truncate font-medium text-primary">
                            {contact.socials}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="ml-2 flex items-center gap-1">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleEditContact(contact)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Contact
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredContacts.length > 3 && !showAll && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => setShowAll(true)}
            >
              Show {filteredContacts.length - 3} more
            </Button>
          )}

          {showAll && filteredContacts.length > 3 && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => setShowAll(false)}
            >
              Show less
            </Button>
          )}

          {contacts.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              <p className="text-sm">No contacts yet</p>
              <Button variant="ghost" size="sm" className="mt-2">
                <Plus className="mr-2 h-4 w-4" />
                Add your first contact
              </Button>
            </div>
          )}
        </div>
      )}

      <Dialog
        open={!!editingContact}
        onOpenChange={() => setEditingContact(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Contact</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={editForm.role}
                onChange={(e) =>
                  setEditForm({ ...editForm, role: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={editForm.phone}
                onChange={(e) =>
                  setEditForm({ ...editForm, phone: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="socials">Social Links</Label>
              <Input
                id="socials"
                value={editForm.socials}
                onChange={(e) =>
                  setEditForm({ ...editForm, socials: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setEditingContact(null)}>
                Cancel
              </Button>
              <Button onClick={handleSaveContact}>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
