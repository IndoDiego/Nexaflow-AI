import { z } from "zod";

export const auditFormSchema = z.object({
  companyName: z.string().min(2).max(100),
  websiteUrl: z.string().url().or(z.literal("")).optional(),
  industry: z.string().min(1),
  companySize: z.string().min(1),
  currentTools: z.array(z.string()).optional(),
  biggestChallenge: z.string().max(500).optional(),
  repetitiveHoursPerWeek: z.number().min(0).max(100).default(10),
  interestedServices: z.array(z.string()).min(1),
  budgetRange: z.string().min(1),
  timeline: z.string().min(1),
  fullName: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  preferredLanguage: z.enum(["es", "en"]),
  referralSource: z.string().optional(),
});

export type AuditFormData = z.infer<typeof auditFormSchema>;

export const contactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10).max(2000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
