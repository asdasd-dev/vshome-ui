export type StackedBarsProps = {
    /** дни YYYY-MM-DD */
    labels: string[];
    series: {
        name: string;
        color: string;
        data: number[];
    }[];
    fmt: (v: number) => string;
};
export declare function StackedBars({ labels, series, fmt }: StackedBarsProps): import("react").JSX.Element;
