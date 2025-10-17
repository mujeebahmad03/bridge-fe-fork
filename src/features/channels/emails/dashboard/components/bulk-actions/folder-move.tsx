"use client";

import { FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEmailStore } from "@/emails/dashboard/stores";
import { folderOptions } from "@/emails/dashboard/constants";

export function FolderMoveDropdown() {
  const activeFolder = useEmailStore((state) => state.activeFolder);

  const availableFolders = folderOptions.filter(
    (folder) => folder.id !== activeFolder,
  );
  const onMoveToFolder = (folderId: string) => {
    console.log(`Moving emails to folder: ${folderId}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <FolderOpen className="h-4 w-4" />
          <span className="text-sm">Move to</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {availableFolders.map((folder) => {
          const Icon = folder.icon;
          return (
            <DropdownMenuItem
              key={folder.id}
              onClick={() => onMoveToFolder(folder.id)}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              <span>{folder.name}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
