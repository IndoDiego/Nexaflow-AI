"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer } from "@/styles/animations";

const stats = [
  { key: "automations", value: "150+" },
  { key: "hoursSaved", value: "10K+" },
  { key: "clients", value: "40+" },
  { key: "satisfaction", value: "98%" },
] as const;

export function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-32 lg:pt-28 lg:pb-40">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[var(--color-primary)]/8 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/4 rounded-full bg-[var(--color-accent)]/6 blur-[100px]" />
      </div>

      <Container className="relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          {/* Status badge */}
          <motion.div variants={fadeInUp} className="mb-6 flex items-center justify-center">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 px-4 py-1.5 text-sm">
              <span className="h-2 w-2 rounded-full bg-[var(--color-accent)] status-pulse" />
              <span className="font-medium text-foreground-secondary">{t("badge") || "AI Automation Studio"}</span>
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            {t("headline")}{" "}
            <span className="gradient-text">
              {t("headlineHighlight")}
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-6 max-w-2xl text-lg text-foreground-secondary sm:text-xl leading-relaxed"
          >
            {t("subheadline")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/auditoria-ia">
              <Button size="lg" variant="primary">
                {t("ctaPrimary")}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </Button>
            </Link>
            <Link href="/servicios">
              <Button size="lg" variant="outline">
                {t("ctaSecondary")}
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mx-auto mt-20 max-w-3xl"
        >
          <div className="flex items-center justify-center gap-8 sm:gap-12 lg:gap-16">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.08 }}
                className="flex flex-col items-center"
              >
                <span className="text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-1 text-[11px] font-medium uppercase tracking-widest text-foreground-muted sm:text-xs">
                  {t(`stats.${stat.key}`)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
