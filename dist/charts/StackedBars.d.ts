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
    xFormat?: (label: string) => string;
};
export declare function StackedBars({ labels, series, fmt, label, className, xFormat }: StackedBarsProps): import("react").JSX.Element;
