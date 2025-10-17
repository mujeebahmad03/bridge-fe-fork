"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { CrmHeader, IntegrationSettings, StatusForm, StatusList } from "./crm";

import { Status } from "@/types/campaign";

const CrmTabContent = () => {
  const [statuses, setStatuses] = useState<Status[]>([
    { id: "1", title: "New Lead", color: "#3b82f6" },
    { id: "2", title: "Qualified", color: "#10b981" },
    { id: "3", title: "Proposal", color: "#f59e0b" },
    { id: "4", title: "Negotiation", color: "#8b5cf6" },
    { id: "5", title: "Closed Won", color: "#22c55e" },
    { id: "6", title: "Closed Lost", color: "#ef4444" },
  ]);
  const [editingStatus, setEditingStatus] = useState<Status | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateStatus = () => {
    setEditingStatus(null);
    setIsModalOpen(true);
  };

  const handleEditStatus = (status: Status) => {
    setEditingStatus(status);
    setIsModalOpen(true);
  };

  const handleDeleteStatus = (id: string) => {
    setStatuses((prev) => prev.filter((status) => status.id !== id));
    toast.success("The status has been successfully removed.");
  };

  const handleSaveStatus = (statusData: Omit<Status, "id">) => {
    if (editingStatus) {
      setStatuses((prev) =>
        prev.map((status) =>
          status.id === editingStatus.id
            ? { ...status, ...statusData }
            : status,
        ),
      );
      toast.success("The status has been successfully updated.");
    } else {
      const newStatus: Status = {
        id: Date.now().toString(),
        ...statusData,
      };
      setStatuses((prev) => [...prev, newStatus]);
      toast("The new status has been successfully created.");
    }
    setIsModalOpen(false);
    setEditingStatus(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStatus(null);
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-gradient-to-br from-card to-accent/20 shadow-lg">
        <CrmHeader onCreateStatus={handleCreateStatus} />
        <CardContent>
          <StatusList
            statuses={statuses}
            onEdit={handleEditStatus}
            onDelete={handleDeleteStatus}
          />
        </CardContent>
      </Card>

      <IntegrationSettings />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold text-primary">
              <div
                className="h-4 w-4 rounded-full border-2 border-white shadow-sm dark:border-slate-800"
                style={{ backgroundColor: editingStatus?.color || "#3b82f6" }}
              />
              {editingStatus ? "Edit Status" : "Create New Status"}
            </DialogTitle>
          </DialogHeader>
          <StatusForm
            status={editingStatus}
            onSave={handleSaveStatus}
            onCancel={handleCloseModal}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CrmTabContent;
