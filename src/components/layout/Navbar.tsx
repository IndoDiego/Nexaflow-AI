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
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/60 backdrop-blur-xl">
      <Container>
        <nav className="flex h-14 items-center justify-between">
          {/* Logo - terminal style */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[var(--color-primary)] text-white text-xs font-mono font-bold pulse-glow">
              N
            </span>
            <span className="font-mono text-sm tracking-tight text-foreground">
              nexa<span className="text-[var(--color-primary)]">flow</span>
              <span className="text-foreground-muted">.ai</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={cn(
                  "relative rounded-md px-3 py-1.5 font-mono text-xs tracking-wide transition-all duration-200",
                  pathname === link.href
                    ? "text-[var(--color-primary)] bg-[var(--color-primary)]/8"
                    : "text-foreground-muted hover:text-foreground hover:bg-card-hover"
                )}
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <LocaleSwitcher />
            <Link
              href="/auditoria-ia"
              className="hidden items-center gap-1.5 rounded-md border border-[var(--color-primary)]/50 bg-[var(--color-primary)]/10 px-3 py-1.5 font-mono text-xs text-[var(--color-primary)] transition-all hover:bg-[var(--color-primary)] hover:text-white hover:shadow-[0_0_15px_rgba(37,99,235,0.3)] md:inline-flex"
            >
              <span className="text-[var(--color-accent)]">$</span> {t("cta")}
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-border/50 text-foreground-muted hover:text-foreground md:hidden"
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          <div className="border-t border-border/30 pb-4 md:hidden">
            <div className="flex flex-col gap-0.5 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2 font-mono text-xs tracking-wide transition-colors",
                    pathname === link.href
                      ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                      : "text-foreground-muted hover:bg-card-hover hover:text-foreground"
                  )}
                >
                  <span className="text-foreground-muted mr-2">&gt;</span>
                  {t(link.key)}
                </Link>
              ))}
              <Link
                href="/auditoria-ia"
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-md border border-[var(--color-primary)]/50 bg-[var(--color-primary)]/10 px-4 py-2 text-center font-mono text-xs text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)] hover:text-white"
              >
                <span className="text-[var(--color-accent)]">$</span> {t("cta")}
              </Link>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
