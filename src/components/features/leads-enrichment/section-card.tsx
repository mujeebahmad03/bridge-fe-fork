import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionCardProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export const SectionCard = ({
  icon,
  title,
  description,
  children,
  className,
}: SectionCardProps) => {
  return (
    <div
      className={cn(
        "animate-fade-in rounded-lg border bg-card p-6 shadow-sm",
        className,
      )}
    >
      {(icon || title) && (
        <div className="mb-3 flex items-center gap-2">
          {icon && <div className="text-primary">{icon}</div>}
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      )}

      {description && (
        <p className="mb-6 text-sm text-muted-foreground">{description}</p>
      )}

      {children}
    </div>
  );
};
