import { Archive, Pause, Play, Tag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui";
import { CampaignToolbarProps } from "./campaign-toolbar";

export const MobileCampaignToolbar = ({
  onUpdateTags,
  onPauseCampaigns,
  onResumeCampaigns,
  onArchiveCampaigns,
  onDeleteCampaigns,
}: CampaignToolbarProps) => {
  return (
    <div className="mt-4 flex flex-col gap-2">
      <Button
        variant="secondary"
        size="sm"
        className="w-full justify-start"
        onClick={onUpdateTags}
      >
        <Tag className="mr-2 h-4 w-4" />
        Update tags
      </Button>
      <Button
        variant="secondary"
        size="sm"
        className="w-full justify-start"
        onClick={onPauseCampaigns}
      >
        <Pause className="mr-2 h-4 w-4" />
        Pause
      </Button>
      <Button
        variant="secondary"
        size="sm"
        className="w-full justify-start"
        onClick={onResumeCampaigns}
      >
        <Play className="mr-2 h-4 w-4" />
        Resume
      </Button>
      <Button
        variant="secondary"
        size="sm"
        className="w-full justify-start"
        onClick={onArchiveCampaigns}
      >
        <Archive className="mr-2 h-4 w-4" />
        Archive
      </Button>
      <Button
        variant="secondary"
        size="sm"
        className="w-full justify-start"
        onClick={onDeleteCampaigns}
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Delete
      </Button>
    </div>
  );
};
