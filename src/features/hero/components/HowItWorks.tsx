"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { fadeInUp, staggerContainer } from "@/styles/animations";

const steps = [
  { key: "discovery", number: "01" },
  { key: "audit", number: "02" },
  { key: "implementation", number: "03" },
  { key: "scale", number: "04" },
] as const;

export function HowItWorks() {
  const t = useTranslations("HowItWorks");

  return (
    <Section className="relative bg-background-secondary">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-30" />

      <Container className="relative">
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full bg-[var(--color-primary)]/10 px-4 py-1 text-sm font-semibold text-[var(--color-primary)]">
            {t("badge") || "Our Process"}
          </span>
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-secondary">
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
                <div className="absolute left-full top-10 hidden h-px w-6 bg-gradient-to-r from-border to-transparent lg:block" />
              )}

              <div className="rounded-xl border border-border bg-card p-6 card-lift hover:border-[var(--color-primary)]/30 hover:shadow-lg hover:shadow-[var(--color-primary)]/5">
                {/* Step number */}
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-sm font-bold text-white shadow-lg shadow-[var(--color-primary)]/20">
                  {step.number}
                </div>

                <h3 className="mb-2 text-base font-bold text-foreground">
                  {t(`steps.${step.key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-foreground-secondary">
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
