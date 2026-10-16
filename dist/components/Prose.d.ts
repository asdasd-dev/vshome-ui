import type { ReactNode } from "react";
export type ProseProps = {
    html?: string;
    children?: ReactNode;
    className?: string;
};
export declare function Prose({ html, children, className }: ProseProps): import("react").JSX.Element;
