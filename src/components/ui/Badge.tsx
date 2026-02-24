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
        "inline-flex items-center rounded px-2 py-0.5 font-mono text-[10px] font-medium tracking-wider uppercase",
        {
          "bg-background-tertiary/80 text-foreground-muted border border-border/30": variant === "default",
          "bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20": variant === "primary",
          "bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20": variant === "accent",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
