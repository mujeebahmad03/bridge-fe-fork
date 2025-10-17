import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface IntervalCounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const IntervalCounter = ({
  value,
  onChange,
  min = 5,
  max = 120,
}: IntervalCounterProps) => {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 5);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 5);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center overflow-hidden rounded-xl border-2 border-border bg-card shadow-sm transition-all duration-200 hover:shadow-md">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-12 w-12 rounded-none border-r-2 border-border transition-all duration-200 hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
          onClick={handleDecrement}
          disabled={value <= min}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <div className="flex h-12 w-20 items-center justify-center bg-primary/10 text-lg font-bold text-primary">
          {value}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-12 w-12 rounded-none border-l-2 border-border transition-all duration-200 hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
          onClick={handleIncrement}
          disabled={value >= max}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <span className="font-medium text-muted-foreground">Minutes</span>
    </div>
  );
};

export default IntervalCounter;
