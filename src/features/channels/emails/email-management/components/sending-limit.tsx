import { Send, Clock } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CollapsibleTriggerContent } from "./collapsible-content";
import { ConfigurationFormData } from "../validations";

interface SendingLimitsSectionProps {
  form: UseFormReturn<ConfigurationFormData>;
  isOpen: boolean;
  onToggle: () => void;
}

export function SendingLimitsSection({
  form,
  isOpen,
  onToggle,
}: SendingLimitsSectionProps) {
  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <CollapsibleTrigger asChild>
        <div>
          <CollapsibleTriggerContent
            icon={
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
                <Send className="h-5 w-5 text-green-600" />
              </div>
            }
            title="Sending Limits"
            description="Sending Limits are Essential For Maintaining a Healthy Deliverability"
            isOpen={isOpen}
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="space-y-4 px-4 pb-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="dailyLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max number of emails sent daily</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="30" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hourlyLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max number of emails sent hourly</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-800 dark:bg-yellow-950/20">
            <div className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 text-yellow-600" />
              <div className="text-sm text-yellow-800 dark:text-yellow-200">
                <p className="font-medium">
                  Recommended limits for new accounts:
                </p>
                <p>Daily: 20-50 emails | Hourly: 3-8 emails</p>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
