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
        {/* Icon */}
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] transition-colors group-hover:bg-[var(--color-primary)] group-hover:text-white">
          <ServiceIcon name={service.icon} />
        </div>

        {/* Title */}
        <h3 className="mb-2 text-lg font-semibold text-foreground">
          {t(`items.${service.id}.title`)}
        </h3>

        {/* Description */}
        <p className="mb-4 flex-1 text-sm leading-relaxed text-foreground-secondary">
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

        {/* Arrow */}
        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] opacity-0 transition-opacity group-hover:opacity-100">
          {t("learnMore")}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </Card>
    </Link>
  );
}
