import { Navbar } from "@/components/landing/navbar";
import { HeroChart } from "@/components/landing/hero-chart";
import { PainPoints } from "@/components/landing/pain-points";
import { GradingScale } from "@/components/landing/grading-scale";
import { Backtest } from "@/components/landing/backtest";
import { Comparison } from "@/components/landing/comparison";
import { FAQ } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroChart />
      <PainPoints />
      <GradingScale />
      <Backtest />
      <div id="compare">
        <Comparison />
      </div>
      <FAQ />
      <Footer />
    </div>
  );
}
