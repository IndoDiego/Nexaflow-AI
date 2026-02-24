"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Pathnames } from "@/i18n/routing";

// Pathnames without dynamic segments that are safe for router.replace
const staticPathnames = ["/", "/servicios", "/auditoria-ia", "/nosotros", "/contacto", "/blog"] as const;
type StaticPathname = (typeof staticPathnames)[number];

function isStaticPathname(p: string): p is StaticPathname {
  return (staticPathnames as readonly string[]).includes(p);
}

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Navigation");

  function switchLocale() {
    const nextLocale = locale === "es" ? "en" : "es";
    // For dynamic routes, fallback to homepage
    const target = isStaticPathname(pathname) ? pathname : ("/" as const);
    router.replace(target, { locale: nextLocale });
  }

  return (
    <button
      onClick={switchLocale}
      className="flex h-9 items-center justify-center rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground-secondary transition-colors hover:bg-card-hover hover:text-foreground"
      aria-label={`Switch to ${locale === "es" ? "English" : "Spanish"}`}
    >
      {t("languageSwitch")}
    </button>
  );
}
