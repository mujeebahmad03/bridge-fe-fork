import type * as React from "react";

import { cn } from "@/lib/utils";

export interface PanelContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function CustomPanelContent({
  children,
  className,
  footer,
  ...props
}: PanelContentProps) {
  return (
    <div className="flex h-full flex-col">
      <div className={cn("flex-1 overflow-auto p-6", className)} {...props}>
        {children}
      </div>
      {footer && (
        <div className="sticky bottom-0 border-t bg-background p-4">
          {footer}
        </div>
      )}
    </div>
  );
}
