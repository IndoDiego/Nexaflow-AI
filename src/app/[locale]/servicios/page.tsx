import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ServiceGrid } from "@/features/services/components/ServiceGrid";
import { CTABanner } from "@/components/shared/CTABanner";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services" });

  return {
    title: `${t("title")} | NexaFlow AI`,
    description: t("subtitle"),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Services" });

  return (
    <>
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block font-mono text-xs uppercase tracking-widest text-[var(--color-primary)]">
              {`>`} ls --services
            </span>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-4 text-base text-foreground-secondary">
              {t("subtitle")}
            </p>
          </div>
          <ServiceGrid />
        </Container>
      </Section>
      <CTABanner />
    </>
  );
}
