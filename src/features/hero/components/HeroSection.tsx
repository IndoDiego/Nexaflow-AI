"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { TypingText } from "@/components/shared/TypingText";
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
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      {/* Glow orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-primary)]/10 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-[var(--color-accent)]/8 blur-[120px]" />
      </div>

      <Container className="relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-5xl"
        >
          {/* Terminal window at the top */}
          <motion.div variants={fadeInUp} className="mb-10">
            <div className="mx-auto max-w-2xl rounded-lg border border-border/50 bg-card/60 backdrop-blur-md overflow-hidden">
              {/* Terminal chrome */}
              <div className="flex items-center gap-2 border-b border-border/30 bg-background-tertiary/60 px-4 py-2">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="ml-3 font-mono text-[10px] text-foreground-muted">nexaflow@ai ~ %</span>
              </div>
              {/* Terminal content */}
              <div className="p-4 font-mono text-xs leading-6">
                <div className="text-foreground-muted">
                  <span className="text-[var(--color-accent)]">$</span> nexaflow <span className="text-[var(--color-primary)]">--init</span> <span className="text-foreground-muted">--mode=production</span>
                </div>
                <div className="text-foreground-muted mt-1">
                  <span className="text-[var(--color-accent)]">{`>`}</span> <span className="text-[var(--color-primary)]">Loading AI modules...</span> <span className="text-[var(--color-accent)]">done</span>
                </div>
                <div className="text-foreground-muted mt-1">
                  <span className="text-[var(--color-accent)]">{`>`}</span> <span className="text-[var(--color-primary)]">Scanning business processes...</span> <span className="text-[var(--color-accent)]">147 found</span>
                </div>
                <div className="text-foreground-muted mt-1">
                  <span className="text-[var(--color-accent)]">{`>`}</span>{" "}
                  <TypingText
                    text="Ready to 10x your operations."
                    speed={40}
                    delay={1200}
                    className="text-[var(--color-accent)]"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main heading */}
          <div className="text-center">
            <motion.div variants={fadeInUp} className="mb-4 flex items-center justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 px-4 py-1.5 font-mono text-xs">
                <span className="h-2 w-2 rounded-full bg-[var(--color-accent)] animate-pulse shadow-[0_0_8px_rgba(0,229,153,0.6)]" />
                <span className="text-[var(--color-accent)]">system</span>
                <span className="text-foreground-muted">::</span>
                <span className="text-foreground-secondary">AI automation engine v2.0</span>
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              {t("headline")}{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-accent)] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                  {t("headlineHighlight")}
                </span>
                <motion.span
                  className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                />
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
          </div>

          {/* Stats in terminal cards */}
          <motion.div
            variants={fadeInUp}
            className="mt-20 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.5 + i * 0.1 }}
                className="group relative rounded-lg border border-border/50 bg-card/40 p-4 backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-primary)]/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.12)]"
              >
                <div className="font-mono text-[10px] uppercase tracking-wider text-foreground-muted mb-2">
                  <span className="text-[var(--color-primary)]">{stat.prefix}</span> {t(`stats.${stat.key}`)}
                </div>
                <div className="font-mono text-2xl font-bold text-foreground sm:text-3xl">
                  <span className="bg-gradient-to-r from-foreground to-foreground-secondary bg-clip-text text-transparent stat-glow">
                    {stat.value}
                  </span>
                </div>
                {/* Subtle bottom border glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent transition-all duration-300 group-hover:w-full" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
