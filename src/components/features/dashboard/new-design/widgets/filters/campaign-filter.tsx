import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Campaign } from "@/types/task";

interface CampaignSelectorProps {
  campaignId: string;
  campaigns: Campaign[];
  onCampaignChange: (campaignId: string) => void;
}

export const CampaignSelector = ({
  campaignId,
  campaigns,
  onCampaignChange,
}: CampaignSelectorProps) => {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Campaign</h4>
      <Select value={campaignId} onValueChange={onCampaignChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select campaign" />
        </SelectTrigger>
        <SelectContent>
          {campaigns.map((campaign) => (
            <SelectItem key={campaign.id} value={campaign.id}>
              {campaign.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
