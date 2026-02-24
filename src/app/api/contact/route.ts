import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { getResend, EMAIL_FROM, ADMIN_EMAIL } from "@/lib/resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactFormSchema.parse(body);

    const resend = getResend();
    if (resend) {
      try {
        await resend.emails.send({
          from: EMAIL_FROM,
          to: ADMIN_EMAIL,
          subject: `Nuevo contacto: ${data.name} - ${data.company || "Sin empresa"}`,
          html: `
            <h2>Nuevo mensaje de contacto</h2>
            <table style="border-collapse: collapse; width: 100%;">
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Nombre</td><td style="padding: 8px; border: 1px solid #ddd;">${data.name}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td><td style="padding: 8px; border: 1px solid #ddd;">${data.email}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Empresa</td><td style="padding: 8px; border: 1px solid #ddd;">${data.company || "N/A"}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Servicio</td><td style="padding: 8px; border: 1px solid #ddd;">${data.service || "N/A"}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Mensaje</td><td style="padding: 8px; border: 1px solid #ddd;">${data.message}</td></tr>
            </table>
          `,
        });
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }
    }

    console.log("Contact form received:", data);

    return NextResponse.json(
      { success: true, message: "Message received" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, message: "Invalid form data" },
      { status: 400 }
    );
  }
}
