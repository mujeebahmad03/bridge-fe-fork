import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { MobileCampaignToolbar } from "./mobile-toolbar";

interface MobileToolbarDrawerProps {
  selectedCampaignIds: string[];
  open: boolean;
  setOpen: (open: boolean) => void;
  onUpdateTags: () => void;
  onPauseCampaigns: () => void;
  onResumeCampaigns: () => void;
  onArchiveCampaigns: () => void;
  onDeleteCampaigns: () => void;
}

export const MobileToolbarDrawer = ({
  selectedCampaignIds,
  open,
  setOpen,
  onUpdateTags,
  onPauseCampaigns,
  onResumeCampaigns,
  onArchiveCampaigns,
  onDeleteCampaigns,
}: MobileToolbarDrawerProps) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          className="animate-slide-in fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-primary px-4 py-2 text-primary-foreground shadow-lg"
          size="sm"
        >
          {selectedCampaignIds.length} selected
        </Button>
      </DrawerTrigger>
      <DrawerContent className="border-t border-border bg-background px-4 pb-6 pt-2">
        <MobileCampaignToolbar
          selectedCampaignIds={selectedCampaignIds}
          onUpdateTags={onUpdateTags}
          onPauseCampaigns={onPauseCampaigns}
          onResumeCampaigns={onResumeCampaigns}
          onArchiveCampaigns={onArchiveCampaigns}
          onDeleteCampaigns={onDeleteCampaigns}
        />
      </DrawerContent>
    </Drawer>
  );
};
