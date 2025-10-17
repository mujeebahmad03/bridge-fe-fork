import { Bot, MessageSquare, Zap, Calendar } from "lucide-react";
import { SettingsSection } from "./settings-section";
import { SettingItem } from "./settings-item";

interface CampaignAutomationSectionProps {
  settings: {
    stopCampaignReplies: boolean;
    changeLeadStatus: boolean;
    createNewTask: boolean;
    createTaskOnClick: boolean;
  };
  updateSetting: (key: string, value: string | boolean) => void;
}

export function CampaignAutomationSection({
  settings,
  updateSetting,
}: CampaignAutomationSectionProps) {
  return (
    <SettingsSection
      title="Campaign Automation"
      icon={<Bot className="h-5 w-5" />}
    >
      <SettingItem
        title="Stop Campaign for people that reply by email or LinkedIn"
        description="Stop sending emails to a lead if a response has been received"
        type="toggle"
        value={settings.stopCampaignReplies}
        onChange={(value) => updateSetting("stopCampaignReplies", value)}
        icon={<MessageSquare className="h-4 w-4" />}
      />
      <SettingItem
        title="Change lead status to interested when AI detect that the reply to your message/mail is positive"
        type="toggle"
        value={settings.changeLeadStatus}
        onChange={(value) => updateSetting("changeLeadStatus", value)}
        icon={<Zap className="h-4 w-4" />}
      />
      <SettingItem
        title="Create a new task when people that reply by email or linkedin and click on a link"
        description="Stop sending emails to a lead if a response has been received"
        type="toggle"
        value={settings.createNewTask}
        onChange={(value) => updateSetting("createNewTask", value)}
        icon={<Calendar className="h-4 w-4" />}
      />
      <SettingItem
        title="Create a new task when people click on a link"
        description="Stop sending emails to a lead if a response has been received"
        type="toggle"
        value={settings.createTaskOnClick}
        onChange={(value) => updateSetting("createTaskOnClick", value)}
        icon={<Calendar className="h-4 w-4" />}
      />
    </SettingsSection>
  );
}
