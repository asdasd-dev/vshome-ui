import type { ReactNode } from "react";
export type LegendItem = {
    name: string;
    color: string;
    extra?: string;
};
export declare function Legend({ items }: {
    items: LegendItem[];
}): import("react").JSX.Element;
export type ChartCardProps = {
    title: ReactNode;
    sub?: ReactNode;
    legend?: LegendItem[];
    /** между подзаголовком и легендой: таблица, переключатель периода */
    extra?: ReactNode;
    className?: string;
    children?: ReactNode;
};
export declare function ChartCard({ title, sub, legend, extra, className, children }: ChartCardProps): import("react").JSX.Element;
