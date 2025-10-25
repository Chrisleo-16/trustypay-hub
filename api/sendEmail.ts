import { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    // Send to Abiaxe support inbox
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
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
      from: "Acme <onboarding@resend.dev>",
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

    res.status(200).json({ success: true, message: "Emails sent successfully!" });
    console.log("Request body:", req.body);
    console.log("Using API key:", process.env.RESEND_API_KEY ? "✅ Loaded" : "❌ Missing");

  } catch (error: any) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}
