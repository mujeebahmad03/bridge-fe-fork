"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  campaignDetailsSchema,
  CampaignDetailsValues,
} from "@/lib/validations/campaign";
import { NewCampaignIllustration } from "@/components/common/illustrations";

interface CampaignDetailsStepProps {
  onNext: () => void;
  formData: CampaignDetailsValues;
  updateFormData: (data: CampaignDetailsValues) => void;
}

export function CampaignDetailsStep({
  onNext,
  formData,
  updateFormData,
}: CampaignDetailsStepProps) {
  const form = useForm<CampaignDetailsValues>({
    resolver: zodResolver(campaignDetailsSchema),
    defaultValues: {
      name: formData.name || "",
      goal: formData.goal || "",
      companyName: formData.companyName || "",
      companyInfo: formData.companyInfo || "",
      companyDomain: formData.companyDomain || "",
      valueProposition: formData.valueProposition || "",
      customerStories: formData.customerStories || "",
    },
  });

  function onSubmit(values: CampaignDetailsValues) {
    updateFormData(values);
    onNext();
  }

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="flex-1">
          <h2 className="text-xl font-semibold">
            Let&apos;s Create Your Campaign
          </h2>
          <p className="text-muted-foreground">
            Fill the boxes below to start a new campaign
          </p>
        </div>
        <div className="flex justify-center lg:w-1/3">
          <NewCampaignIllustration />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Campaign Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter campaign name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="goal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Campaign Goal</FormLabel>
                <FormControl>
                  <Input placeholder="Campaign goal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company/Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company/Product Info</FormLabel>
                <FormControl>
                  <Textarea placeholder="Product Info" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyDomain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company domain (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="www.company.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="valueProposition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value proposition</FormLabel>
                <FormControl>
                  <Textarea placeholder="Value proposition" {...field} />
                </FormControl>
                <FormDescription>
                  Clearly articulate the unique benefits your product or service
                  offers to customers and how it solves their problems.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customerStories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Stories</FormLabel>
                <FormControl>
                  <Textarea placeholder="Customer Stories" {...field} />
                </FormControl>
                <FormDescription>
                  Share real examples of how your product or service has helped
                  existing customers achieve success or solve problems.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit">Create Campaign</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
