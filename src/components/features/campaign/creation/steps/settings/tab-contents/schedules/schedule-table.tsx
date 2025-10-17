import { Crown, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Schedule } from "@/types/campaign";

interface ScheduleTableProps {
  schedules: Schedule[];
  onEdit: (schedule: Schedule) => void;
  onDelete: (id: number) => void;
}

const ScheduleTable = ({ schedules, onEdit, onDelete }: ScheduleTableProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-border bg-card shadow-lg">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="border-b-2 border-border hover:bg-transparent">
            <TableHead className="w-[200px] font-semibold text-foreground">
              Name
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Days
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Start at
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              End at
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Send every
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Timezone
            </TableHead>
            <TableHead className="text-right font-semibold text-foreground">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedules.map((schedule) => (
            <TableRow
              key={schedule.id}
              className="border-b border-border/50 transition-all duration-200 hover:bg-accent/50"
            >
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <span className="text-foreground">{schedule.name}</span>
                  {schedule.isDefault && (
                    <div className="flex items-center gap-1 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">
                      <Crown className="h-3 w-3" />
                      Default
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-primary">
                    {schedule.days.length}
                  </span>
                  <span className="text-muted-foreground">/7</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="rounded-lg bg-accent px-2 py-1 text-sm font-medium">
                  {schedule.startTime}
                </span>
              </TableCell>
              <TableCell>
                <span className="rounded-lg bg-accent px-2 py-1 text-sm font-medium">
                  {schedule.endTime}
                </span>
              </TableCell>
              <TableCell>
                <span className="rounded-lg bg-primary/10 px-2 py-1 text-sm font-bold text-primary">
                  {schedule.interval} min.
                </span>
              </TableCell>
              <TableCell>
                <div
                  className="max-w-[160px] truncate text-muted-foreground"
                  title={schedule.timezone}
                >
                  {schedule.timezone}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 border-2 text-xs transition-all duration-200 hover:border-primary hover:bg-primary/10"
                    onClick={() => onEdit(schedule)}
                  >
                    <Edit className="mr-1 h-3 w-3" />
                    Edit
                  </Button>
                  {!schedule.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 border-2 text-xs text-destructive transition-all duration-200 hover:border-destructive hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => onDelete(schedule.id)}
                    >
                      <Trash2 className="mr-1 h-3 w-3" />
                      Delete
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ScheduleTable;
