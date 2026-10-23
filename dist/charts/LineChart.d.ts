export type Series = {
    name: string;
    color: string;
    data: (number | null)[];
    fmt?: (v: number) => string;
};
export type ChartMark = {
    i: number;
    dashed?: boolean;
    label: string;
};
export type LineChartProps = {
    /** начало ряда и шаг точки, секунды */
    t0: number;
    step: number;
    series: Series[];
    label?: string;
    className?: string;
    unit?: string;
    yMax?: number;
    bands?: [number, number][];
    bandLabel?: string;
    marks?: ChartMark[];
    connect?: boolean;
    xEvery?: number;
    note?: (i: number) => string;
    hidden?: string[];
    robust?: boolean;
};
export declare function LineChart(p: LineChartProps): import("react").JSX.Element;
