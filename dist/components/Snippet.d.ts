import type { ReactNode } from "react";
export type SnippetProps = {
    title: ReactNode;
    href?: string;
    external?: boolean;
    titleLines?: 1 | 2 | 3;
    media?: ReactNode;
    meta?: ReactNode;
    price?: ReactNode;
    tags?: ReactNode;
    corner?: ReactNode;
    actions?: ReactNode;
    tone?: "default" | "muted";
    elevated?: boolean;
    as?: "div" | "article" | "li";
    className?: string;
};
export declare function Snippet({ title, href, external, titleLines, media, meta, price, tags, corner, actions, tone, elevated, as: Tag, className }: SnippetProps): import("react").JSX.Element;
