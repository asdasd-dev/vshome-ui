import type { ReactNode } from "react";
export type SectionHeaderProps = {
    title: ReactNode;
    count?: number;
    aside?: ReactNode;
    as?: "h2" | "h3" | "h4";
    className?: string;
};
export declare function SectionHeader({ title, count, aside, as: Tag, className }: SectionHeaderProps): import("react").JSX.Element;
