"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { LocaleSwitcher } from "@/components/shared/LocaleSwitcher";

const navLinks = [
  { href: "/servicios" as const, key: "services" },
  { href: "/auditoria-ia" as const, key: "audit" },
  { href: "/nosotros" as const, key: "about" },
  { href: "/contacto" as const, key: "contact" },
] as const;

export function Navbar() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-foreground">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary)] text-white text-sm font-bold">
              N
            </span>
            <span>
              Nexa<span className="text-[var(--color-primary)]">Flow</span>
              <span className="ml-1 text-xs font-normal text-foreground-muted">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                    : "text-foreground-secondary hover:bg-card-hover hover:text-foreground"
                )}
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LocaleSwitcher />
            <Link
              href="/auditoria-ia"
              className="hidden rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-dark)] md:inline-flex"
            >
              {t("cta")}
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border md:hidden"
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="8" x2="20" y2="8" />
                    <line x1="4" y1="16" x2="20" y2="16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="border-t border-border pb-4 md:hidden">
            <div className="flex flex-col gap-1 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                      : "text-foreground-secondary hover:bg-card-hover hover:text-foreground"
                  )}
                >
                  {t(link.key)}
                </Link>
              ))}
              <Link
                href="/auditoria-ia"
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-dark)]"
              >
                {t("cta")}
              </Link>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
