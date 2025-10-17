"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

interface CustomTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
  variant?: "default" | "pills" | "underline";
  size?: "sm" | "md" | "lg";
}

export function CustomTabs({
  tabs,
  activeTab,
  onTabChange,
  className,
  variant = "default",
  size = "md",
}: CustomTabsProps) {
  const sizeClasses = {
    sm: "px-3 py-2 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const containerClasses = {
    default:
      "bg-muted/50 backdrop-blur-sm rounded-xl p-1 border border-border/50",
    pills:
      "bg-muted/30 backdrop-blur-sm rounded-full p-1.5 border border-border/30",
    underline: "border-b border-border bg-background/50 backdrop-blur-sm",
  };

  const tabClasses = {
    default: "rounded-lg",
    pills: "rounded-full",
    underline: "rounded-t-lg border-b-2 border-transparent",
  };

  const activeClasses = {
    default:
      "bg-primary text-primary-foreground shadow-md ring-1 ring-primary/20",
    pills:
      "bg-primary text-primary-foreground shadow-lg ring-2 ring-primary/20",
    underline: "border-primary bg-background text-foreground shadow-sm",
  };

  const inactiveClasses = {
    default: "text-muted-foreground hover:text-foreground hover:bg-muted/80",
    pills: "text-muted-foreground hover:text-foreground hover:bg-muted/60",
    underline: "text-muted-foreground hover:text-foreground hover:bg-muted/40",
  };

  return (
    <div className={cn("relative", className)}>
      <div className={cn("flex w-max items-center", containerClasses[variant])}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && onTabChange(tab.id)}
            disabled={tab.disabled}
            className={cn(
              "relative flex items-center gap-2 font-medium transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              sizeClasses[size],
              tabClasses[variant],
              activeTab === tab.id
                ? activeClasses[variant]
                : inactiveClasses[variant],
              tab.disabled &&
                "pointer-events-none cursor-not-allowed opacity-50",
            )}
          >
            {tab.icon && (
              <span
                className={cn(
                  "transition-transform duration-200",
                  activeTab === tab.id && "scale-110",
                )}
              >
                {tab.icon}
              </span>
            )}
            <span>{tab.label}</span>

            {/* Active indicator for underline variant */}
            {variant === "underline" && activeTab === tab.id && (
              <div className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Animated background for smoother transitions */}
      {variant !== "underline" && (
        <div
          className="pointer-events-none absolute inset-1 opacity-0 transition-all duration-300 ease-out"
          style={{
            background:
              "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
            backgroundSize: "200% 200%",
            animation: activeTab ? "shimmer 2s ease-in-out infinite" : "none",
          }}
        />
      )}
    </div>
  );
}
