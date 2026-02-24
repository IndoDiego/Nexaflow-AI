"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer } from "@/styles/animations";

const stats = [
  { key: "automations", value: "150+", prefix: ">" },
  { key: "hoursSaved", value: "10K+", prefix: "~" },
  { key: "clients", value: "40+", prefix: "#" },
  { key: "satisfaction", value: "98%", prefix: "=" },
] as const;

export function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
      {/* AI Grid Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[var(--color-primary)]/8 blur-[120px]" />
        <div className="absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full bg-[var(--color-accent)]/5 blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--background)_70%)]" />
      </div>

      <Container className="relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          {/* Terminal-style status tag */}
          <motion.div variants={fadeInUp} className="mb-8 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-4 py-1.5 font-mono text-xs text-foreground-muted backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
              <span className="text-[var(--color-accent)]">system</span>
              <span className="text-foreground-muted">::</span>
              <span>AI automation engine v2.0</span>
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            {t("headline")}{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-accent)] bg-clip-text text-transparent">
                {t("headlineHighlight")}
              </span>
              <span className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] opacity-60" />
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-6 max-w-2xl text-base text-foreground-secondary sm:text-lg"
          >
            {t("subheadline")}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link href="/auditoria-ia">
              <Button size="lg" variant="primary">
                {t("ctaPrimary")}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Button>
            </Link>
            <Link href="/servicios">
              <Button size="lg" variant="outline">
                {t("ctaSecondary")}
              </Button>
            </Link>
          </motion.div>

          {/* Terminal-style Stats */}
          <motion.div
            variants={fadeInUp}
            className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6"
          >
            {stats.map((stat) => (
              <div
                key={stat.key}
                className="group relative rounded-lg border border-border/40 bg-card/30 p-4 backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-primary)]/30 hover:shadow-[0_0_20px_rgba(37,99,235,0.08)]"
              >
                <div className="font-mono text-xs text-foreground-muted mb-1">
                  <span className="text-[var(--color-primary)]">{stat.prefix}</span> {t(`stats.${stat.key}`)}
                </div>
                <div className="font-mono text-2xl font-bold text-foreground stat-glow sm:text-3xl">
                  {stat.value}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
