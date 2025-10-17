"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const feedbackData = [
  { label: "Connection request sent:", value: "1196" },
  { label: "Message sent:", value: "1196" },
  { label: "Connection request accepted:", value: "1196" },
  { label: "Replies received:", value: "1196" },
];

const rateData = [
  { label: "Acceptance rate", value: "26.3%" },
  { label: "Response rate", value: "26.3%" },
];

export function FeedbackSection() {
  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 text-white">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Feedback</h3>
            <span className="text-sm opacity-90">Last 30 Days</span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {feedbackData.map((item, index) => (
              <div key={index} className="space-y-1">
                <p className="text-sm opacity-90">{item.label}</p>
                <p className="text-xl font-bold">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            {rateData.map((rate, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 sm:justify-start"
              >
                <span className="text-sm opacity-90">{rate.label}</span>
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white hover:bg-white/30"
                >
                  {rate.value}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
