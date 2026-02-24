import { NextResponse } from "next/server";
import { auditFormSchema } from "@/lib/validations";
import { getResend, EMAIL_FROM, ADMIN_EMAIL } from "@/lib/resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = auditFormSchema.parse(body);

    // Send notification email to admin (if Resend is configured)
    const resend = getResend();
    if (resend) {
      try {
        await resend.emails.send({
          from: EMAIL_FROM,
          to: ADMIN_EMAIL,
          subject: `Nueva Auditoria IA: ${data.companyName}`,
          html: `
            <h2>Nueva solicitud de Auditoria IA</h2>
            <table style="border-collapse: collapse; width: 100%;">
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Empresa</td><td style="padding: 8px; border: 1px solid #ddd;">${data.companyName}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Web</td><td style="padding: 8px; border: 1px solid #ddd;">${data.websiteUrl || "N/A"}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Industria</td><td style="padding: 8px; border: 1px solid #ddd;">${data.industry}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Tamano</td><td style="padding: 8px; border: 1px solid #ddd;">${data.companySize}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Desafio</td><td style="padding: 8px; border: 1px solid #ddd;">${data.biggestChallenge || "N/A"}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Horas repetitivas/sem</td><td style="padding: 8px; border: 1px solid #ddd;">${data.repetitiveHoursPerWeek}h</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Servicios interes</td><td style="padding: 8px; border: 1px solid #ddd;">${data.interestedServices.join(", ")}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Presupuesto</td><td style="padding: 8px; border: 1px solid #ddd;">${data.budgetRange}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Timeline</td><td style="padding: 8px; border: 1px solid #ddd;">${data.timeline}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Contacto</td><td style="padding: 8px; border: 1px solid #ddd;">${data.fullName} - ${data.email} ${data.phone ? `- ${data.phone}` : ""}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Idioma</td><td style="padding: 8px; border: 1px solid #ddd;">${data.preferredLanguage}</td></tr>
            </table>
          `,
        });

        // Send confirmation to user
        const isSpanish = data.preferredLanguage === "es";
        await resend.emails.send({
          from: EMAIL_FROM,
          to: data.email,
          subject: isSpanish
            ? "Tu Auditoria IA esta en camino - NexaFlow AI"
            : "Your AI Audit is on its way - NexaFlow AI",
          html: `
            <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #2563eb;">${isSpanish ? "Hola" : "Hi"} ${data.fullName}!</h1>
              <p>${isSpanish
                ? "Hemos recibido tu solicitud de auditoria IA para"
                : "We've received your AI audit request for"} <strong>${data.companyName}</strong>.</p>
              <p>${isSpanish
                ? "Nuestro equipo esta analizando tu negocio y te enviaremos un informe personalizado en menos de 48 horas."
                : "Our team is analyzing your business and will send you a personalized report within 48 hours."}</p>
              <p>${isSpanish ? "Mientras tanto, puedes:" : "In the meantime, you can:"}</p>
              <ul>
                <li>${isSpanish
                  ? "Explorar nuestros servicios en nexaflow.ai/servicios"
                  : "Explore our services at nexaflow.ai/en/services"}</li>
                <li>${isSpanish
                  ? "Leer nuestro blog con tips de IA para negocios"
                  : "Read our blog with AI tips for businesses"}</li>
              </ul>
              <p>${isSpanish ? "Gracias por confiar en NexaFlow AI!" : "Thanks for trusting NexaFlow AI!"}</p>
              <p style="color: #64748b; font-size: 14px;">— El equipo de NexaFlow AI</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // Don't fail the request if email fails
      }
    }

    console.log("Audit request received:", data);

    return NextResponse.json(
      { success: true, message: "Audit request received" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Audit form error:", error);
    return NextResponse.json(
      { success: false, message: "Invalid form data" },
      { status: 400 }
    );
  }
}
