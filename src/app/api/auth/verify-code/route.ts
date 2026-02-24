import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { signSession, getSessionCookieOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: "Email and code are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Find a valid, unused, unexpired code
    const { data: codeRecord, error: fetchError } = await supabase
      .from("verification_codes")
      .select("*")
      .eq("email", normalizedEmail)
      .eq("code", code)
      .eq("used", false)
      .gte("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (fetchError || !codeRecord) {
      return NextResponse.json(
        { error: "Invalid or expired code" },
        { status: 400 }
      );
    }

    // Mark code as used
    await supabase
      .from("verification_codes")
      .update({ used: true })
      .eq("id", codeRecord.id);

    // Upsert user
    const { data: user, error: userError } = await supabase
      .from("users")
      .upsert({ email: normalizedEmail }, { onConflict: "email" })
      .select()
      .single();

    if (userError || !user) {
      console.error("Failed to upsert user:", userError);
      return NextResponse.json(
        { error: "Failed to create session" },
        { status: 500 }
      );
    }

    // Sign JWT and set cookie
    const token = await signSession({ sub: user.id, email: user.email });
    const cookieOptions = getSessionCookieOptions(token);

    const response = NextResponse.json({ success: true });
    response.cookies.set(cookieOptions);
    return response;
  } catch (err) {
    console.error("verify-code error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
