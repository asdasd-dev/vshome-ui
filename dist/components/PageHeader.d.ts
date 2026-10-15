import type { ReactNode } from "react";
export type PageHeaderProps = {
    title: ReactNode;
    sub?: ReactNode;
    lead?: ReactNode;
    actions?: ReactNode;
    children?: ReactNode;
    sticky?: boolean;
    tone?: "plain" | "accent";
    className?: string;
};
export declare function PageHeader({ title, sub, lead, actions, children, sticky, tone, className }: PageHeaderProps): import("react").JSX.Element;
