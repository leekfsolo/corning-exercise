import { cn } from "@/utils/classname.util";
import { type SelectHTMLAttributes, forwardRef } from "react";
import { ChevronDown } from "lucide-react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  options: { label: string; value: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          className={cn(
            "flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 pr-8 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 appearance-none min-w-30 cursor-pointer",
            className,
          )}
          ref={ref}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
          <ChevronDown size={16} />
        </div>
      </div>
    );
  },
);
Select.displayName = "Select";

export default Select;
