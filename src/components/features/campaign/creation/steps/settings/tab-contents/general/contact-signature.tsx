"use client";

import { Phone, AlertTriangle, FileText, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SettingsSection } from "./settings-section";
import { SettingItem } from "./settings-item";

interface ContactSignatureSectionProps {
  settings: {
    phoneCallTask: boolean;
    markUnableToContact30: boolean;
    markUnableToContact30Days: boolean;
  };
  updateSetting: (key: string, value: string | boolean) => void;
}

export function ContactSignatureSection({
  settings,
  updateSetting,
}: ContactSignatureSectionProps) {
  const [signature, setSignature] = useState("");

  const handleSaveSignature = () => {
    // Here you would typically save to a backend
    toast.info("Your signature has been updated successfully.");
  };

  return (
    <SettingsSection
      title="Contact & Signature"
      icon={<Phone className="h-5 w-5" />}
    >
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <Label className="text-sm font-medium">Email Signature</Label>
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Enter your email signature here..."
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              className="min-h-[100px] resize-none"
            />
            <div className="flex justify-end">
              <Button onClick={handleSaveSignature} size="sm" className="gap-2">
                <Save className="h-3 w-3" />
                Save Signature
              </Button>
            </div>
          </div>
        </div>
      </div>

      <SettingItem
        title="Create a phone call task if an active contact opens an email at least 3 times"
        type="toggle"
        value={settings.phoneCallTask}
        onChange={(value) => updateSetting("phoneCallTask", value)}
        icon={<Phone className="h-4 w-4" />}
      />
      <SettingItem
        title="Mark contact us unable to contact if they do not respond 30 days after the last step in sequence"
        type="toggle"
        value={settings.markUnableToContact30}
        onChange={(value) => updateSetting("markUnableToContact30", value)}
        icon={<AlertTriangle className="h-4 w-4" />}
      />
      <SettingItem
        title="Mark contact us unable to contact if they do not respond 30 days after the last step in sequence"
        type="toggle"
        value={settings.markUnableToContact30Days}
        onChange={(value) => updateSetting("markUnableToContact30Days", value)}
        icon={<AlertTriangle className="h-4 w-4" />}
      />
    </SettingsSection>
  );
}
