import type { ICTIndicator, TradeSetup, MarketOverviewData } from "./types";

export const ICT_CONCEPT_INFO: Record<
  string,
  { name: string; description: string; icon: string }
> = {
  OB: {
    name: "Order Blocks",
    description: "Institutional entry zones where large orders were placed",
    icon: "Layers",
  },
  FVG: {
    name: "Fair Value Gaps",
    description: "Price imbalances that tend to get filled",
    icon: "GitCompare",
  },
  BOS: {
    name: "Break of Structure",
    description: "Confirmed shifts in market direction",
    icon: "TrendingUp",
  },
  MSS: {
    name: "Market Structure Shift",
    description: "Early signs of trend reversal",
    icon: "ArrowUpDown",
  },
};

export const MOCK_INDICATORS: ICTIndicator[] = [
  {
    type: "OB",
    label: "Order Blocks",
    description: "Institutional entry zones identified",
    count: 3,
    direction: "bullish",
    details: ["1.0832 - 1.0838 (Bullish)", "1.0855 - 1.0860 (Bearish)", "1.0810 - 1.0815 (Bullish)"],
  },
  {
    type: "FVG",
    label: "Fair Value Gaps",
    description: "Price imbalances detected",
    count: 5,
    direction: "bullish",
    details: [
      "1.0845 - 1.0852 (Unfilled)",
      "1.0820 - 1.0825 (Partially Filled)",
      "1.0870 - 1.0878 (Unfilled)",
      "1.0795 - 1.0800 (Filled)",
      "1.0862 - 1.0866 (Unfilled)",
    ],
  },
  {
    type: "BOS",
    label: "Break of Structure",
    description: "Confirmed structural breaks",
    count: 2,
    direction: "bullish",
    details: ["Bullish BOS @ 1.0850 (1H)", "Bearish BOS @ 1.0810 (4H)"],
  },
  {
    type: "MSS",
    label: "Market Structure Shift",
    description: "Potential trend reversal signals",
    count: 1,
    direction: "bearish",
    details: ["Bearish MSS @ 1.0875 (87% confidence)"],
  },
];

export const MOCK_TRADE_SETUPS: TradeSetup[] = [
  {
    id: "1",
    pair: "EUR/USD",
    direction: "long",
    grade: "A+",
    confidence: 94,
    scores: { ob: 95, fvg: 92, bos: 96, mss: 88 },
    timeframe: "1H",
  },
  {
    id: "2",
    pair: "GBP/USD",
    direction: "short",
    grade: "A",
    confidence: 87,
    scores: { ob: 88, fvg: 85, bos: 90, mss: 82 },
    timeframe: "4H",
  },
  {
    id: "3",
    pair: "USD/JPY",
    direction: "long",
    grade: "B+",
    confidence: 76,
    scores: { ob: 78, fvg: 72, bos: 80, mss: 70 },
    timeframe: "1H",
  },
  {
    id: "4",
    pair: "AUD/USD",
    direction: "short",
    grade: "B",
    confidence: 68,
    scores: { ob: 70, fvg: 65, bos: 72, mss: 60 },
    timeframe: "15M",
  },
  {
    id: "5",
    pair: "EUR/GBP",
    direction: "long",
    grade: "A",
    confidence: 85,
    scores: { ob: 86, fvg: 84, bos: 88, mss: 80 },
    timeframe: "4H",
  },
  {
    id: "6",
    pair: "NZD/USD",
    direction: "short",
    grade: "C",
    confidence: 52,
    scores: { ob: 55, fvg: 48, bos: 58, mss: 45 },
    timeframe: "1D",
  },
];

export const MOCK_MARKET_OVERVIEW: MarketOverviewData = {
  price: "1.0847",
  trend: "bullish",
  session: "London",
  volatility: "Medium",
};
