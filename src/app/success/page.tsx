import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { SuccessContent } from "@/components/landing/success-content";
import { Suspense } from "react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-6">
        <Suspense
          fallback={
            <div className="text-muted-foreground text-sm">Loading...</div>
          }
        >
          <SuccessContent />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
