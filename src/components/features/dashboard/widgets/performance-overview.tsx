import { Mail, Phone, Linkedin, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MetricData {
  primary: {
    label: string;
    value: number;
  };
  secondary: {
    label: string;
    value: number;
  };
}

interface ChannelData {
  icon: LucideIcon;
  title: string;
  metrics: MetricData;
}

interface PerformanceOverviewProps {
  data: {
    email?: MetricData;
    linkedin?: MetricData;
    calls?: MetricData;
  };
}

const PerformanceBar = ({ metrics }: { metrics: MetricData }) => {
  const total = metrics.primary.value + metrics.secondary.value;
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <div className="space-x-4">
          <span className="text-muted-foreground">
            <span className="mr-1.5 inline-block h-3 w-3 rounded-full bg-purple-500 align-middle" />
            {metrics.primary.label} {metrics.primary.value}%
          </span>
          <span className="text-muted-foreground">
            <span className="mr-1.5 inline-block h-3 w-3 rounded-full bg-purple-300 align-middle" />
            {metrics.secondary.label} {metrics.secondary.value}%
          </span>
        </div>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-muted">
        {/* First Progress (Primary) */}
        <div
          className="absolute left-0 h-full bg-purple-500"
          style={{
            width: `${Math.round((metrics.primary.value / total) * 100)}%`,
          }}
        />

        {/* Second Progress (Secondary) - Starts After Primary */}
        <div
          className="absolute h-full bg-purple-300"
          style={{
            width: `${Math.round((metrics.secondary.value / total) * 100)}%`,
            left: `${Math.round((metrics.primary.value / total) * 100)}%`, // Positioning it right after primary
          }}
        />
      </div>
    </div>
  );
};

const ChannelSection = ({ icon: Icon, title, metrics }: ChannelData) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Icon className="h-4 w-4" />
        <span>{title}</span>
      </div>
      <PerformanceBar metrics={metrics} />
    </div>
  );
};

export default function PerformanceOverview({
  data,
}: PerformanceOverviewProps) {
  const channels: ChannelData[] = [
    {
      icon: Mail,
      title: "Email Performance",
      metrics: data.email ?? {
        primary: { label: "Sent", value: 0 },
        secondary: { label: "Reply", value: 0 },
      },
    },
    {
      icon: Linkedin,
      title: "LinkedIn Performance",
      metrics: data.linkedin ?? {
        primary: { label: "Sent", value: 0 },
        secondary: { label: "Reply", value: 0 },
      },
    },
    {
      icon: Phone,
      title: "Call Performance",
      metrics: data.calls ?? {
        primary: { label: "Logged", value: 0 },
        secondary: { label: "Answer", value: 0 },
      },
    },
  ];

  return (
    <Card className="p-4">
      <h4 className="mb-3 font-medium">Performance Overview</h4>
      <div className="space-y-4">
        {channels.map((channel, index) => (
          <ChannelSection key={index} {...channel} />
        ))}
      </div>
    </Card>
  );
}
