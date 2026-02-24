"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { services, categories, type ServiceCategory } from "../data/services";
import { ServiceCard } from "./ServiceCard";
import { cn } from "@/lib/utils";

interface ServiceGridProps {
  featuredOnly?: boolean;
}

export function ServiceGrid({ featuredOnly = false }: ServiceGridProps) {
  const t = useTranslations("Services");
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | "all">("all");
  const [search, setSearch] = useState("");

  const filteredServices = services.filter((service) => {
    if (featuredOnly && !service.featured) return false;
    if (activeCategory !== "all" && service.category !== activeCategory) return false;
    if (search) {
      const title = t(`items.${service.id}.title`).toLowerCase();
      const short = t(`items.${service.id}.short`).toLowerCase();
      const q = search.toLowerCase();
      return title.includes(q) || short.includes(q);
    }
    return true;
  });

  return (
    <div>
      {/* Search & Filter */}
      {!featuredOnly && (
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border bg-card py-3 pl-12 pr-4 text-sm text-foreground placeholder:text-foreground-muted focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
            />
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                  activeCategory === cat.key
                    ? "bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/25"
                    : "bg-card border border-border text-foreground-secondary hover:text-foreground hover:border-[var(--color-primary)]/30"
                )}
              >
                {t(`categories.${cat.translationKey}`)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {filteredServices.length === 0 && (
        <p className="py-12 text-center text-foreground-muted">
          No se encontraron servicios.
        </p>
      )}
    </div>
  );
}
