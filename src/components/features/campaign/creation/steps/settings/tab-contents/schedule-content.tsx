"use client";

import { Calendar, Plus, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button, Card } from "@/components/ui";
import { ScheduleDialog, ScheduleTable } from "./schedules";

import { ScheduleValues } from "@/lib/validations/campaign";
import { Schedule } from "@/types/campaign";

export const ScheduleContent = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: 1,
      name: "Default schedule",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      startTime: "9:00 AM",
      endTime: "6:00 PM",
      interval: 20,
      timezone: "West Central Africa (UTC+01:00)",
      isDefault: true,
    },
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState<Schedule | null>(null);

  const handleCreateSchedule = (values: ScheduleValues) => {
    // Ensure all required properties are present
    const newSchedule: Schedule = {
      id: schedules.length + 1,
      name: values.name || "", // Make sure required properties have default values
      days: values.days || [],
      startTime: values.startTime || "9:00 AM",
      endTime: values.endTime || "6:00 PM",
      interval: values.interval || 20,
      timezone: values.timezone || "West Central Africa (UTC+01:00)",
    };

    setSchedules([...schedules, newSchedule]);
    toast.success(`"${values.name}" has been added to your schedules`);

    setIsCreateDialogOpen(false);
  };

  const handleEditSchedule = (schedule: Schedule) => {
    setCurrentSchedule(schedule);
    setIsEditDialogOpen(true);
  };

  const handleUpdateSchedule = (values: ScheduleValues) => {
    if (!currentSchedule) return;

    const updatedSchedules = schedules.map((schedule) =>
      schedule.id === currentSchedule.id
        ? { ...schedule, ...values }
        : schedule,
    );

    setSchedules(updatedSchedules);
    toast.success(`"${values.name}" has been updated successfully`);

    setIsEditDialogOpen(false);
    setCurrentSchedule(null);
  };

  const handleDeleteSchedule = (id: number) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
    toast.success("The schedule has been removed from your list");
  };

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden border-2 border-border/50 bg-gradient-to-br from-card/80 via-card to-card/90 shadow-xl backdrop-blur-sm">
        <div className="p-8">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-primary p-3 shadow-lg">
                <Calendar className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="flex items-center gap-2 text-xl font-bold text-foreground">
                  Your Schedules
                  <Sparkles className="h-5 w-5 text-primary" />
                </h3>
                <p className="mt-1 text-muted-foreground">
                  Manage when and how often you reach out to leads
                </p>
              </div>
            </div>

            <Button
              className="flex h-12 items-center gap-2 bg-primary px-6 text-primary-foreground shadow-lg transition-all duration-200 hover:bg-primary/90 hover:shadow-xl"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <Plus className="h-4 w-4" />
              <span className="font-semibold">Create Schedule</span>
            </Button>

            <ScheduleDialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
              title="Create New Schedule"
              description="Configure when and how often you want to send messages to your leads."
              onSubmit={handleCreateSchedule}
              onCancel={() => setIsCreateDialogOpen(false)}
            />
          </div>

          <ScheduleTable
            schedules={schedules}
            onEdit={handleEditSchedule}
            onDelete={handleDeleteSchedule}
          />
        </div>
      </Card>

      {/* Edit Schedule Dialog */}
      <ScheduleDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        title="Edit Schedule"
        description="Update your schedule settings and preferences."
        onSubmit={handleUpdateSchedule}
        onCancel={() => setIsEditDialogOpen(false)}
        defaultValues={currentSchedule as ScheduleValues}
      />
    </div>
  );
};
