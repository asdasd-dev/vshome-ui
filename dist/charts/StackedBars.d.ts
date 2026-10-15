export type StackedBarsProps = {
    /** дни YYYY-MM-DD */
    labels: string[];
    series: {
        name: string;
        color: string;
        data: number[];
    }[];
    fmt: (v: number) => string;
    label?: string;
    className?: string;
};
export declare function StackedBars({ labels, series, fmt, label, className }: StackedBarsProps): import("react").JSX.Element;
