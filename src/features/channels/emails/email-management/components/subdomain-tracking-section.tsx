import { Globe } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CollapsibleTriggerContent } from "./collapsible-content";
import { ConfigurationFormData } from "../validations";

interface SubdomainTrackingSectionProps {
  form: UseFormReturn<ConfigurationFormData>;
  isOpen: boolean;
  onToggle: () => void;
}

export function SubdomainTrackingSection({
  form,
  isOpen,
  onToggle,
}: SubdomainTrackingSectionProps) {
  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <CollapsibleTrigger asChild>
        <div>
          <CollapsibleTriggerContent
            icon={
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/20">
                <Globe className="h-5 w-5 text-orange-600" />
              </div>
            }
            title="Subdomain Tracking"
            description="Subdomain Tracking Improves Deliverability"
            isOpen={isOpen}
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="space-y-4 px-4 pb-4">
          <FormField
            control={form.control}
            name="subdomainTracking"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Enable Subdomain Tracking
                  </FormLabel>
                  <FormDescription>
                    Use a subdomain for tracking links to improve deliverability
                    and protect your main domain reputation.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
