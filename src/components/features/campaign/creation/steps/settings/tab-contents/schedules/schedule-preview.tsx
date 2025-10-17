import { Clock, TrendingUp } from "lucide-react";

interface SchedulePreviewProps {
  selectedDays: string[];
  interval: number;
  startTime: string;
  endTime: string;
}

const SchedulePreview = ({
  selectedDays,
  interval,
  startTime,
  endTime,
}: SchedulePreviewProps) => {
  const calculateLeadsPerDay = () => {
    const startHour = startTime ? parseInt(startTime.split(":")[0]) : 9;
    const startPeriod = startTime ? startTime.includes("PM") : false;
    const endHour = endTime ? parseInt(endTime.split(":")[0]) : 18;
    const endPeriod = endTime ? endTime.includes("PM") : true;

    const start24 =
      startHour === 12
        ? startPeriod
          ? 12
          : 0
        : startPeriod
          ? startHour + 12
          : startHour;

    const end24 =
      endHour === 12
        ? endPeriod
          ? 12
          : 0
        : endPeriod
          ? endHour + 12
          : endHour;

    const hours = end24 - start24;
    return Math.round((hours * 60) / interval) * selectedDays.length;
  };

  if (selectedDays.length === 0 || interval === 0) {
    return null;
  }

  const leadsPerDay = calculateLeadsPerDay();

  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-primary/5 p-6">
      <div className="absolute right-0 top-0 h-32 w-32 -translate-y-16 translate-x-16 transform rounded-full bg-primary/10"></div>
      <div className="relative flex items-start gap-4">
        <div className="flex-shrink-0 rounded-xl bg-primary p-3 shadow-lg">
          <TrendingUp className="h-6 w-6 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Schedule Preview
            </span>
          </div>
          <p className="font-medium leading-relaxed text-foreground">
            This schedule will reach out to approximately{" "}
            <span className="text-lg font-bold text-primary">
              {leadsPerDay}
            </span>{" "}
            new leads per day.
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-primary">
            <div className="h-2 w-2 animate-pulse rounded-full bg-primary"></div>
            <span>Based on {selectedDays.length} active days</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePreview;
