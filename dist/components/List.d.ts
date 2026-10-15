import { type ReactNode } from "react";
export type ListProps = {
    children: ReactNode;
    max?: number;
    empty?: ReactNode;
    className?: string;
};
export declare function List({ children, max, empty, className }: ListProps): import("react").JSX.Element | null;
export type ListRowProps = {
    title: ReactNode;
    meta?: ReactNode;
    lead?: ReactNode;
    tone?: "default" | "warn" | "danger" | "muted";
    onClick?: () => void;
};
export declare function ListRow({ title, meta, lead, tone, onClick }: ListRowProps): import("react").JSX.Element;
