import { Archive, Pause, Play, Tag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui";

export interface CampaignToolbarProps {
  selectedCampaignIds: string[];
  onUpdateTags: () => void;
  onPauseCampaigns: () => void;
  onResumeCampaigns: () => void;
  onArchiveCampaigns: () => void;
  onDeleteCampaigns: () => void;
}

export const CampaignToolbar = ({
  selectedCampaignIds,
  onUpdateTags,
  onPauseCampaigns,
  onResumeCampaigns,
  onArchiveCampaigns,
  onDeleteCampaigns,
}: CampaignToolbarProps) => {
  return (
    <>
      <span className="font-medium text-primary-foreground">
        {selectedCampaignIds.length} selected
      </span>
      <div className="ml-4 flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          className="h-9 bg-primary/10 text-primary-foreground hover:bg-primary/20"
          onClick={onUpdateTags}
        >
          <Tag className="mr-2 h-4 w-4" />
          Update tags
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="h-9 bg-primary/10 text-primary-foreground hover:bg-primary/20"
          onClick={onPauseCampaigns}
        >
          <Pause className="mr-2 h-4 w-4" />
          Pause
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="h-9 bg-primary/10 text-primary-foreground hover:bg-primary/20"
          onClick={onResumeCampaigns}
        >
          <Play className="mr-2 h-4 w-4" />
          Resume
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="h-9 bg-primary/10 text-primary-foreground hover:bg-primary/20"
          onClick={onArchiveCampaigns}
        >
          <Archive className="mr-2 h-4 w-4" />
          Archive
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="h-9 bg-primary/10 text-primary-foreground hover:bg-primary/20"
          onClick={onDeleteCampaigns}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>
    </>
  );
};
