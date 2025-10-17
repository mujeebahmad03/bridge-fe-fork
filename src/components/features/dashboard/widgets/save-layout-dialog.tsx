import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

interface SaveLayoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (name: string) => void;
  onCancel: () => void;
  toggleEditMode: () => void;
}

export function SaveLayoutDialog({
  open,
  onOpenChange,
  onSave,
  onCancel,
  toggleEditMode,
}: SaveLayoutDialogProps) {
  const [layoutName, setLayoutName] = useState("");

  const handleSaveLayout = () => {
    console.log(layoutName);
    if (!layoutName.trim()) {
      toast.error("Please enter a name for your layout");
      return;
    }

    onSave(layoutName);
    onOpenChange(false);
    setLayoutName("");
    toast.success("Your layout has been saved successfully.");
    toggleEditMode();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Layout</DialogTitle>
          <DialogDescription>
            Give your layout a name to save it for later use.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input
            placeholder="Enter layout name"
            value={layoutName}
            onChange={(e) => setLayoutName(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSaveLayout} disabled={!layoutName.trim()}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
