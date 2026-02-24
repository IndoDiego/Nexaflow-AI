import { Resend } from "resend";

// Lazy-initialized Resend client to avoid build errors when API key is missing
let _resend: Resend | null = null;

export function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

// Email sender configuration
export const EMAIL_FROM = "NexaFlow AI <hello@nexaflow.ai>";
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "hello@nexaflow.ai";
