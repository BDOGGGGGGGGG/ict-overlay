import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY!);
}

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const code = generateCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Invalidate previous unused codes for this email
    await supabase
      .from("verification_codes")
      .update({ used: true })
      .eq("email", normalizedEmail)
      .eq("used", false);

    // Insert new code
    const { error } = await supabase.from("verification_codes").insert({
      email: normalizedEmail,
      code,
      expires_at: expiresAt.toISOString(),
      used: false,
    });

    if (error) {
      console.error("Failed to store verification code:", error);
      return NextResponse.json(
        { error: "Failed to send code" },
        { status: 500 }
      );
    }

    // Send verification email
    const resend = getResend();
    const { error: emailError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Trading Overlay <noreply@resend.dev>",
      to: normalizedEmail,
      subject: "Your verification code",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 400px; margin: 0 auto; padding: 40px 20px;">
          <h2 style="color: #fff; font-size: 20px; margin-bottom: 8px;">Trading Overlay</h2>
          <p style="color: #a1a1aa; font-size: 14px; margin-bottom: 24px;">Enter this code to sign in:</p>
          <div style="background: #2c2c2e; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
            <span style="font-family: monospace; font-size: 32px; font-weight: bold; color: #3dd68c; letter-spacing: 6px;">${code}</span>
          </div>
          <p style="color: #71717a; font-size: 12px;">This code expires in 10 minutes. If you didn't request this, ignore this email.</p>
        </div>
      `,
    });

    if (emailError) {
      console.error("Failed to send email:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("send-code error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
