"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  linkedInAccountSchema,
  type LinkedInAccountFormData,
} from "@/types/linkedin";
import {
  Loader2,
  ChevronDown,
  Linkedin,
  MessageSquare,
  Globe,
  Shield,
} from "lucide-react";

interface LinkedInAccountFormProps {
  onSubmit: (data: LinkedInAccountFormData) => void;
}

const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "in", label: "India" },
  { value: "sg", label: "Singapore" },
];

export function LinkedInAccountForm({ onSubmit }: LinkedInAccountFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOptionalSettings, setShowOptionalSettings] = useState(false);

  const form = useForm<LinkedInAccountFormData>({
    resolver: zodResolver(linkedInAccountSchema),
    defaultValues: {
      email: "",
      password: "",
      synchronizeChats: false,
      synchronizeMessages: false,
      country: "",
      useOwnProxy: false,
      proxyUrl: "",
    },
  });

  const useOwnProxy = form.watch("useOwnProxy");

  const handleSubmit = async (data: LinkedInAccountFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <Linkedin className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold">Sign In to LinkedIn</h1>
        </div>
        <p className="text-muted-foreground">Enter your credentials</p>
      </div>

      <Card className="mx-auto max-w-2xl">
        <CardContent className="p-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              {/* Basic Credentials */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="your.email@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Optional Settings */}
              <Collapsible
                open={showOptionalSettings}
                onOpenChange={setShowOptionalSettings}
              >
                <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                  <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                  Optional Settings
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 space-y-6">
                  {/* Messaging History Synchronization */}
                  <Card className="border-blue-200 dark:border-blue-800">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-sm font-medium text-blue-600">
                        <MessageSquare className="h-4 w-4" />
                        Messaging History Synchronization
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="synchronizeChats"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Synchronize chats</FormLabel>
                              <FormDescription>
                                Sync your LinkedIn chat conversations
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="synchronizeMessages"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Synchronize Messages</FormLabel>
                              <FormDescription>
                                Sync your LinkedIn direct messages
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* Localization */}
                  <Card className="border-green-200 dark:border-green-800">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-sm font-medium text-green-600">
                        <Globe className="h-4 w-4" />
                        Localization
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Choose from available countries
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {countries.map((country) => (
                                  <SelectItem
                                    key={country.value}
                                    value={country.value}
                                  >
                                    {country.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="useOwnProxy"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Use your own proxy</FormLabel>
                              <FormDescription>
                                Connect through your own proxy server
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />

                      {useOwnProxy && (
                        <FormField
                          control={form.control}
                          name="proxyUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Proxy URL</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="https://your-proxy-server.com"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Enter your proxy server URL
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>

              {/* Action Buttons */}
              <div className="flex flex-col justify-end gap-4 border-t pt-6 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex min-w-[120px] items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      Login
                      <Shield className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
