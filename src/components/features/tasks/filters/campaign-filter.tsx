import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CampaignFilterProps {
  value: string | "all";
  onChange: (value: string | "all") => void;
}

export const CampaignFilter = ({ value, onChange }: CampaignFilterProps) => {
  const campaigns = ["Campaign 1", "Campaign 2", "Campaign 3"];

  return (
    <div className="space-y-2">
      <h3 className="font-medium">Campaign</h3>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by campaign" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Campaigns</SelectItem>
          {campaigns.map((campaign) => (
            <SelectItem key={campaign} value={campaign}>
              {campaign}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
