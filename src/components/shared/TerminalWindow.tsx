import { cn } from "@/lib/utils";

interface TerminalWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function TerminalWindow({ title = "terminal", children, className }: TerminalWindowProps) {
  return (
    <div className={cn("rounded-lg border border-border/50 bg-card/80 overflow-hidden backdrop-blur-sm", className)}>
      {/* Terminal chrome bar */}
      <div className="flex items-center gap-2 border-b border-border/30 bg-background-tertiary/50 px-4 py-2">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
        </div>
        <span className="ml-2 font-mono text-[10px] text-foreground-muted">{title}</span>
      </div>
      {/* Content */}
      <div className="p-5">
        {children}
      </div>
    </div>
  );
}
