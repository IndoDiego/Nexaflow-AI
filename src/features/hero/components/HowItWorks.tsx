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
    <Section className="bg-background-secondary">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-foreground-secondary">
            {t("subtitle")}
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.key}
              variants={fadeInUp}
              className="relative text-center"
            >
              {/* Connector line (not on last item) */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-gradient-to-r from-border to-transparent lg:block" />
              )}

              <div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl font-mono text-xl font-bold text-white"
                style={{ backgroundColor: step.color }}
              >
                {step.number}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {t(`steps.${step.key}.title`)}
              </h3>
              <p className="text-sm leading-relaxed text-foreground-secondary">
                {t(`steps.${step.key}.description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
