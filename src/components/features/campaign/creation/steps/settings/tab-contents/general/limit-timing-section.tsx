import {
  Clock,
  Linkedin,
  Mail,
  Users,
  MessageSquare,
  Target,
} from "lucide-react";

import { SettingsSection } from "./settings-section";
import { SettingItem } from "./settings-item";

interface LimitsTimingSectionProps {
  settings: {
    linkedinMessagesPerDay: string;
    timeBetweenEmails: string;
    maxEmailsPerDay: string;
    connectionRequestLimit: string;
    messageLimit: string;
    newLeadsLimit: string;
    followUpsLimit: string;
  };
  updateSetting: (key: string, value: string | boolean) => void;
}

export function LimitsTimingSection({
  settings,
  updateSetting,
}: LimitsTimingSectionProps) {
  return (
    <SettingsSection
      title="Limits & Timing"
      icon={<Clock className="h-5 w-5" />}
    >
      <SettingItem
        title="LinkedIn Messages per day"
        description="AI limit"
        type="input"
        value={settings.linkedinMessagesPerDay}
        onChange={(value) => updateSetting("linkedinMessagesPerDay", value)}
        icon={<Linkedin className="h-4 w-4" />}
      />
      <SettingItem
        title="Time gaps between emails"
        type="input"
        value={settings.timeBetweenEmails}
        onChange={(value) => updateSetting("timeBetweenEmails", value)}
        suffix="minutes"
        icon={<Clock className="h-4 w-4" />}
      />
      <SettingItem
        title="max number of emails sent daily"
        description="AI limit"
        type="input"
        value={settings.maxEmailsPerDay}
        onChange={(value) => updateSetting("maxEmailsPerDay", value)}
        icon={<Mail className="h-4 w-4" />}
      />
      <SettingItem
        title="Connection request limit per day"
        description="AI limit"
        type="input"
        value={settings.connectionRequestLimit}
        onChange={(value) => updateSetting("connectionRequestLimit", value)}
        icon={<Users className="h-4 w-4" />}
      />
      <SettingItem
        title="Linked list the messages limit per day"
        description="AI limit"
        type="input"
        value={settings.messageLimit}
        onChange={(value) => updateSetting("messageLimit", value)}
        icon={<MessageSquare className="h-4 w-4" />}
      />
      <SettingItem
        title="max New Leads - per day"
        description="AI limit"
        type="input"
        value={settings.newLeadsLimit}
        onChange={(value) => updateSetting("newLeadsLimit", value)}
        icon={<Target className="h-4 w-4" />}
      />
      <SettingItem
        title="max follow-ups - per day"
        description="AI limit"
        type="input"
        value={settings.followUpsLimit}
        onChange={(value) => updateSetting("followUpsLimit", value)}
        icon={<MessageSquare className="h-4 w-4" />}
      />
    </SettingsSection>
  );
}
