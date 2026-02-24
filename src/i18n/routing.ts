import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/servicios": {
      es: "/servicios",
      en: "/services",
    },
    "/servicios/[slug]": {
      es: "/servicios/[slug]",
      en: "/services/[slug]",
    },
    "/auditoria-ia": {
      es: "/auditoria-ia",
      en: "/ai-audit",
    },
    "/nosotros": {
      es: "/nosotros",
      en: "/about",
    },
    "/contacto": {
      es: "/contacto",
      en: "/contact",
    },
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
