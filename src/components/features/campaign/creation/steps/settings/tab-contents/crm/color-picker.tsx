import { presetColors } from "@/config/preset-colors";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 rounded-lg border-2 border-dashed border-border bg-accent/30 p-3">
        <div
          className="h-6 w-6 flex-shrink-0 rounded-md border-2 border-white shadow-sm dark:border-slate-800"
          style={{ backgroundColor: color }}
        />
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium text-foreground">
            Selected Color
          </div>
          <div className="truncate font-mono text-xs text-muted-foreground">
            {color.toUpperCase()}
          </div>
        </div>
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="h-6 w-10 flex-shrink-0 cursor-pointer rounded border border-border bg-transparent"
        />
      </div>

      <div>
        <div className="mb-2 text-sm font-medium text-foreground">
          Preset Colors
        </div>
        <div className="grid grid-cols-10 gap-1.5">
          {presetColors.map((presetColor) => (
            <button
              key={presetColor}
              type="button"
              onClick={() => onChange(presetColor)}
              className={cn(
                "h-6 w-6 rounded-md border-2 transition-all duration-200 hover:scale-110 hover:shadow-md",
                color === presetColor
                  ? "scale-110 border-primary shadow-md"
                  : "border-white hover:border-primary/50 dark:border-slate-800",
              )}
              style={{ backgroundColor: presetColor }}
              title={presetColor.toUpperCase()}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
