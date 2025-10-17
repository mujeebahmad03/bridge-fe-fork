"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, PhoneCall, X } from "lucide-react";
import { toast } from "sonner";

const callSchema = z.object({
  phoneNumber: z.string().min(1, "Phone number is required"),
  callType: z.enum(["voice", "video"]),
  notes: z.string().optional(),
});

type CallFormData = z.infer<typeof callSchema>;

interface CallComposerProps {
  onClose: () => void;
  defaultNumber?: string;
}

export function CallComposer({ onClose, defaultNumber }: CallComposerProps) {
  const [isDialing, setIsDialing] = useState(false);

  const form = useForm<CallFormData>({
    resolver: zodResolver(callSchema),
    defaultValues: {
      phoneNumber: defaultNumber || "",
      callType: "voice",
      notes: "",
    },
  });

  const onSubmit = async (data: CallFormData) => {
    setIsDialing(true);

    // Simulate call initiation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success(`Initiating ${data.callType} call to ${data.phoneNumber}`);
    setIsDialing(false);
    onClose();
  };

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Make a Call</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="+1 (555) 123-4567"
                    {...field}
                    className="font-mono"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="callType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Call Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select call type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="voice">Voice Call</SelectItem>
                    <SelectItem value="video">Video Call</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add any notes about this call..."
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2 pt-2">
            <Button type="submit" disabled={isDialing} className="flex-1">
              <PhoneCall className="mr-2 h-4 w-4" />
              {isDialing ? "Dialing..." : "Start Call"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
