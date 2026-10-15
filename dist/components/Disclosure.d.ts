import type { ReactNode } from "react";
export type DisclosureProps = {
    summary: ReactNode;
    children: ReactNode;
    open?: boolean;
    onToggle?: (open: boolean) => void;
    tone?: "default" | "muted";
    className?: string;
};
export declare function Disclosure({ summary, children, open, onToggle, tone, className }: DisclosureProps): import("react").JSX.Element;
