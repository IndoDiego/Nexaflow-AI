import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border/50 bg-card/80 p-6 backdrop-blur-sm noise-texture",
        hover &&
          "transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-primary)]/40 hover:shadow-[0_0_30px_rgba(37,99,235,0.08)] hover-scan",
        className
      )}
    >
      {children}
    </div>
  );
}
