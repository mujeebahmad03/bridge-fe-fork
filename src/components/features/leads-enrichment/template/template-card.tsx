import { cn } from "@/lib/utils";
import { Template } from "@/types/leads";

interface TemplateCardProps extends Template {
  onClick: () => void;
  className?: string;
}

export const TemplateCard = ({
  icon: Icon,
  title,
  description,
  onClick,
  className,
}: TemplateCardProps) => {
  return (
    <div
      className={cn(
        "transition-all-200 animate-fade-in cursor-pointer rounded-lg bg-card p-6 hover:bg-accent/50",
        className,
      )}
      onClick={onClick}
    >
      <div className="mb-4">{<Icon />}</div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
