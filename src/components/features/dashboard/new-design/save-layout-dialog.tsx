import { Check } from "lucide-react";

import { ReusableDialog } from "@/components/common/modals";
import { Button, Input, Label } from "@/components/ui";

import { useWidgetsStore } from "@/lib/stores/widgets";

export const SaveLayoutDialog = () => {
  const {
    isSaveDialogOpen,
    layoutName,
    currentLayout,
    setIsSaveDialogOpen,
    setLayoutName,
    saveLayout,
  } = useWidgetsStore();

  return (
    <ReusableDialog
      open={isSaveDialogOpen}
      onOpenChange={setIsSaveDialogOpen}
      className="sm:max-w-md"
      title="Save Dashboard Layout"
      description="Give your layout a unique name to save it for future use."
      footer={
        <>
          <Button
            variant="outline"
            onClick={() => {
              setIsSaveDialogOpen(false);
              setLayoutName("");
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() => saveLayout(layoutName || currentLayout)}
            className="gap-2"
          >
            <Check className="h-4 w-4" />
            Save Layout
          </Button>
        </>
      }
    >
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="layout-name">Layout Name</Label>
          <Input
            id="layout-name"
            placeholder={
              currentLayout !== "Default Layout"
                ? currentLayout
                : "My Custom Layout"
            }
            value={layoutName}
            onChange={(e) => setLayoutName(e.target.value)}
          />
        </div>
      </div>
    </ReusableDialog>
  );
};
