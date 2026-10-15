import type { ReactNode } from "react";
export type CardProps = {
    children: ReactNode;
    as?: "div" | "section" | "article" | "li";
    tone?: "default" | "accent" | "ok" | "warn" | "danger" | "muted" | "violet" | "pink" | "gold";
    stripe?: string;
    padding?: "none" | "sm" | "md" | "lg";
    elevated?: boolean;
    onClick?: () => void;
    href?: string;
    title?: string;
    className?: string;
};
export declare function Card({ children, as: Tag, tone, stripe, padding, elevated, onClick, href, title, className }: CardProps): import("react").JSX.Element;
