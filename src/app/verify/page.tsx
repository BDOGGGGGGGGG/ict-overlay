import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { Suspense } from "react";
import { VerifyForm } from "@/components/auth/verify-form";

export default async function VerifyPage() {
  const session = await getSession();
  if (session) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Check your email
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            We sent a 6-digit code to your email
          </p>
        </div>
        <Suspense
          fallback={
            <div className="text-center text-muted-foreground text-sm">
              Loading...
            </div>
          }
        >
          <VerifyForm />
        </Suspense>
      </div>
    </div>
  );
}
