"use client";

import { PlusIcon, ChevronDownIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dashboardRoutes } from "@/config/routes";

export function CreateCampaignButton() {
  const { push } = useRouter();

  const handleCreateCampaign = () => {
    toast.info("Creating a new campaign");
    push(`${dashboardRoutes.campaign}/new`);
  };

  const handleCreateFromTemplate = () => {
    toast.info("Creating from template");
  };

  return (
    <DropdownMenu>
      <div className="flex">
        <Button className="rounded-r-none" onClick={handleCreateCampaign}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create a new campaign
        </Button>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-l-none border-l-[1px] border-primary-foreground/20 px-2">
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent
        align="end"
        className="bg-popover text-popover-foreground"
      >
        <DropdownMenuItem
          onClick={handleCreateFromTemplate}
          className="cursor-pointer"
        >
          Create from template
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
