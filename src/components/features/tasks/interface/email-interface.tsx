"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Form,
  ScrollArea,
} from "@/components/ui";
import { RichTextEditor } from "@/components/common/editor";
import { FormFieldWrapper } from "@/components/common/forms";

import { EmailTaskDto, emailTaskSchema } from "@/lib/validations/task";

export const EmailInterface = () => {
  const [expandedEmail, setExpandedEmail] = useState<number | null>(1);
  const form = useForm<EmailTaskDto>({
    resolver: zodResolver(emailTaskSchema),
    defaultValues: {
      to: "",
      subject: "",
      body: "",
    },
  });

  return (
    <div className="h-[80vh]">
      <ScrollArea className="h-full">
        <div className="my-4 space-y-4 p-4">
          <div className="flex justify-end">
            <Button>New Email</Button>
          </div>
          {[0, 1].map((index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <CardHeader
                  className="cursor-pointer"
                  onClick={() =>
                    setExpandedEmail(index === expandedEmail ? null : index)
                  }
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-muted p-2">
                        <svg
                          className="h-5 w-5 text-muted-foreground"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-primary">
                            Email - Hello There
                          </span>
                          <span className="text-sm text-muted-foreground">
                            by Janet Lawson
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Tuesday, October 24
                        </p>
                      </div>
                    </div>
                    {index === expandedEmail ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </CardHeader>
                {index === expandedEmail && (
                  <CardContent>
                    {/* Rich Text Editor Toolbar */}
                    <div className="mb-4 gap-2 border-b pb-2">
                      <Form {...form}>
                        <form className="space-y-6">
                          <FormFieldWrapper
                            control={form.control}
                            name="body"
                            label=""
                            render={({ field }) => (
                              <RichTextEditor
                                content={field.value as string}
                                onChange={field.onChange}
                              />
                            )}
                          />
                        </form>
                      </Form>
                    </div>

                    {/* Email Content */}
                    {/* <div className="space-y-4 text-muted-foreground">
                    <p>1. a person or thing similar to another.</p>
                    <p>
                      2. &quot;he was one of those whose similar you never
                      meet&quot;
                    </p>
                    <p>3. 2.</p>
                    <p>
                      4. a substance that produces effect the symptoms of
                      particular diseases (the basis of treatment).
                    </p>
                  </div> */}

                    {/* Action Buttons */}
                    <div className="mt-6 flex gap-2">
                      <Button variant="outline">Reply</Button>
                      <Button variant="outline">Reply all</Button>
                      <Button variant="outline">Forward</Button>
                    </div>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
