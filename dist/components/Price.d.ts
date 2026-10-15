export type PriceProps = {
    value: number;
    old?: number;
    unit?: string;
    note?: string;
    size?: "sm" | "md" | "lg";
    tone?: "default" | "deal" | "muted";
    gone?: boolean;
    currency?: string;
    className?: string;
};
export declare function Price({ value, old, unit, note, size, tone, gone, currency, className }: PriceProps): import("react").JSX.Element;
