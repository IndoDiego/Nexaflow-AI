import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
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
      <div className="group relative flex h-full flex-col rounded-xl border border-border bg-card p-6 card-lift hover:border-[var(--color-primary)]/40 hover:shadow-lg hover:shadow-[var(--color-primary)]/5 overflow-hidden">
        {/* Gradient accent on top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Icon + category */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary)]/8 text-[var(--color-primary)] transition-all duration-300 group-hover:bg-[var(--color-primary)] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[var(--color-primary)]/25">
            <ServiceIcon name={service.icon} />
          </div>
          <Badge>{service.category}</Badge>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-base font-bold text-foreground group-hover:text-[var(--color-primary)] transition-colors">
          {t(`items.${service.id}.title`)}
        </h3>

        {/* Description */}
        <p className="mb-5 flex-1 text-sm leading-relaxed text-foreground-secondary">
          {t(`items.${service.id}.short`)}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {service.techStack.slice(0, 3).map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
          {service.techStack.length > 3 && (
            <Badge>+{service.techStack.length - 3}</Badge>
          )}
        </div>

        {/* Arrow indicator */}
        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          {t("learnMore")}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
