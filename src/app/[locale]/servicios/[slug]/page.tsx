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
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-foreground-muted">
            <Link href="/" className="hover:text-foreground">{tCommon("backToHome")}</Link>
            <span>/</span>
            <Link href="/servicios" className="hover:text-foreground">{t("title")}</Link>
            <span>/</span>
            <span className="text-foreground">{t(`items.${service.id}.title`)}</span>
          </div>

          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
              <ServiceIcon name={service.icon} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                {t(`items.${service.id}.title`)}
              </h1>
              <p className="mt-2 text-lg text-foreground-secondary">
                {t(`items.${service.id}.short`)}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mt-8 prose prose-lg max-w-none text-foreground-secondary">
            <p className="text-base leading-relaxed">
              {t(`items.${service.id}.description`)}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="mt-8">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground-muted">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.techStack.map((tech) => (
                <Badge key={tech} variant="primary">{tech}</Badge>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
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
