import type { MetadataRoute } from "next";
import { services } from "@/features/services/data/services";

const baseUrl = "https://nexaflow.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const localePages = [
    { path: "", changeFrequency: "monthly" as const, priority: 1.0 },
    { path: "/servicios", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/auditoria-ia", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/nosotros", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/contacto", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/blog", changeFrequency: "weekly" as const, priority: 0.8 },
  ];

  const staticPages = localePages.flatMap((page) => [
    {
      url: `${baseUrl}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    },
    {
      url: `${baseUrl}/en${page.path === "/servicios" ? "/services" : page.path === "/auditoria-ia" ? "/ai-audit" : page.path === "/nosotros" ? "/about" : page.path === "/contacto" ? "/contact" : page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    },
  ]);

  const servicePages = services.flatMap((service) => [
    {
      url: `${baseUrl}/servicios/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ]);

  return [...staticPages, ...servicePages];
}
