import type { MouseEvent, ReactNode } from "react";
export type LinkProps = {
    children: ReactNode;
    href?: string;
    onClick?: (e: MouseEvent<HTMLElement>) => void;
    tone?: "accent" | "muted" | "danger";
    external?: boolean;
    underline?: "hover" | "always";
    disabled?: boolean;
    title?: string;
    className?: string;
};
export declare function Link({ children, href, onClick, tone, external, underline, disabled, title, className }: LinkProps): import("react").JSX.Element;
