import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  state?: "default" | "hover" | "focus" | "error" | "disabled";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, state = "default", disabled, ...props }, ref) => {
    const baseStyles =
      "h-14 px-6 py-4 w-full rounded-md text-base font-medium focus-visible:outline-none transition-all";

    const stateStyles = {
      default: "border-2 border-[#E6E6E6] bg-white text-[#7D7F7F]",
      hover: "border-2 border-[#9FA1A1] bg-[#FFFDFC] text-[#7D7F7F]",
      focus: "border-2 border-[#621F59] bg-[#F4F8F8] text-[#383939]",
      error: "border-2 border-[#E50C4A] bg-white text-[#383939]",
      disabled: "border-2 border-[#E6E6E6] bg-white text-[#9FA1A1] cursor-not-allowed opacity-50",
    };

    return (
      <input
        ref={ref}
        className={cn(baseStyles, stateStyles[state], className)}
        disabled={disabled || state === "disabled"}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
