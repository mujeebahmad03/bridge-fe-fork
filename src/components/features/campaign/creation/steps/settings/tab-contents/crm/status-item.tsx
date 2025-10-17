"use client";

import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Badge,
  Button,
} from "@/components/ui";

interface Status {
  id: string;
  title: string;
  color: string;
}

interface StatusItemProps {
  status: Status;
  onEdit: (status: Status) => void;
  onDelete: (id: string) => void;
}

const StatusItem: React.FC<StatusItemProps> = ({
  status,
  onEdit,
  onDelete,
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    onDelete(status.id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary/20 hover:bg-accent/50 hover:shadow-md">
        <div className="flex items-center gap-4">
          <div
            className="h-4 w-4 rounded-full border-2 border-white shadow-sm dark:border-slate-800"
            style={{ backgroundColor: status.color }}
          />
          <div>
            <h4 className="font-medium text-card-foreground">{status.title}</h4>
            <Badge
              variant="outline"
              className="mt-1 text-xs"
              style={{
                borderColor: `${status.color}40`,
                backgroundColor: `${status.color}10`,
                color: status.color,
              }}
            >
              {status.color.toUpperCase()}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(status)}
            className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDeleteDialog(true)}
            className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Status</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the status &quot;{status.title}
              &quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default StatusItem;
