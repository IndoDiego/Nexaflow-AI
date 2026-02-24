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
      <Card className="group flex h-full flex-col">
        {/* Header row: icon + category */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-md border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 text-[var(--color-primary)] transition-all group-hover:border-[var(--color-primary)]/50 group-hover:bg-[var(--color-primary)] group-hover:text-white group-hover:shadow-[0_0_15px_rgba(37,99,235,0.3)]">
            <ServiceIcon name={service.icon} />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-muted">
            {service.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-2 font-mono text-sm font-semibold text-foreground group-hover:text-[var(--color-primary)] transition-colors">
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

        {/* Arrow - terminal style */}
        <div className="mt-4 flex items-center gap-1 font-mono text-xs text-[var(--color-primary)] opacity-0 transition-opacity group-hover:opacity-100">
          <span className="text-[var(--color-accent)]">{"->"}</span> {t("learnMore")}
        </div>
      </Card>
    </Link>
  );
}
