import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { SettingsLayout } from "./settings-layout";
import { SettingsTabs } from "./settings-tab";
import { TabIllustration } from "./tab-contents";
import { Button, CardDescription, CardTitle } from "@/components/ui";

interface SettingsProps {
  onNext: () => void;
  onBack: () => void;
}

const Settings = ({ onBack, onNext }: SettingsProps) => {
  const [activeTab, setActiveTab] = useState<string>("general");

  return (
    <SettingsLayout>
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <Button
          onClick={onBack}
          variant="ghost"
          className="group mr-4 p-2 transition-colors hover:bg-blue-100 dark:hover:bg-slate-800"
          aria-label="Back to previous step"
        >
          <ArrowLeft className="h-5 w-5 text-blue-600 transition-transform group-hover:translate-x-[-2px] dark:text-blue-400" />
          Back
        </Button>

        <Button
          onClick={onNext}
          className="group mr-4 p-2 transition-colors"
          aria-label="Next step"
        >
          Next
          <ArrowRight className="h-5 w-5 text-blue-600 transition-transform group-hover:translate-x-[-2px] dark:text-blue-400" />
        </Button>
      </div>
      <div className="flex flex-col items-start justify-between border-b border-blue-100 p-6 transition-colors duration-300 dark:border-slate-700/50 md:flex-row md:items-center">
        <div className="z-10">
          <CardTitle className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-2xl text-transparent">
            Customize Your Experience
          </CardTitle>
          <CardDescription className="mt-1.5">
            Configure how you want automate your campaign
          </CardDescription>
        </div>

        <div className="hidden md:block">
          <TabIllustration activeTab={activeTab} />
        </div>
      </div>

      {/* Mobile Illustration */}
      <div className="flex justify-center py-4 md:hidden">
        <TabIllustration activeTab={activeTab} />
      </div>

      {/* Tabs Section */}
      <div className="px-4 py-4 md:px-6">
        <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </SettingsLayout>
  );
};

export default Settings;
