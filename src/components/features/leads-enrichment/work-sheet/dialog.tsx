"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import { WorksheetForm } from "./form";

export function WorksheetModal() {
  const [open, setOpen] = useState(false);

  const handleCreate = (data: { title: string; file?: File }) => {
    console.log("Creating worksheet with data:", data);
    setOpen(false);
    toast.success("Work Sheet created successfully");
  };

  return (
    <div className="flex justify-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="h-auto px-6 py-2">
            Upload Manually
          </Button>
        </DialogTrigger>
        <DialogContent className="overflow-hidden p-0 sm:max-w-[600px]">
          <DialogHeader className="border-b p-6 pb-2">
            <div className="flex w-full items-center justify-between">
              <DialogTitle className="text-2xl font-semibold">
                Create new worksheet
              </DialogTitle>
            </div>
          </DialogHeader>
          <WorksheetForm
            onSubmit={handleCreate}
            onCancel={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
