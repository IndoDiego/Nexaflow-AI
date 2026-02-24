import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export function CTABanner() {
  const t = useTranslations("CTA");

  return (
    <section className="relative overflow-hidden bg-[var(--color-primary)] py-16 sm:py-20">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/10 blur-[80px]" />
        <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-[var(--color-accent)]/20 blur-[60px]" />
      </div>

      <Container className="relative text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
          {t("subtitle")}
        </p>
        <div className="mt-8">
          <Link href="/auditoria-ia">
            <Button
              size="lg"
              className="bg-white text-[var(--color-primary)] hover:bg-white/90 shadow-xl hover:shadow-2xl"
            >
              {t("button")}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
