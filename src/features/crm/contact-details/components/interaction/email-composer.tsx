"use client";

import type React from "react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { X, Send, Paperclip } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const emailSchema = z.object({
  from: z.string().min(1, "From email is required"),
  to: z
    .array(z.string().email("Invalid email address"))
    .min(1, "At least one recipient is required"),
  cc: z.array(z.string().email("Invalid email address")).optional(),
  bcc: z.array(z.string().email("Invalid email address")).optional(),
  subject: z.string().min(1, "Subject is required"),
  body: z.string().min(1, "Email body is required"),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface EmailComposerProps {
  isReply?: boolean;
  threadId?: string;
  replyToAll?: boolean;
  existingSubject?: string;
  onSend: (data: EmailFormData) => void;
  onCancel: () => void;
}

const userEmails = [
  "john.doe@company.com",
  "j.doe@company.com",
  "john@company.com",
];

export function EmailComposer({
  isReply = false,
  existingSubject = "",
  onSend,
  onCancel,
}: EmailComposerProps) {
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [toInput, setToInput] = useState("");
  const [ccInput, setCcInput] = useState("");
  const [bccInput, setBccInput] = useState("");

  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      from: userEmails[0],
      to: [],
      cc: [],
      bcc: [],
      subject: isReply ? `Re: ${existingSubject}` : "",
      body: "",
    },
  });

  const addRecipient = (email: string, field: "to" | "cc" | "bcc") => {
    if (email && email.includes("@")) {
      const currentValues = form.getValues(field) || [];
      if (!currentValues.includes(email)) {
        form.setValue(field, [...currentValues, email]);
      }
    }
  };

  const removeRecipient = (email: string, field: "to" | "cc" | "bcc") => {
    const currentValues = form.getValues(field) || [];
    form.setValue(
      field,
      currentValues.filter((e) => e !== email),
    );
  };

  const handleKeyPress = (
    e: React.KeyboardEvent,
    field: "to" | "cc" | "bcc",
    input: string,
    setInput: (value: string) => void,
  ) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addRecipient(input.trim(), field);
      setInput("");
    }
  };

  const onSubmit = (data: EmailFormData) => {
    onSend(data);
    form.reset();
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-0">
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">
              {isReply ? "Reply" : "New Message"}
            </h3>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
            <div className="space-y-3 p-4">
              {/* From Field */}
              {!isReply && (
                <FormField
                  control={form.control}
                  name="from"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center space-x-3">
                        <FormLabel className="min-w-[60px] text-sm font-medium text-muted-foreground">
                          From
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="h-auto border-0 p-0 shadow-none">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {userEmails.map((email) => (
                                <SelectItem key={email} value={email}>
                                  {email}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* To Field */}
              <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-start space-x-3">
                      <FormLabel className="min-w-[60px] pt-2 text-sm font-medium text-muted-foreground">
                        To
                      </FormLabel>
                      <div className="flex-1">
                        <div className="mb-2 flex flex-wrap gap-1">
                          {field.value?.map((email) => (
                            <Badge
                              key={email}
                              variant="secondary"
                              className="text-xs"
                            >
                              {email}
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="ml-1 h-auto p-0"
                                onClick={() => removeRecipient(email, "to")}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                        <Input
                          placeholder="Add recipients..."
                          value={toInput}
                          onChange={(e) => setToInput(e.target.value)}
                          onKeyDown={(e) =>
                            handleKeyPress(e, "to", toInput, setToInput)
                          }
                          onBlur={() => {
                            if (toInput.trim()) {
                              addRecipient(toInput.trim(), "to");
                              setToInput("");
                            }
                          }}
                          className="h-auto border-0 p-0 shadow-none"
                        />
                        <div className="mt-2 flex items-center space-x-4">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowCc(!showCc)}
                            className="h-auto p-0 text-xs text-muted-foreground"
                          >
                            Cc
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowBcc(!showBcc)}
                            className="h-auto p-0 text-xs text-muted-foreground"
                          >
                            Bcc
                          </Button>
                        </div>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* CC Field */}
              {showCc && (
                <FormField
                  control={form.control}
                  name="cc"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-start space-x-3">
                        <FormLabel className="min-w-[60px] pt-2 text-sm font-medium text-muted-foreground">
                          Cc
                        </FormLabel>
                        <div className="flex-1">
                          <div className="mb-2 flex flex-wrap gap-1">
                            {field.value?.map((email) => (
                              <Badge
                                key={email}
                                variant="secondary"
                                className="text-xs"
                              >
                                {email}
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="ml-1 h-auto p-0"
                                  onClick={() => removeRecipient(email, "cc")}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </Badge>
                            ))}
                          </div>
                          <Input
                            placeholder="Add CC recipients..."
                            value={ccInput}
                            onChange={(e) => setCcInput(e.target.value)}
                            onKeyDown={(e) =>
                              handleKeyPress(e, "cc", ccInput, setCcInput)
                            }
                            onBlur={() => {
                              if (ccInput.trim()) {
                                addRecipient(ccInput.trim(), "cc");
                                setCcInput("");
                              }
                            }}
                            className="h-auto border-0 p-0 shadow-none"
                          />
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
              )}

              {/* BCC Field */}
              {showBcc && (
                <FormField
                  control={form.control}
                  name="bcc"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-start space-x-3">
                        <FormLabel className="min-w-[60px] pt-2 text-sm font-medium text-muted-foreground">
                          Bcc
                        </FormLabel>
                        <div className="flex-1">
                          <div className="mb-2 flex flex-wrap gap-1">
                            {field.value?.map((email) => (
                              <Badge
                                key={email}
                                variant="secondary"
                                className="text-xs"
                              >
                                {email}
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="ml-1 h-auto p-0"
                                  onClick={() => removeRecipient(email, "bcc")}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </Badge>
                            ))}
                          </div>
                          <Input
                            placeholder="Add BCC recipients..."
                            value={bccInput}
                            onChange={(e) => setBccInput(e.target.value)}
                            onKeyDown={(e) =>
                              handleKeyPress(e, "bcc", bccInput, setBccInput)
                            }
                            onBlur={() => {
                              if (bccInput.trim()) {
                                addRecipient(bccInput.trim(), "bcc");
                                setBccInput("");
                              }
                            }}
                            className="h-auto border-0 p-0 shadow-none"
                          />
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
              )}

              {/* Subject Field */}
              {!isReply && (
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center space-x-3">
                        <FormLabel className="min-w-[60px] text-sm font-medium text-muted-foreground">
                          Subject
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Subject"
                            {...field}
                            className="h-auto border-0 p-0 shadow-none"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className="border-t border-border">
              {/* Body Field */}
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Compose your message..."
                        {...field}
                        className="min-h-[200px] resize-none rounded-none border-0 shadow-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between border-t border-border p-4">
              <div className="flex items-center space-x-2">
                <Button
                  type="submit"
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send
                </Button>
                <Button type="button" variant="ghost" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
