"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ResponsiveModal } from "@/components/ui/responsive-modal";
import { ModalHeader } from "../../email-setup/components/modal-header";
import { SignatureSection } from "./signature-section";
import { SendingLimitsSection } from "./sending-limit";
import { OptOutLinkSection } from "./opt-out-link-section";
import { SubdomainTrackingSection } from "./subdomain-tracking-section";
import { DomainAuthenticationSection } from "./domain-auth-section";

import type { EmailAccount, ConfigurationTab } from "@/types/email-account";
import {
  type ConfigurationFormData,
  configurationSchema,
} from "../validations";

interface ConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  emailAccount: EmailAccount | null;
  onSave: (accountId: string, config: ConfigurationFormData) => void;
}

export function ConfigurationModal({
  isOpen,
  onClose,
  emailAccount,
  onSave,
}: ConfigurationModalProps) {
  const [openSections, setOpenSections] = useState<Set<ConfigurationTab>>(
    new Set(["signature"]),
  );

  const form = useForm<ConfigurationFormData>({
    resolver: zodResolver(configurationSchema),
    defaultValues: {
      signature: emailAccount?.configuration.signature || "",
      dailyLimit: emailAccount?.configuration.sendingLimit.daily || 30,
      hourlyLimit: emailAccount?.configuration.sendingLimit.hourly || 5,
      optOutLink: emailAccount?.configuration.optOutLink || "",
      subdomainTracking: emailAccount?.configuration.subdomainTracking || false,
      dkimEnabled:
        emailAccount?.configuration.domainAuthentication.dkim || false,
      spfEnabled: emailAccount?.configuration.domainAuthentication.spf || false,
      dmarcEnabled:
        emailAccount?.configuration.domainAuthentication.dmarc || false,
    },
  });

  const toggleSection = (section: ConfigurationTab) => {
    setOpenSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const handleSave = (data: ConfigurationFormData) => {
    if (emailAccount) {
      onSave(emailAccount.id, data);
      onClose();
    }
  };

  if (!emailAccount) return null;

  return (
    <ResponsiveModal isOpen={isOpen} onClose={onClose} showCloseButton={false}>
      <ModalHeader showBackButton={false} onClose={onClose} />

      <div className="p-6 md:p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Email Configuration</h1>
            <p className="text-muted-foreground">
              Configure settings for {emailAccount.email}
            </p>
          </div>

          {/* Configuration Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSave)}
              className="space-y-4"
            >
              <SignatureSection
                form={form}
                isOpen={openSections.has("signature")}
                onToggle={() => toggleSection("signature")}
              />

              <SendingLimitsSection
                form={form}
                isOpen={openSections.has("sending-limit")}
                onToggle={() => toggleSection("sending-limit")}
              />

              <OptOutLinkSection
                form={form}
                isOpen={openSections.has("opt-out-link")}
                onToggle={() => toggleSection("opt-out-link")}
              />

              <SubdomainTrackingSection
                form={form}
                isOpen={openSections.has("subdomain-tracking")}
                onToggle={() => toggleSection("subdomain-tracking")}
              />

              <DomainAuthenticationSection
                form={form}
                isOpen={openSections.has("domain-authentication")}
                onToggle={() => toggleSection("domain-authentication")}
              />

              {/* Save Button */}
              <div className="flex justify-end border-t pt-6">
                <Button
                  type="submit"
                  className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
                >
                  <Save className="h-4 w-4" />
                  Save Configuration
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </ResponsiveModal>
  );
}
