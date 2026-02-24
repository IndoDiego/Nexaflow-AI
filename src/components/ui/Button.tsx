import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] shadow-lg shadow-[var(--color-primary)]/25 hover:shadow-xl hover:shadow-[var(--color-primary)]/30 hover:-translate-y-0.5":
              variant === "primary",
            "bg-background-tertiary text-foreground hover:bg-border":
              variant === "secondary",
            "border border-border bg-transparent text-foreground hover:bg-card-hover":
              variant === "outline",
            "bg-transparent text-foreground-secondary hover:bg-card-hover hover:text-foreground":
              variant === "ghost",
          },
          {
            "h-8 gap-1.5 px-3 text-sm": size === "sm",
            "h-10 gap-2 px-4 text-sm": size === "md",
            "h-12 gap-2.5 px-6 text-base": size === "lg",
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
