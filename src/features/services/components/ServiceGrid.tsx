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
          {/* Search - terminal style */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-[var(--color-primary)]">$</span>
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-border/50 bg-card/50 py-2.5 pl-8 pr-4 font-mono text-xs text-foreground placeholder:text-foreground-muted focus:border-[var(--color-primary)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]/30 backdrop-blur-sm"
            />
          </div>

          {/* Category tabs - code style */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  "rounded-md px-3 py-1.5 font-mono text-xs transition-all duration-200",
                  activeCategory === cat.key
                    ? "bg-[var(--color-primary)]/15 text-[var(--color-primary)] border border-[var(--color-primary)]/30 shadow-[0_0_10px_rgba(37,99,235,0.1)]"
                    : "border border-transparent text-foreground-muted hover:text-foreground hover:bg-card-hover"
                )}
              >
                {t(`categories.${cat.translationKey}`)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
