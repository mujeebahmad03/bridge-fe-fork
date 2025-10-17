"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";

const panelVariants = cva(
  "fixed z-40 bg-background shadow-lg transition-transform duration-300 ease-in-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b",
        bottom: "inset-x-0 bottom-0 border-t",
        left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-[440px]",
        right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-[440px]",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

export interface PanelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof panelVariants> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideCloseButton?: boolean;
}

export function CustomPanel({
  className,
  children,
  side = "right",
  open = false,
  onOpenChange,
  hideCloseButton = false,
  ...props
}: PanelProps) {
  const [isOpen, setIsOpen] = React.useState(open);

  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = () => {
    setIsOpen(false);
    onOpenChange?.(false);
  };

  const transformStyles = {
    top: isOpen ? "translate-y-0" : "-translate-y-full",
    bottom: isOpen ? "translate-y-0" : "translate-y-full",
    left: isOpen ? "translate-x-0" : "-translate-x-full",
    right: isOpen ? "translate-x-0" : "translate-x-full",
  };

  return (
    <div
      className={cn(
        panelVariants({ side }),
        transformStyles[side as keyof typeof transformStyles],
        "flex w-[440px] flex-col",
        className,
      )}
      {...props}
    >
      {!hideCloseButton && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-20"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      )}
      {children}
    </div>
  );
}
