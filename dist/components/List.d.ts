import { type ReactNode } from "react";
export type ListProps = {
    children: ReactNode;
    label?: ReactNode;
    max?: number;
    empty?: ReactNode;
    className?: string;
};
export declare function List({ children, label, max, empty, className }: ListProps): import("react").JSX.Element | null;
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
};
export declare function ListRow({ title, titleLines, sub, subTone, subLines, meta, lead, tone, onClick }: ListRowProps): import("react").JSX.Element;
