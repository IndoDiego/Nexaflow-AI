import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { AuditForm } from "@/features/audit/components/AuditForm";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Audit" });

  return {
    title: `${t("title")} | NexaFlow AI`,
    description: t("subtitle"),
  };
}

export default async function AuditPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Audit" });

  const benefits = ["assessment", "roi", "roadmap", "meeting"] as const;

  return (
    <>
      <Section>
        <Container className="max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-lg text-foreground-secondary">
              {t("subtitle")}
            </p>
            <p className="mt-2 text-foreground-muted">
              {t("description")}
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-5">
            {/* Benefits sidebar */}
            <div className="lg:col-span-2">
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                {t("benefits.title")}
              </h3>
              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    </span>
                    <span className="text-sm text-foreground-secondary">
                      {t(`benefits.items.${b}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
                <AuditForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
