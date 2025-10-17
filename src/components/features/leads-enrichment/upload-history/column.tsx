import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { useMemo } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui";

import { UploadHistory } from "@/types/leads";

export const useHistoryColumns = () => {
  return useMemo<ColumnDef<UploadHistory>[]>(
    () => [
      {
        accessorKey: "serialNumber",
        header: "S/N",
        cell: ({ row }) => <div>{row.getValue("serialNumber")}.</div>,
      },
      {
        accessorKey: "dateTime",
        header: "Date & Time",
      },
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "outputFile",
        header: "Output File",
      },
      {
        id: "actions",
        cell: ({ row }) => {
          return <DeleteButton fileId={row.original.id} />;
        },
      },
    ],
    [],
  );
};

function DeleteButton({ fileId }: { fileId: UploadHistory["id"] }) {
  const handleDelete = () => {
    console.log({ fileId });
    toast.success("Deleted successfully");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-destructive hover:text-destructive/90"
      onClick={handleDelete}
    >
      <Trash2 className="h-4 w-4" />
      <span className="sr-only">Delete</span>
    </Button>
  );
}
