import { Campaign } from "@/types/campaign";

interface CircleProgressProps {
  campaign: Campaign;
}

export function CircleProgress({ campaign }: CircleProgressProps) {
  const { leadsCompleted: value, leadsTotal: max = 100 } = campaign;

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / max) * circumference;

  return (
    <div className="flex items-center">
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        className="-rotate-90 transform"
      >
        <circle
          cx="25"
          cy="25"
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="4"
          strokeOpacity="0.2"
        />
        <circle
          cx="25"
          cy="25"
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="4"
          className="text-primary"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="ml-2 text-sm font-medium">
        {value}/{max}
      </span>
    </div>
  );
}
