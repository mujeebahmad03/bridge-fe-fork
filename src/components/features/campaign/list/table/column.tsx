import { ColumnDef } from "@tanstack/react-table";
import { formatDistance } from "date-fns";
import { ArrowUpDown, BarChart } from "lucide-react";
import { CheckedState } from "@radix-ui/react-checkbox";

import { ActionMenu } from "../action-menu";
import { Button, Checkbox } from "@/components/ui";
import { Campaign } from "@/types/campaign";
import { StatusBadge } from "./status-badge";
import { CircleProgress } from "@/components/common/icons";
import { TagBadgeList } from "./tag-badge";

export const columns: ColumnDef<Campaign>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: CheckedState) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: CheckedState) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div className="flex items-center">
        Campaign Name
        <Button
          variant="ghost"
          size="sm"
          className="-mr-3 h-8 data-[state=open]:bg-accent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const emoji = "😀"; // Just using a default emoji for demo
      return (
        <div className="flex items-center gap-2">
          <span className="text-lg leading-none">{emoji}</span>
          <span className="font-medium">{row.getValue("name")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "leadsCompleted",
    header: "Leads completed",
    cell: ({ row }) => <CircleProgress campaign={row.original} />,
  },
  {
    accessorKey: "sender",
    header: "Sender",
    cell: ({ row }) => <div>{row.original.sender || "-"}</div>,
  },
  {
    accessorKey: "tags",
    header: "Tag",
    cell: ({ row }) => <TagBadgeList tags={row.original.tags} />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <div className="flex items-center justify-end text-right">
        Created at
        <Button
          variant="ghost"
          size="sm"
          className="-mr-3 h-8 data-[state=open]:bg-accent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      const formattedDate = formatDistance(date, new Date(), {
        addSuffix: true,
      });
      return <div className="text-right font-medium">{formattedDate}</div>;
    },
    sortingFn: (rowA, rowB) => {
      return (
        new Date(rowA.original.createdAt).getTime() -
        new Date(rowB.original.createdAt).getTime()
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => (
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          aria-label="Campaign analytics"
        >
          <BarChart className="h-4 w-4" />
        </Button>
        <ActionMenu campaign={row.original} />
      </div>
    ),
  },
];
