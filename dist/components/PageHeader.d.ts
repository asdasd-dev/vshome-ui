import type { ReactNode } from "react";
export type PageHeaderProps = {
    title: ReactNode;
    sub?: ReactNode;
    lead?: ReactNode;
    actions?: ReactNode;
    children?: ReactNode;
    sticky?: boolean;
    tone?: "default" | "accent" | "plain";
    size?: "md" | "lg";
    actionsAlign?: "end" | "start";
    contained?: "sm" | "md" | "lg";
    className?: string;
};
export declare function PageHeader({ title, sub, lead, actions, children, sticky, tone, size, actionsAlign, contained, className }: PageHeaderProps): import("react").JSX.Element;
