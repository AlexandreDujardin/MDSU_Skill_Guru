import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variantType: {
        primary: "rounded-md gap-2 bg-button-primary text-text-alternative hover:bg-button-primary-hover pressed:bg-button-primary-pressed rounded-md gap-2",
        secondary: "rounded-md gap-2 border-2 bg-button-secondary text-button-secondary border-button-primary-secondary hover:bg-background-surface text-text-primary border-button-secondary-hover pressed:bg-button-secondary-disabled border-button-secondary-pressed",
        tertiary: "rounded-md gap-2 bg-button-tertiary text-text-tertiary hover:bg-button-tertiary-hover pressed:bg-button-tertiary-pressed",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
      },
      variant: {
        default: "",
        icon: "p-2 w-10 h-10 flex items-center justify-center",
        full: "w-full",
      },
      state: {
        default: "",
        pressed: "opacity-80",
        disabled: "bg-button-primary-disabled cursor-not-allowed",
      },
    },
    defaultVariants: {
      variantType: "primary",
      size: "md",
      variant: "default",
      state: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type, variantType, size, variant, state, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ size, variant, state, variantType }), className)} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
