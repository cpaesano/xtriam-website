import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          {
            // Variants
            "bg-primary text-primary-foreground hover:bg-brand-blue-700 focus-visible:ring-brand-blue-500":
              variant === "primary",
            "bg-muted text-foreground hover:bg-gray-200 focus-visible:ring-gray-500":
              variant === "secondary",
            "bg-accent text-accent-foreground hover:bg-brand-orange-600 focus-visible:ring-brand-orange-500":
              variant === "accent",
            "border border-border bg-transparent hover:bg-muted focus-visible:ring-brand-blue-500":
              variant === "outline",
            "bg-transparent hover:bg-muted focus-visible:ring-brand-blue-500":
              variant === "ghost",
            // Sizes
            "h-8 px-3 text-sm": size === "sm",
            "h-10 px-4 text-base": size === "md",
            "h-12 px-6 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
