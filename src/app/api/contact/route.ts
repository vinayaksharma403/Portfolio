import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Maximum length constraints
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

// Standard RFC 5322 compliant regex for basic email format validation
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Escapes special HTML characters to prevent HTML injection in HTML email templates
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload in request." },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Request body must be a valid JSON object." },
        { status: 400 }
      );
    }

    const payload = body as Record<string, unknown>;

    // Honeypot check: If the hidden honeypot field is populated, silently acknowledge without sending
    if (typeof payload.honeypot === "string" && payload.honeypot.trim().length > 0) {
      return NextResponse.json(
        { success: true, message: "Signal received." },
        { status: 200 }
      );
    }

    const rawName = payload.name;
    const rawEmail = payload.email;
    const rawMessage = payload.message;

    // Validate types
    if (
      typeof rawName !== "string" ||
      typeof rawEmail !== "string" ||
      typeof rawMessage !== "string"
    ) {
      return NextResponse.json(
        { error: "Name, email, and message are required and must be strings." },
        { status: 400 }
      );
    }

    const name = rawName.trim();
    const email = rawEmail.trim();
    const message = rawMessage.trim();

    // Validate non-empty fields
    if (!name) {
      return NextResponse.json(
        { error: "Name cannot be empty." },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: "Email cannot be empty." },
        { status: 400 }
      );
    }

    if (!message) {
      return NextResponse.json(
        { error: "Message cannot be empty." },
        { status: 400 }
      );
    }

    // Validate length constraints
    if (name.length > MAX_NAME_LENGTH) {
      return NextResponse.json(
        { error: `Name exceeds maximum limit of ${MAX_NAME_LENGTH} characters.` },
        { status: 400 }
      );
    }

    if (email.length > MAX_EMAIL_LENGTH) {
      return NextResponse.json(
        { error: `Email exceeds maximum limit of ${MAX_EMAIL_LENGTH} characters.` },
        { status: 400 }
      );
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Message exceeds maximum limit of ${MAX_MESSAGE_LENGTH} characters.` },
        { status: 400 }
      );
    }

    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Read environment variables
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const receiverEmail =
      process.env.CONTACT_RECEIVER_EMAIL || emailUser || "vinayaksharma4777@gmail.com";

    // Verify SMTP credentials presence
    if (!emailUser || !emailPass) {
      console.error(
        "Contact API Error: Missing EMAIL_USER or EMAIL_PASS environment variables."
      );
      return NextResponse.json(
        {
          error:
            "Email service is currently unconfigured on the server. Please contact directly via vinayaksharma4777@gmail.com.",
        },
        { status: 500 }
      );
    }

    // Initialize Nodemailer transporter with Gmail SMTP service
    // Google App Passwords often contain spaces (e.g. "xxxx xxxx xxxx xxxx")
    const cleanPass = emailPass.replace(/\s+/g, "");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: cleanPass,
      },
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    const mailOptions = {
      from: `"Vinayak Sharma Portfolio" <${emailUser}>`,
      to: receiverEmail,
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      text: `New message from Vinayak Sharma Portfolio\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent from the contact form at Vinayak Sharma's Developer Portfolio.`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 3px solid #222; border-radius: 14px; background-color: #fcfcfc; color: #111;">
          <div style="background-color: #efe9b5; padding: 14px 18px; border: 2px solid #222; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="margin: 0; font-size: 18px; font-weight: 900; color: #111; text-transform: uppercase; letter-spacing: 0.5px;">New Portfolio Transmission</h2>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #555; font-family: monospace;">// INCOMING_SIGNAL</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 10px 0; font-weight: 800; width: 90px; color: #555; font-size: 14px; text-transform: uppercase;">From:</td>
              <td style="padding: 10px 0; color: #111; font-size: 15px;"><strong>${safeName}</strong></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: 800; color: #555; font-size: 14px; text-transform: uppercase;">Email:</td>
              <td style="padding: 10px 0; font-size: 15px;"><a href="mailto:${safeEmail}" style="color: #ff8300; font-weight: 700; text-decoration: none;">${safeEmail}</a></td>
            </tr>
          </table>

          <div style="background-color: #ffffff; padding: 18px; border: 2px solid #222; border-radius: 10px; margin-bottom: 24px;">
            <div style="font-size: 12px; font-weight: 900; color: #777; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.5px;">Message Payload:</div>
            <div style="font-size: 15px; line-height: 1.6; color: #222; white-space: pre-wrap;">${safeMessage}</div>
          </div>

          <div style="font-size: 12px; color: #888; border-top: 1px solid #e0e0e0; padding-top: 14px; text-align: center;">
            Sent securely via the contact form on <strong>Vinayak Sharma</strong>'s Developer Portfolio.
            <br />
            <em>Clicking 'Reply' will directly address ${safeEmail}.</em>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        success: true,
        message: "Signal received! Transmission sent successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API Server Error:", error);
    return NextResponse.json(
      { error: "Transmission failed. An internal server error occurred while sending your message." },
      { status: 500 }
    );
  }
}