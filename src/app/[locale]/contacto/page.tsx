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
          <span className="mb-3 inline-block rounded-full bg-[var(--color-primary)]/10 px-4 py-1 text-sm font-semibold text-[var(--color-primary)]">
            {t("badge") || "Get in Touch"}
          </span>
          <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl lg:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-foreground-secondary">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Info */}
          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)]/8 text-[var(--color-primary)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-foreground-muted">Email</p>
                  <p className="text-sm font-semibold text-foreground">{t("info.email")}</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-accent)]/8 text-[var(--color-accent-dark)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div>
                  <p className="text-sm text-foreground-secondary">{t("info.response")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
              <ContactFormClient />
            </div>
          </div>
        </div>

        {/* Schedule a call CTA */}
        <div className="mt-16 rounded-2xl border border-[var(--color-primary)]/15 bg-[var(--color-primary)]/5 p-8 text-center sm:p-12">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>
          </div>
          <h2 className="mt-4 text-2xl font-extrabold text-foreground">
            {t("info.schedule")}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-foreground-secondary">
            {t("info.response")}
          </p>
          <a
            href={process.env.NEXT_PUBLIC_CALENDLY_URL ?? "mailto:indogroup.diego@gmail.com?subject=Schedule a call"}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--color-primary)]/25 transition-all hover:bg-[var(--color-primary-dark)] hover:shadow-xl hover:-translate-y-0.5"
          >
            {t("info.schedule")}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </Container>
    </Section>
  );
}
