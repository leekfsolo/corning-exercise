import { cn } from "@/utils/classname.util";
import { type InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, errorMessage, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
            className,
            errorMessage && "border-red-600 focus-visible:ring-red-600",
          )}
          ref={ref}
          {...props}
        />
        {errorMessage && (
          <small className="text-sm text-red-600">{errorMessage}</small>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export default Input;
