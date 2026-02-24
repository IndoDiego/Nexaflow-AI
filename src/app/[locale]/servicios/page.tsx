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
          <div className="mb-14 text-center">
            <span className="mb-3 inline-block rounded-full bg-[var(--color-primary)]/10 px-4 py-1 text-sm font-semibold text-[var(--color-primary)]">
              {t("badge") || "Services"}
            </span>
            <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl lg:text-5xl">
              {t("title")}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-secondary">
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
