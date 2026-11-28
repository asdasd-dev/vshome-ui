import { type ReactNode } from "react";
export type ExcerptProps = {
    children: string;
    title: ReactNode;
    className?: string;
};
export declare function Excerpt({ children, title, className }: ExcerptProps): import("react").JSX.Element;
