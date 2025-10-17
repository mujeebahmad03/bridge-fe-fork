import {
  CRMIllustration,
  GeneralSettingsIllustration,
  SchedulesIllustration,
  TrackingIllustration,
} from "@/components/common/illustrations";
import { cn } from "@/lib/utils";

interface TabIllustrationProps {
  activeTab: string;
}

const TabIllustration = ({ activeTab }: TabIllustrationProps) => {
  return (
    <div className="relative h-24 w-24 md:h-32 md:w-32 lg:h-36 lg:w-36">
      <div
        key={activeTab}
        className="absolute inset-0 flex animate-float items-center justify-center"
      >
        <div
          className={cn(
            "rounded-full p-4 shadow-lg transition-all duration-500",
            "bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20",
          )}
        >
          {activeTab === "general" && <GeneralSettingsIllustration />}

          {activeTab === "tracking" && <TrackingIllustration />}

          {activeTab === "schedules" && <SchedulesIllustration />}

          {activeTab === "crm" && <CRMIllustration />}
        </div>
      </div>
    </div>
  );
};

export default TabIllustration;
