"use client";
interface CardTitleProps {
  title: string;
  handleClick: () => void;
}

export const CardTitle = ({ title, handleClick }: CardTitleProps) => {
  return (
    <div
      className="cursor-pointer"
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <h3 className="font-medium text-foreground">{title}</h3>
    </div>
  );
};
