"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { fadeInUp, staggerContainer } from "@/styles/animations";

const steps = [
  { key: "discovery", number: "01", color: "var(--color-primary)" },
  { key: "audit", number: "02", color: "var(--color-accent)" },
  { key: "implementation", number: "03", color: "var(--color-primary-light)" },
  { key: "scale", number: "04", color: "var(--color-accent-dark)" },
] as const;

export function HowItWorks() {
  const t = useTranslations("HowItWorks");

  return (
    <Section className="relative bg-background-secondary">
      {/* Subtle grid bg */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-20" />

      <Container className="relative">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block font-mono text-xs uppercase tracking-widest text-[var(--color-primary)]">
            // {t("title")}
          </span>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base text-foreground-secondary">
            {t("subtitle")}
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.key}
              variants={fadeInUp}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute left-full top-6 hidden h-px w-6 bg-gradient-to-r from-[var(--color-primary)]/30 to-transparent lg:block" />
              )}

              <div className="rounded-lg border border-border/40 bg-card/50 p-5 backdrop-blur-sm">
                {/* Step number */}
                <div className="mb-3 flex items-center gap-3">
                  <span
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md font-mono text-xs font-bold text-white"
                    style={{ backgroundColor: step.color, boxShadow: `0 0 15px ${step.color}33` }}
                  >
                    {step.number}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                </div>

                <h3 className="mb-1.5 font-mono text-sm font-semibold text-foreground">
                  {t(`steps.${step.key}.title`)}
                </h3>
                <p className="text-xs leading-relaxed text-foreground-secondary">
                  {t(`steps.${step.key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
