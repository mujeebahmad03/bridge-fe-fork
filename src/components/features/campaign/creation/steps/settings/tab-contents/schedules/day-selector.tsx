import { Day, daysMap } from "@/config/time-options";

interface DaySelectorProps {
  selectedDays: string[];
  onDayToggle: (day: Day) => void;
  error?: string;
}

const DaySelector = ({
  selectedDays,
  onDayToggle,
  error,
}: DaySelectorProps) => {
  return (
    <div className="grid gap-3">
      <label className="text-sm font-semibold text-foreground">Send on</label>
      <div className="flex flex-wrap gap-2">
        {daysMap.map(({ short, long }) => (
          <div
            key={short}
            onClick={() => onDayToggle(long)}
            className={`flex h-14 w-14 cursor-pointer items-center justify-center rounded-xl border-2 p-3 text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              selectedDays.includes(long)
                ? "border-primary bg-primary text-primary-foreground shadow-lg"
                : "border-border bg-card text-card-foreground hover:border-primary hover:bg-accent"
            } `}
          >
            {short}
          </div>
        ))}
      </div>
      {error && (
        <p className="flex items-center gap-2 text-sm font-medium text-destructive">
          <span className="h-1 w-1 rounded-full bg-destructive"></span>
          {error}
        </p>
      )}
    </div>
  );
};

export default DaySelector;
