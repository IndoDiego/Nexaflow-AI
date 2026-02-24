import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ContactFormClient } from "@/features/contact/components/ContactFormClient";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });

  return {
    title: `${t("title")} | NexaFlow AI`,
    description: t("subtitle"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Contact" });

  return (
    <Section>
      <Container className="max-w-4xl">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block font-mono text-xs uppercase tracking-widest text-[var(--color-primary)]">
            // contact
          </span>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-base text-foreground-secondary">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Info */}
          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-lg border border-border/40 bg-card/50 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 text-[var(--color-primary)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-foreground-muted">Email</p>
                  <p className="font-mono text-xs text-foreground">{t("info.email")}</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-border/40 bg-card/50 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 text-[var(--color-accent)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div>
                  <p className="font-mono text-xs text-foreground-secondary">{t("info.response")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-lg border border-border/40 bg-card/50 p-6 backdrop-blur-sm sm:p-8">
              <ContactFormClient />
            </div>
          </div>
        </div>

        {/* Calendly Section */}
        <div className="mt-16">
          <div className="text-center mb-6">
            <span className="mb-2 inline-block font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]">
              // schedule
            </span>
            <h2 className="text-2xl font-bold text-foreground">
              {t("info.schedule")}
            </h2>
          </div>
          <div className="rounded-lg border border-border/40 bg-card/50 overflow-hidden backdrop-blur-sm">
            <div
              className="calendly-inline-widget"
              data-url={process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/your-nexaflow-url"}
              style={{ minWidth: "320px", height: "630px" }}
            />
            <script src="https://assets.calendly.com/assets/external/widget.js" async />
          </div>
        </div>
      </Container>
    </Section>
  );
}
