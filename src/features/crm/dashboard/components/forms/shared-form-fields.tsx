"use client";

import { Link } from "lucide-react";
import type { Control, FieldPath } from "react-hook-form";

import {
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
import type {
  ContactFormData,
  CompanyFormData,
  LeadFormData,
} from "@/crm/dashboard/lib";

type FormData = ContactFormData | CompanyFormData | LeadFormData;

interface SharedFormFieldsProps<T extends FormData> {
  control: Control<T>;
}

// Name field
export function NameField<T extends FormData>({
  control,
}: SharedFormFieldsProps<T>) {
  return (
    <FormField
      control={control}
      name={"name" as FieldPath<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-primary">Name</FormLabel>
          <FormControl>
            <Input
              placeholder="Enter name"
              className="border-primary/20 bg-gradient-to-r from-background to-muted/5 focus:border-primary/40"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// Organization field
export function OrganizationField<T extends FormData>({
  control,
}: SharedFormFieldsProps<T>) {
  return (
    <FormField
      control={control}
      name={"organization" as FieldPath<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-primary">Organization</FormLabel>
          <FormControl>
            <Input
              placeholder="Enter organization"
              className="border-primary/20 bg-gradient-to-r from-background to-muted/5 focus:border-primary/40"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// Company Role field
export function CompanyRoleField<T extends FormData>({
  control,
}: SharedFormFieldsProps<T>) {
  const roles = [
    "CEO",
    "CTO",
    "CFO",
    "COO",
    "VP of Engineering",
    "VP of Sales",
    "VP of Marketing",
    "Director",
    "Manager",
    "Senior Developer",
    "Marketing Manager",
    "Sales Manager",
    "Chief Marketing Officer",
  ];

  return (
    <FormField
      control={control}
      name={"companyRole" as FieldPath<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-primary">Company Role</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="border-primary/20 bg-gradient-to-r from-background to-muted/5 focus:border-primary/40">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// Assigned To field
export function AssignedToField<T extends FormData>({
  control,
}: SharedFormFieldsProps<T>) {
  const assignees = [
    "Stephen Ogundele",
    "Michael Brown",
    "Sarah Johnson",
    "David Wilson",
    "Emily Davis",
    "James Miller",
    "Lisa Anderson",
    "Robert Taylor",
  ];

  return (
    <FormField
      control={control}
      name={"assignedTo" as FieldPath<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-primary">Assigned To</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="border-primary/20 bg-gradient-to-r from-background to-muted/5 focus:border-primary/40">
                <SelectValue placeholder="Select assignee" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {assignees.map((assignee) => (
                <SelectItem key={assignee} value={assignee}>
                  {assignee}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// Links section
export function LinksSection<T extends FormData>({
  control,
}: SharedFormFieldsProps<T>) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Link className="h-4 w-4" />
        Links
      </div>

      <FormField
        control={control}
        name={"email" as FieldPath<T>}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-primary">Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="Enter email address"
                className="border-primary/20 bg-gradient-to-r from-background to-muted/5 focus:border-primary/40"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={"linkedin" as FieldPath<T>}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-primary">LinkedIn</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter LinkedIn username"
                className="border-primary/20 bg-gradient-to-r from-background to-muted/5 focus:border-primary/40"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={"phone" as FieldPath<T>}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-primary">Phone Number</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter phone number"
                className="border-primary/20 bg-gradient-to-r from-background to-muted/5 focus:border-primary/40"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
