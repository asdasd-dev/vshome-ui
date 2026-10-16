import type { ReactNode } from "react";
export type SectionHeaderProps = {
    title: ReactNode;
    count?: number | string;
    countTone?: "muted" | "accent" | "warn" | "danger";
    countLabel?: string;
    aside?: ReactNode;
    as?: "h2" | "h3" | "h4";
    className?: string;
};
export declare function SectionHeader({ title, count, countTone, countLabel, aside, as: Tag, className }: SectionHeaderProps): import("react").JSX.Element;
