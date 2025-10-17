import { Download } from "lucide-react";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";

export const ExportCSV = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          <span>Export CSV</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Download only filtered data</DropdownMenuItem>
        <DropdownMenuItem>Download all data</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
