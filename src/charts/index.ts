import "./charts.css";

export { LineChart, type LineChartProps, type Series, type ChartMark } from "./LineChart";
export { StackedBars, type StackedBarsProps } from "./StackedBars";
export { ChartCard, Legend, type ChartCardProps, type LegendItem } from "./ChartCard";
export { niceMax, dayTicks, outageBands, linePath, fmtStamp } from "./scale";

export const chartPalette = ["#3987e5", "#d95926", "#199e70", "#c98500", "#d55181"] as const;
