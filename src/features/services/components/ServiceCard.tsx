import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Service } from "../data/services";
import { ServiceIcon } from "./ServiceIcon";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const t = useTranslations("Services");

  return (
    <Link href={{ pathname: "/servicios/[slug]", params: { slug: service.slug } }}>
      <div className="group relative flex h-full flex-col rounded-lg border border-border/40 bg-card/40 p-5 backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-primary)]/50 hover:shadow-[0_0_40px_rgba(37,99,235,0.12)] overflow-hidden">
        {/* Animated top border on hover */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Header row: icon + category */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 text-[var(--color-primary)] transition-all duration-300 group-hover:border-[var(--color-primary)]/60 group-hover:bg-[var(--color-primary)] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <ServiceIcon name={service.icon} />
          </div>
          <span className="rounded border border-border/30 bg-background-tertiary/50 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-foreground-muted">
            {service.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-sm font-semibold text-foreground group-hover:text-[var(--color-primary)] transition-colors">
          {t(`items.${service.id}.title`)}
        </h3>

        {/* Description */}
        <p className="mb-4 flex-1 text-xs leading-relaxed text-foreground-secondary">
          {t(`items.${service.id}.short`)}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1">
          {service.techStack.slice(0, 3).map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
          {service.techStack.length > 3 && (
            <Badge>+{service.techStack.length - 3}</Badge>
          )}
        </div>

        {/* Arrow */}
        <div className="mt-4 flex items-center gap-1.5 font-mono text-xs text-[var(--color-primary)] opacity-0 translate-x-[-4px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
          <span className="text-[var(--color-accent)]">$</span> {t("learnMore")} <span className="text-[var(--color-accent)]">{"->"}</span>
        </div>

        {/* Scan sweep on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/[0.03] to-transparent" />
        </div>
      </div>
    </Link>
  );
}
