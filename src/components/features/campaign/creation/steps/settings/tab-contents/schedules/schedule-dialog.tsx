import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { ScheduleValues } from "@/lib/validations/campaign";
import ScheduleForm from "./schedule-form";
import { Calendar } from "lucide-react";

interface ScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onSubmit: (data: ScheduleValues) => void;
  onCancel: () => void;
  defaultValues?: ScheduleValues;
}

export function ScheduleDialog({
  open,
  onOpenChange,
  title,
  description,
  onSubmit,
  onCancel,
  defaultValues,
}: ScheduleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] flex-col border-2 border-border p-0 sm:max-h-[90vh] sm:max-w-[600px]">
        {/* Fixed Header */}
        <DialogHeader className="flex-shrink-0 border-b border-border p-6 pb-4">
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <Calendar className="h-5 w-5 text-primary" />
            {title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 pt-4">
          <ScheduleForm
            onSubmit={onSubmit}
            onCancel={onCancel}
            defaultValues={defaultValues}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
