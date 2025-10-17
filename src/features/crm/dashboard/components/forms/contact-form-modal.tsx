"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  NameField,
  OrganizationField,
  CompanyRoleField,
  AssignedToField,
  LinksSection,
} from "./shared-form-fields";

import { type ContactFormData, contactFormSchema } from "@/crm/dashboard/lib";

interface ContactFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contact?: ContactFormData;
  mode: "create" | "edit";
}

export function ContactFormModal({
  open,
  onOpenChange,
  contact,
  mode,
}: ContactFormModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: contact || {
      name: "",
      organization: "",
      companyRole: "",
      assignedTo: "",
      email: "",
      linkedin: "",
      phone: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    try {
      // TODO: Implement API call
      console.log("Contact form data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Error saving contact:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-md overflow-y-auto border-primary/20 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <div className="h-5 w-5 rounded bg-gradient-to-br from-primary to-primary/80" />
            {mode === "create" ? "Add Contact" : "Edit Contact"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <NameField control={form.control} />
            <OrganizationField control={form.control} />
            <CompanyRoleField control={form.control} />
            <AssignedToField control={form.control} />
            <LinksSection control={form.control} />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-primary/80 shadow-lg hover:from-primary/90 hover:to-primary/70"
            >
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
