import "./charts.css";

export { LineChart, type LineChartProps, type Series, type ChartMark } from "./LineChart";
export { StackedBars, type StackedBarsProps } from "./StackedBars";
export { TimeChart, type TimeChartProps, type TimeSeries, type RefLine } from "./TimeChart";
export { ChartCard, ChartLegend, type ChartCardProps, type ChartLegendProps, type LegendItem } from "./ChartCard";
export { niceMax, robustMax, dayTicks, timeTicks, outageBands, linePath, fmtStamp, type Tick } from "./scale";

export const chartPalette = ["#3987e5", "#d95926", "#199e70", "#c98500", "#d55181"] as const;
