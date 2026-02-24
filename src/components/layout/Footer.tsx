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
    <footer className="border-t border-border/30 bg-background-secondary">
      <Container className="py-10 lg:py-14">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[var(--color-primary)] text-white text-[10px] font-mono font-bold">
                N
              </span>
              <span className="font-mono text-sm text-foreground">
                nexa<span className="text-[var(--color-primary)]">flow</span>
                <span className="text-foreground-muted">.ai</span>
              </span>
            </Link>
            <p className="text-xs text-foreground-muted leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-foreground-muted">{t("services")}</h3>
            <ul className="space-y-1.5">
              {serviceKeys.map((key) => (
                <li key={key}>
                  <Link
                    href="/servicios"
                    className="text-xs text-foreground-secondary transition-colors hover:text-[var(--color-primary)]"
                  >
                    {tServices(`items.${key}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-foreground-muted">{t("company")}</h3>
            <ul className="space-y-1.5">
              <li>
                <Link href="/nosotros" className="text-xs text-foreground-secondary transition-colors hover:text-[var(--color-primary)]">
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <Link href="/auditoria-ia" className="text-xs text-foreground-secondary transition-colors hover:text-[var(--color-primary)]">
                  {tNav("audit")}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-xs text-foreground-secondary transition-colors hover:text-[var(--color-primary)]">
                  {tNav("blog")}
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-xs text-foreground-secondary transition-colors hover:text-[var(--color-primary)]">
                  {tNav("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-foreground-muted">{t("legal")}</h3>
            <ul className="space-y-1.5">
              <li>
                <span className="text-xs text-foreground-secondary">{t("privacy")}</span>
              </li>
              <li>
                <span className="text-xs text-foreground-secondary">{t("terms")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-border/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-mono text-[10px] text-foreground-muted">
            &copy; {new Date().getFullYear()} NexaFlow AI. {t("rights")}
          </p>
          <p className="font-mono text-[10px] text-foreground-muted">
            <span className="text-[var(--color-accent)]">$</span> built_with --ai --precision
          </p>
        </div>
      </Container>
    </footer>
  );
}
