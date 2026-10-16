export type TimeSeries = {
    name: string;
    color: string;
    points: [number, number][];
    dots?: boolean;
    line?: boolean;
    area?: boolean;
    fmt?: (v: number) => string;
};
export type RefLine = {
    y: number;
    label: string;
    color?: string;
    dashed?: boolean;
};
export type TimeChartProps = {
    series: TimeSeries[];
    refLines?: RefLine[];
    yFrom?: "zero" | "data";
    now?: number;
    unit?: string;
    xFormat?: (t: number) => string;
    tipFormat?: (t: number) => string;
    yFormat?: (v: number) => string;
    label?: string;
    className?: string;
};
export declare function TimeChart({ series, refLines, yFrom, now, unit, xFormat, tipFormat, yFormat, label, className }: TimeChartProps): import("react").JSX.Element;
