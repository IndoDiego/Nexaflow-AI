import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { HeroSection } from "@/features/hero/components/HeroSection";
import { HowItWorks } from "@/features/hero/components/HowItWorks";
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
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    alternates: {
      canonical: locale === "es" ? "https://nexaflow.ai" : "https://nexaflow.ai/en",
      languages: {
        es: "https://nexaflow.ai",
        en: "https://nexaflow.ai/en",
      },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Services" });

  return (
    <>
      <HeroSection />

      {/* Featured Services */}
      <Section>
        <Container>
          <div className="mb-14 text-center">
            <span className="mb-3 inline-block rounded-full bg-[var(--color-primary)]/10 px-4 py-1 text-sm font-semibold text-[var(--color-primary)]">
              {t("badge") || "What We Do"}
            </span>
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-secondary">
              {t("subtitle")}
            </p>
          </div>
          <ServiceGrid featuredOnly />
        </Container>
      </Section>

      <HowItWorks />
      <CTABanner />
    </>
  );
}
