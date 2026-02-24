import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export function CTABanner() {
  const t = useTranslations("CTA");

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      {/* Strong glow background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-primary)]/15 blur-[150px]" />
        <div className="absolute right-1/4 top-1/4 h-[200px] w-[200px] rounded-full bg-[var(--color-accent)]/10 blur-[80px]" />
      </div>

      <Container className="relative">
        <div className="relative rounded-xl border border-[var(--color-primary)]/30 bg-card/30 overflow-hidden backdrop-blur-md">
          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-xl shadow-[inset_0_0_30px_rgba(37,99,235,0.05)]" />

          {/* Terminal chrome */}
          <div className="flex items-center gap-2 border-b border-border/20 px-5 py-2.5">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="ml-2 font-mono text-[10px] text-foreground-muted">nexaflow@ai ~ ready_to_scale</span>
          </div>

          <div className="p-8 text-center sm:p-12 lg:p-16">
            <div className="mb-5 font-mono text-xs text-[var(--color-accent)]">
              <span className="text-foreground-muted">$</span> nexaflow <span className="text-[var(--color-primary)]">audit</span> <span className="text-foreground-muted">--your-business</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-foreground-secondary">
              {t("subtitle")}
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/auditoria-ia">
                <Button size="lg" variant="primary">
                  {t("button")}
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </Button>
              </Link>
              <Link href="/contacto">
                <Button size="lg" variant="outline">
                  <span className="text-[var(--color-accent)] mr-1">$</span> contact --us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
