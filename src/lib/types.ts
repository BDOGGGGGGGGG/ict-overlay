export type TrendDirection = "bullish" | "bearish" | "neutral";

export type ICTConceptType = "OB" | "FVG" | "BOS" | "MSS";

export interface ICTIndicator {
  type: ICTConceptType;
  label: string;
  description: string;
  count: number;
  direction: TrendDirection;
  details: string[];
}

export interface TradeSetup {
  id: string;
  pair: string;
  direction: "long" | "short";
  grade: "A+" | "A" | "B+" | "B" | "C";
  confidence: number;
  scores: {
    ob: number;
    fvg: number;
    bos: number;
    mss: number;
  };
  timeframe: string;
}

export interface OHLCData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface MarketOverviewData {
  price: string;
  trend: TrendDirection;
  session: "London" | "New York" | "Asian" | "Off-hours";
  volatility: "Low" | "Medium" | "High";
}
