import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { timezones } from "@/config/timezone";

interface TimezoneSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

const TimezoneSelect = ({ value, onValueChange }: TimezoneSelectProps) => {
  return (
    <Select onValueChange={onValueChange} defaultValue={value}>
      <SelectTrigger>
        <SelectValue placeholder="Select timezone" />
      </SelectTrigger>
      <SelectContent>
        {timezones.map((timezone) => (
          <SelectItem key={timezone} value={timezone}>
            {timezone}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TimezoneSelect;
