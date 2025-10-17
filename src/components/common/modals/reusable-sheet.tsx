import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SheetDemoProps {
  trigger?: ReactNode;
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

export function ReusableSheet({
  trigger = <Button variant="outline">Open</Button>,
  title,
  description,
  children,
  footer,
  side = "right",
  className,
  isOpen,
  setIsOpen,
}: SheetDemoProps) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side={side} className={className}>
        {(title || description) && (
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription className={cn(!description && "sr-only")}>
              {description || title}
            </SheetDescription>
          </SheetHeader>
        )}

        {children}

        {footer && <SheetFooter>{footer}</SheetFooter>}
      </SheetContent>
    </Sheet>
  );
}
