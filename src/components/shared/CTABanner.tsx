import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export function CTABanner() {
  const t = useTranslations("CTA");

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-primary)]/10 blur-[120px]" />
        <div className="absolute right-1/4 top-1/4 h-[200px] w-[200px] rounded-full bg-[var(--color-accent)]/8 blur-[80px]" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-3xl rounded-2xl border border-[var(--color-primary)]/20 bg-card/80 p-10 text-center backdrop-blur-sm sm:p-14 lg:p-16">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-foreground-secondary">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auditoria-ia">
              <Button size="lg" variant="primary">
                {t("button")}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </Button>
            </Link>
            <Link href="/contacto">
              <Button size="lg" variant="outline">
                {t("contactButton")}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
