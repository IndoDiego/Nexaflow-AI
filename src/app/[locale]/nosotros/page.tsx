import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { CTABanner } from "@/components/shared/CTABanner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });

  return {
    title: `${t("title")} | NexaFlow AI`,
    description: t("subtitle"),
  };
}

const valueIcons: Record<string, React.ReactNode> = {
  innovation: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="m6.8 15-3.5 2"/><path d="m20.7 17-3.5-2"/><path d="M6.3 20.1 8 16"/><path d="m16 16 1.7 4.1"/><circle cx="12" cy="12" r="4"/></svg>,
  results: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>,
  transparency: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
  partnership: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/></svg>,
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "About" });

  const values = ["innovation", "results", "transparency", "partnership"] as const;

  return (
    <>
      <Section>
        <Container className="max-w-4xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <span className="mb-3 inline-block rounded-full bg-[var(--color-primary)]/10 px-4 py-1 text-sm font-semibold text-[var(--color-primary)]">
              {t("badge") || "About Us"}
            </span>
            <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl lg:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-lg text-foreground-secondary">
              {t("subtitle")}
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-base text-foreground-secondary leading-relaxed">
              {t("mission")}
            </p>
          </div>

          {/* Values */}
          <div className="grid gap-5 sm:grid-cols-2">
            {values.map((v) => (
              <Card key={v} hover={false} className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]/8 text-[var(--color-primary)]">
                  {valueIcons[v]}
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">{t(`values.${v}.title`)}</h3>
                  <p className="mt-1 text-sm text-foreground-secondary">
                    {t(`values.${v}.description`)}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <CTABanner />
    </>
  );
}
