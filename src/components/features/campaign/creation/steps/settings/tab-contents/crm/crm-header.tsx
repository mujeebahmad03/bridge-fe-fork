import { Plus } from "lucide-react";

import { Button, CardHeader, CardTitle } from "@/components/ui";

interface CrmHeaderProps {
  onCreateStatus: () => void;
}

const CrmHeader = ({ onCreateStatus }: CrmHeaderProps) => {
  return (
    <CardHeader className="pb-4">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-xl font-bold text-primary">
            Status Management
          </CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your CRM status workflow and track progress with custom
            colors
          </p>
        </div>
        <Button
          onClick={onCreateStatus}
          className="h-11 bg-primary px-6 text-primary-foreground shadow-lg transition-all duration-200 hover:bg-primary/90 hover:shadow-xl"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Status
        </Button>
      </div>
    </CardHeader>
  );
};

export default CrmHeader;
