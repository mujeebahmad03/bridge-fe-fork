import React from "react";
import { cn } from "@/lib/utils";

interface TimelineIconProps {
  icon: React.ReactNode;

  bgColor?: string;

  iconColor?: string;

  badgeText?: string;

  badgeBg?: string;

  darkBg?: string;
}

export const TimelineIcon: React.FC<TimelineIconProps> = ({
  icon,
  bgColor = "bg-gray-100",
  iconColor = "text-gray-600",
  badgeText,
  badgeBg = "bg-red-500",
  darkBg,
}) => {
  return (
    <div className="absolute -left-3 flex-shrink-0">
      <div
        className={cn(
          "relative flex h-10 w-10 items-center justify-center rounded-lg",
          bgColor,
          darkBg,
        )}
      >
        <div className={cn("h-6 w-6", iconColor)}>{icon}</div>

        {badgeText && (
          <span
            className={cn(
              "absolute -bottom-1 -right-1 flex h-3.5 w-3.5 flex-col items-center justify-center rounded-full text-white",
              badgeBg,
            )}
            style={{ fontSize: "8px" }}
          >
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
};
