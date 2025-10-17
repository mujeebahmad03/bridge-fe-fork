import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const CalendarSettings = () => {
  return (
    <Card className="overflow-hidden border-slate-100 bg-white/50 transition-all duration-300 dark:border-slate-700/50 dark:bg-slate-800/50">
      <div className="p-6">
        <h3 className="mb-4 text-lg font-medium text-blue-600 transition-colors dark:text-blue-400">
          Calendar Settings
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Checkbox id="sync-google" />
              <Label htmlFor="sync-google" className="text-base">
                Sync with Google Calendar
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox id="sync-outlook" />
              <Label htmlFor="sync-outlook" className="text-base">
                Sync with Outlook Calendar
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox id="respect-busy" defaultChecked />
              <Label htmlFor="respect-busy" className="text-base">
                Respect busy times in calendar
              </Label>
            </div>
          </div>
          <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <h4 className="mb-2 font-medium text-blue-700 dark:text-blue-300">
              Calendar Sync Benefits
            </h4>
            <ul className="space-y-2 text-sm text-blue-600 dark:text-blue-200">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                <span>Avoid scheduling when you&apos;re busy</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                <span>Track your scheduled emails in your calendar</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                <span>Manage all your appointments in one place</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CalendarSettings;
