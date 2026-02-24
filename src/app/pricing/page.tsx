import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { PricingForm } from "@/components/landing/pricing-form";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <PricingForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}
