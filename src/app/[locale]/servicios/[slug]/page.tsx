import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services } from "@/features/services/data/services";
import { ServiceIcon } from "@/features/services/components/ServiceIcon";
import { Badge } from "@/components/ui/Badge";
import { CTABanner } from "@/components/shared/CTABanner";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  const t = await getTranslations({ locale, namespace: "Services" });
  return {
    title: `${t(`items.${service.id}.title`)} | NexaFlow AI`,
    description: t(`items.${service.id}.short`),
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const t = await getTranslations({ locale, namespace: "Services" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });

  return (
    <>
      <Section>
        <Container className="max-w-4xl">
          {/* Breadcrumb - terminal style */}
          <div className="mb-8 flex items-center gap-1.5 font-mono text-xs text-foreground-muted">
            <Link href="/" className="hover:text-[var(--color-primary)]">~</Link>
            <span className="text-foreground-muted">/</span>
            <Link href="/servicios" className="hover:text-[var(--color-primary)]">{t("title")}</Link>
            <span className="text-foreground-muted">/</span>
            <span className="text-[var(--color-primary)]">{t(`items.${service.id}.title`)}</span>
          </div>

          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 text-[var(--color-primary)]">
              <ServiceIcon name={service.icon} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
                {t(`items.${service.id}.title`)}
              </h1>
              <p className="mt-2 text-base text-foreground-secondary">
                {t(`items.${service.id}.short`)}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mt-8">
            <p className="text-sm leading-relaxed text-foreground-secondary">
              {t(`items.${service.id}.description`)}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="mt-8 rounded-lg border border-border/40 bg-card/50 p-5 backdrop-blur-sm">
            <h3 className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-foreground-muted">
              // tech_stack
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {service.techStack.map((tech) => (
                <Badge key={tech} variant="primary">{tech}</Badge>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Link href="/auditoria-ia">
              <Button size="lg" variant="primary">
                {tCommon("getStarted")}
              </Button>
            </Link>
            <Link href="/contacto">
              <Button size="lg" variant="outline">
                {tCommon("bookCall")}
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      <CTABanner />
    </>
  );
}
