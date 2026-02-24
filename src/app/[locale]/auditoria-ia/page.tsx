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
            <span className="mb-3 inline-block font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]">
              {`>`} run audit --free
            </span>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-base text-foreground-secondary">
              {t("subtitle")}
            </p>
            <p className="mt-2 text-sm text-foreground-muted">
              {t("description")}
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-5">
            {/* Benefits sidebar */}
            <div className="lg:col-span-2">
              <div className="rounded-lg border border-border/40 bg-card/50 p-5 backdrop-blur-sm">
                <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                  {t("benefits.title")}
                </h3>
                <ul className="space-y-3">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <span className="mt-0.5 font-mono text-sm text-[var(--color-accent)]">+</span>
                      <span className="text-xs text-foreground-secondary">
                        {t(`benefits.items.${b}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="rounded-lg border border-border/40 bg-card/50 p-6 backdrop-blur-sm sm:p-8">
                <AuditForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
