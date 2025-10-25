// src/utils/sendEmail.ts
import { Resend } from "resend";

export interface EmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendEmail(payload: EmailPayload): Promise<{ success: boolean; message: string }> {
  const { name, email, subject, message } = payload;

  try {
    const resend = new Resend(import.meta.env.RESEND_API_KEY);

    // Send to Abiaxe support inbox
    await resend.emails.send({
      from: "Abiaxe Contact <support@abiaxe.com>",
      to: "support@abiaxe.com",
      subject: `📩 New Contact Message: ${subject}`,
      html: `
        <h2>New message from Abiaxe contact form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    // Send confirmation email to the user
    await resend.emails.send({
      from: "Abiaxe Support <support@abiaxe.com>",
      to: email,
      subject: "✅ We’ve received your message",
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for contacting <strong>Abiaxe Support</strong>.</p>
        <p>We’ve received your message about <em>${subject}</em> and will get back to you within 24 hours.</p>
        <br/>
        <p>– The Abiaxe Team</p>
      `,
    });

    return { success: true, message: "Emails sent successfully!" };
  } catch (error: any) {
    console.error("Error sending email:", error);
    return { success: false, message: error.message || "Failed to send email" };
  }
}
