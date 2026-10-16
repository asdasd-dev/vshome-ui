import type { ReactNode } from "react";
export type CardProps = {
    children: ReactNode;
    as?: "div" | "section" | "article" | "li";
    tone?: "default" | "sunken" | "accent" | "ok" | "warn" | "danger" | "muted" | "violet" | "pink" | "gold";
    stripe?: string;
    padding?: "none" | "xs" | "sm" | "md" | "lg";
    elevated?: boolean;
    onClick?: () => void;
    href?: string;
    external?: boolean;
    expanded?: boolean;
    controls?: string;
    label?: string;
    title?: string;
    className?: string;
};
export declare function Card({ children, as: Tag, tone, stripe, padding, elevated, onClick, href, external, expanded, controls, label, title, className }: CardProps): import("react").JSX.Element;
