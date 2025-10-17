import { Link } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CollapsibleTriggerContent } from "./collapsible-content";
import { ConfigurationFormData } from "../validations";

interface OptOutLinkSectionProps {
  form: UseFormReturn<ConfigurationFormData>;
  isOpen: boolean;
  onToggle: () => void;
}

export function OptOutLinkSection({
  form,
  isOpen,
  onToggle,
}: OptOutLinkSectionProps) {
  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <CollapsibleTrigger asChild>
        <div>
          <CollapsibleTriggerContent
            icon={
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20">
                <Link className="h-5 w-5 text-purple-600" />
              </div>
            }
            title="Opt Out Link"
            description="Enhance Compliance to Reduce Spam, by Adding an Unsubscribe Link for Subscribers"
            isOpen={isOpen}
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="space-y-4 px-4 pb-4">
          <FormField
            control={form.control}
            name="optOutLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unsubscribe Link</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/unsubscribe"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide a link where recipients can easily unsubscribe from
                  your emails.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
