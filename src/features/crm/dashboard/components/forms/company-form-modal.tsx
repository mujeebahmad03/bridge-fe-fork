"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NameField, AssignedToField, LinksSection } from "./shared-form-fields";

import { type CompanyFormData, companyFormSchema } from "@/crm/dashboard/lib";

interface CompanyFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  company?: CompanyFormData;
  mode: "create" | "edit";
}

export function CompanyFormModal({
  open,
  onOpenChange,
  company,
  mode,
}: CompanyFormModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: company || {
      name: "",
      companyOwner: "",
      industry: "",
      assignedTo: "",
      organizationSize: "",
      email: "",
      linkedin: "",
      phone: "",
    },
  });

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Manufacturing",
    "Retail",
    "Real Estate",
    "Consulting",
    "Media",
    "Transportation",
  ];

  const organizationSizes = [
    "1-10 Employees",
    "11-50 Employees",
    "51-200 Employees",
    "201-500 Employees",
    "501-1000 Employees",
    "1000+ Employees",
  ];

  const onSubmit = async (data: CompanyFormData) => {
    setIsLoading(true);
    try {
      // TODO: Implement API call
      console.log("Company form data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Error saving company:", error);
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
            {mode === "create" ? "Add Company" : "Edit Company"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <NameField control={form.control} />

            <FormField
              control={form.control}
              name="companyOwner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Company Owner</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter company owner"
                      className="border-primary/20 bg-gradient-to-r from-background to-muted/5 focus:border-primary/40"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Industry</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-primary/20 bg-gradient-to-r from-background to-muted/5 focus:border-primary/40">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AssignedToField control={form.control} />
            <LinksSection control={form.control} />

            <FormField
              control={form.control}
              name="organizationSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">
                    Organization Size
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-primary/20 bg-gradient-to-r from-background to-muted/5 focus:border-primary/40">
                        <SelectValue placeholder="Select organization size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {organizationSizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

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
