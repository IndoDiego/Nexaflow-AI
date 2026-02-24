import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export function CTABanner() {
  const t = useTranslations("CTA");

  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      {/* Grid + glow background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-primary)]/10 blur-[100px]" />
      </div>

      <Container className="relative">
        <div className="rounded-xl border border-[var(--color-primary)]/20 bg-card/50 p-10 text-center backdrop-blur-sm sm:p-14">
          <span className="mb-4 inline-block font-mono text-xs tracking-widest text-[var(--color-accent)]">
            {`>`} ready_to_scale
          </span>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-foreground-secondary">
            {t("subtitle")}
          </p>
          <div className="mt-8">
            <Link href="/auditoria-ia">
              <Button size="lg" variant="primary">
                {t("button")}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
