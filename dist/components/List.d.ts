import { type ReactNode } from "react";
export type ListProps = {
    children: ReactNode;
    label?: ReactNode;
    max?: number;
    empty?: ReactNode;
    divided?: boolean;
    className?: string;
};
export declare function List({ children, label, max, empty, divided, className }: ListProps): import("react").JSX.Element | null;
export type ListRowProps = {
    title: ReactNode;
    titleLines?: 1 | 2;
    sub?: ReactNode;
    subTone?: "muted" | "warn";
    subLines?: 1 | 2 | 3;
    meta?: ReactNode;
    lead?: ReactNode;
    tone?: "default" | "warn" | "danger" | "muted";
    onClick?: () => void;
    href?: string;
    align?: "baseline" | "center";
    selected?: boolean;
    className?: string;
};
export declare function ListRow({ title, titleLines, sub, subTone, subLines, meta, lead, tone, onClick, href, align, selected, className }: ListRowProps): import("react").JSX.Element;
