import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { Logo } from "@/components/ui/logo";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Logo className="h-8 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Sign in
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your email &mdash; we&apos;ll send you a code
          </p>
        </div>
        <Suspense
          fallback={
            <div className="text-center text-muted-foreground text-sm">
              Loading...
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
