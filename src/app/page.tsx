import { Navbar } from "@/components/landing/navbar";
import { HeroChart } from "@/components/landing/hero-chart";
import { GradingScale } from "@/components/landing/grading-scale";
import { Comparison } from "@/components/landing/comparison";
import { FAQ } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroChart />
      <GradingScale />
      <div id="compare">
        <Comparison />
      </div>
      <FAQ />
      <Footer />
    </div>
  );
}
