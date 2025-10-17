import {
  BarChart,
  Settings,
  Share2,
  FileText,
  Copy,
  Archive,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Campaign } from "@/types/campaign";

interface ActionMenuProps {
  campaign: Campaign;
}

export function ActionMenu({}: ActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-foreground hover:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 border-border bg-popover text-popover-foreground"
      >
        <DropdownMenuItem
          onClick={() => toast.info("Lead list opened")}
          className="cursor-pointer"
        >
          <BarChart className="mr-2 h-4 w-4" />
          <span>Lead list</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => toast.info("Campaign settings opened")}
          className="cursor-pointer"
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Campaign settings</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => toast.info("Launched leads opened")}
          className="cursor-pointer"
        >
          <FileText className="mr-2 h-4 w-4" />
          <span>Launched leads</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => toast.info("Campaign shared")}
          className="cursor-pointer"
        >
          <Share2 className="mr-2 h-4 w-4" />
          <span>Share campaign publicly</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => toast.info("Campaign saved as template")}
          className="cursor-pointer"
        >
          <FileText className="mr-2 h-4 w-4" />
          <span>Save campaign as template</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => toast.info("Campaign duplicated")}
          className="cursor-pointer"
        >
          <Copy className="mr-2 h-4 w-4" />
          <span>Duplicate</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-border" />

        <DropdownMenuItem
          onClick={() => toast.info("Campaign archived")}
          className="cursor-pointer"
        >
          <Archive className="mr-2 h-4 w-4" />
          <span>Archive</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => toast.info("Campaign deleted")}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete campaign</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
