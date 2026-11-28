import type { ReactNode } from "react";
export type LegendItem = {
    name: string;
    color: string;
    extra?: string;
};
export type ChartLegendProps = {
    items: LegendItem[];
    hidden?: string[];
    onToggle?: (name: string) => void;
};
export declare function ChartLegend({ items, hidden, onToggle }: ChartLegendProps): import("react").JSX.Element;
export type ChartCardProps = {
    title: ReactNode;
    sub?: ReactNode;
    legend?: LegendItem[];
    /** между подзаголовком и легендой: таблица, переключатель периода */
    extra?: ReactNode;
    className?: string;
    children?: ReactNode;
    hidden?: string[];
    onToggle?: (name: string) => void;
};
export declare function ChartCard({ title, sub, legend, extra, className, children, hidden, onToggle }: ChartCardProps): import("react").JSX.Element;
