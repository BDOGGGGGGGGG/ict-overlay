import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

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

    // TODO: Send actual email via Resend/SendGrid — for now, log to console
    console.log(`[AUTH] Verification code for ${normalizedEmail}: ${code}`);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("send-code error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
