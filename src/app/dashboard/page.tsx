import { ChartArea } from "@/components/dashboard/chart-area";
import { ScoringPanel } from "@/components/dashboard/scoring-panel";
import { IndicatorPanel } from "@/components/dashboard/indicator-panel";

export default function DashboardPage() {
  return (
    <div className="flex h-full flex-col">
      {/* Main area: Chart + Scoring */}
      <div className="flex flex-1 min-h-0">
        <ChartArea />
        <div className="w-72 shrink-0">
          <ScoringPanel />
        </div>
      </div>

      {/* Bottom: ICT Indicators */}
      <div className="h-52 shrink-0">
        <IndicatorPanel />
      </div>
    </div>
  );
}
