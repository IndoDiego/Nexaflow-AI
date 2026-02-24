import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "./Container";

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navigation");
  const tServices = useTranslations("Services");

  const serviceKeys = [
    "chatbots",
    "automation",
    "crm",
    "marketing",
    "analytics",
    "custom",
  ] as const;

  return (
    <footer className="border-t border-border bg-background-secondary">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white text-sm font-bold">
                N
              </span>
              <span className="text-lg font-bold tracking-tight text-foreground">
                Nexa<span className="gradient-text">Flow</span>
              </span>
            </Link>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-foreground-muted">{t("services")}</h3>
            <ul className="space-y-2.5">
              {serviceKeys.map((key) => (
                <li key={key}>
                  <Link
                    href="/servicios"
                    className="text-sm text-foreground-secondary transition-colors hover:text-[var(--color-primary)]"
                  >
                    {tServices(`items.${key}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-foreground-muted">{t("company")}</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/nosotros" className="text-sm text-foreground-secondary transition-colors hover:text-[var(--color-primary)]">
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <Link href="/auditoria-ia" className="text-sm text-foreground-secondary transition-colors hover:text-[var(--color-primary)]">
                  {tNav("audit")}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-foreground-secondary transition-colors hover:text-[var(--color-primary)]">
                  {tNav("blog")}
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-sm text-foreground-secondary transition-colors hover:text-[var(--color-primary)]">
                  {tNav("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-foreground-muted">{t("legal")}</h3>
            <ul className="space-y-2.5">
              <li>
                <span className="text-sm text-foreground-secondary">{t("privacy")}</span>
              </li>
              <li>
                <span className="text-sm text-foreground-secondary">{t("terms")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-foreground-muted">
            &copy; {new Date().getFullYear()} NexaFlow AI. {t("rights")}
          </p>
          <p className="text-sm text-foreground-muted">
            Crafted with AI precision
          </p>
        </div>
      </Container>
    </footer>
  );
}
