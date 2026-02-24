"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { services } from "@/features/services/data/services";

const TOTAL_STEPS = 4;

export function AuditForm() {
  const t = useTranslations("Audit");
  const tServices = useTranslations("Services");
  const locale = useLocale();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    companyName: "",
    websiteUrl: "",
    industry: "",
    companySize: "",
    currentTools: [] as string[],
    biggestChallenge: "",
    repetitiveHoursPerWeek: 10,
    interestedServices: [] as string[],
    budgetRange: "",
    timeline: "",
    fullName: "",
    email: "",
    phone: "",
    preferredLanguage: locale as "es" | "en",
    referralSource: "",
  });

  function updateField(key: string, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleArrayField(key: "currentTools" | "interestedServices", value: string) {
    setForm((prev) => {
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        </div>
        <p className="text-lg font-medium text-foreground">{t("form.success")}</p>
      </div>
    );
  }

  const stepLabels = [t("steps.step1"), t("steps.step2"), t("steps.step3"), t("steps.step4")];

  const industries = ["ecommerce", "tourism", "finance", "healthcare", "education", "saas", "retail", "realestate", "other"];
  const companySizes = ["micro", "small", "medium", "large"];
  const tools = ["CRM", "Email Marketing", "Analytics", "Customer Support", "Chatbot", "Automation", "None"];
  const budgets = ["low", "mid", "high", "enterprise", "unsure"];
  const timelines = ["asap", "short", "medium", "exploring"];

  return (
    <div className="space-y-8">
      {/* Step indicator */}
      <div className="flex items-center justify-between">
        {stepLabels.map((label, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
                step > i + 1
                  ? "bg-[var(--color-accent)] text-white"
                  : step === i + 1
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-background-tertiary text-foreground-muted"
              )}
            >
              {step > i + 1 ? "✓" : i + 1}
            </div>
            <span className="hidden text-sm text-foreground-secondary sm:inline">{label}</span>
            {i < stepLabels.length - 1 && (
              <div className="mx-2 hidden h-0.5 w-8 bg-border sm:block lg:w-16" />
            )}
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.companyName")} *</label>
            <input type="text" value={form.companyName} onChange={(e) => updateField("companyName", e.target.value)} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.website")}</label>
            <input type="url" value={form.websiteUrl} onChange={(e) => updateField("websiteUrl", e.target.value)} placeholder="https://" className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.industry")} *</label>
            <select value={form.industry} onChange={(e) => updateField("industry", e.target.value)} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]">
              <option value="">--</option>
              {industries.map((ind) => (<option key={ind} value={ind}>{t(`industries.${ind}`)}</option>))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.companySize")} *</label>
            <select value={form.companySize} onChange={(e) => updateField("companySize", e.target.value)} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]">
              <option value="">--</option>
              {companySizes.map((sz) => (<option key={sz} value={sz}>{t(`companySizes.${sz}`)}</option>))}
            </select>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">{t("form.currentTools")}</label>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <button key={tool} type="button" onClick={() => toggleArrayField("currentTools", tool)} className={cn("rounded-lg border px-3 py-1.5 text-sm transition-colors", form.currentTools.includes(tool) ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "border-border text-foreground-secondary hover:border-foreground-muted")}>
                  {tool}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.challenge")}</label>
            <textarea value={form.biggestChallenge} onChange={(e) => updateField("biggestChallenge", e.target.value)} placeholder={t("form.challengePlaceholder")} rows={3} maxLength={500} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.repetitiveHours")}: {form.repetitiveHoursPerWeek}h</label>
            <input type="range" min={0} max={40} value={form.repetitiveHoursPerWeek} onChange={(e) => updateField("repetitiveHoursPerWeek", Number(e.target.value))} className="w-full accent-[var(--color-primary)]" />
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">{t("form.interestedServices")} *</label>
            <div className="grid gap-2 sm:grid-cols-2">
              {services.map((s) => (
                <button key={s.id} type="button" onClick={() => toggleArrayField("interestedServices", s.id)} className={cn("rounded-lg border px-3 py-2 text-left text-sm transition-colors", form.interestedServices.includes(s.id) ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "border-border text-foreground-secondary hover:border-foreground-muted")}>
                  {tServices(`items.${s.id}.title`)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.budget")} *</label>
            <select value={form.budgetRange} onChange={(e) => updateField("budgetRange", e.target.value)} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]">
              <option value="">--</option>
              {budgets.map((b) => (<option key={b} value={b}>{t(`budgets.${b}`)}</option>))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.timeline")} *</label>
            <select value={form.timeline} onChange={(e) => updateField("timeline", e.target.value)} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]">
              <option value="">--</option>
              {timelines.map((tl) => (<option key={tl} value={tl}>{t(`timelines.${tl}`)}</option>))}
            </select>
          </div>
        </div>
      )}

      {/* Step 4 */}
      {step === 4 && (
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.fullName")} *</label>
            <input type="text" value={form.fullName} onChange={(e) => updateField("fullName", e.target.value)} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.email")} *</label>
            <input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.phone")}</label>
            <input type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]" />
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        {step > 1 ? (
          <Button variant="outline" onClick={() => setStep((s) => s - 1)}>
            {t("form.previous")}
          </Button>
        ) : (
          <div />
        )}
        {step < TOTAL_STEPS ? (
          <Button variant="primary" onClick={() => setStep((s) => s + 1)}>
            {t("form.next")}
          </Button>
        ) : (
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "..." : t("form.submit")}
          </Button>
        )}
      </div>
    </div>
  );
}
