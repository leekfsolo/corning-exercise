import { cn } from "@/utils/classname.util";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  className?: string;
}

const Button = ({
  onClick,
  disabled,
  children,
  iconStart,
  iconEnd,
  className,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-md flex items-center gap-1.5 cursor-pointer hover:opacity-85 transition-opacity disabled:opacity-50 disabled:cursor-default",
        className,
      )}
      disabled={disabled}
    >
      {iconStart}
      {children}
      {iconEnd}
    </button>
  );
};

export default Button;
