import { Mail } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CollapsibleTriggerContent } from "./collapsible-content";
import { ConfigurationFormData } from "../validations";

interface SignatureSectionProps {
  form: UseFormReturn<ConfigurationFormData>;
  isOpen: boolean;
  onToggle: () => void;
}

export function SignatureSection({
  form,
  isOpen,
  onToggle,
}: SignatureSectionProps) {
  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <CollapsibleTrigger asChild>
        <div>
          <CollapsibleTriggerContent
            icon={
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
            }
            title="Signature"
            description="Email Signatures Enhance Deliverability"
            isOpen={isOpen}
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="space-y-4 px-4 pb-4">
          <FormField
            control={form.control}
            name="signature"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Signature</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Best regards,&#10;Your Name&#10;Your Title"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Add a professional signature to improve email deliverability
                  and trust.
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
