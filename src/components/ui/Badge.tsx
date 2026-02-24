import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "accent";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium",
        {
          "bg-background-tertiary text-foreground-muted": variant === "default",
          "bg-[var(--color-primary)]/10 text-[var(--color-primary)]": variant === "primary",
          "bg-[var(--color-accent)]/10 text-[var(--color-accent-dark)]": variant === "accent",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
