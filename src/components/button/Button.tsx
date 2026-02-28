import { cn } from "@/utils/classname.util";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "success";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 border-transparent",
  secondary:
    "bg-slate-100 text-slate-900 hover:bg-slate-200 border-transparent",
  outline:
    "bg-transparent border-slate-200 text-slate-900 hover:bg-slate-900 hover:text-white",
  ghost: "bg-transparent border-transparent text-slate-900 hover:bg-slate-100",
  danger:
    "border border-red-600 text-red-600 hover:bg-red-700 hover:text-white",
  success:
    "border border-green-600 text-green-600 hover:bg-green-700 hover:text-white",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 py-2 text-sm",
  lg: "h-12 px-6 text-base",
};

const Button = ({
  className,
  variant = "primary",
  size = "md",
  iconStart,
  iconEnd,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 border cursor-pointer",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {iconStart}
      {children}
      {iconEnd}
    </button>
  );
};

export default Button;
