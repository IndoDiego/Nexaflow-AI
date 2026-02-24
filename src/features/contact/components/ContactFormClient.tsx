"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export function ContactFormClient() {
  const t = useTranslations("Contact");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });

  function update(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
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
      <div className="py-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        </div>
        <p className="text-lg font-medium text-foreground">{t("form.success")}</p>
      </div>
    );
  }

  const inputClasses = "w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.name")} *</label>
        <input type="text" required value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClasses} />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.email")} *</label>
        <input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClasses} />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.company")}</label>
        <input type="text" value={form.company} onChange={(e) => update("company", e.target.value)} className={inputClasses} />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.message")} *</label>
        <textarea required rows={4} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder={t("form.messagePlaceholder")} className={inputClasses} />
      </div>
      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
        {loading ? "..." : t("form.submit")}
      </Button>
    </form>
  );
}
