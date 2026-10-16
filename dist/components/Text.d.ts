import type { ReactNode } from "react";
import type { Tone } from "./tone";
export type TextProps = {
    variant?: "display" | "headline" | "title" | "lead" | "body" | "caption" | "footnote" | "label";
    tone?: "default" | Tone;
    weight?: "medium" | "semibold";
    as?: "span" | "p" | "div" | "h1" | "h2" | "h3" | "h4";
    lines?: 1 | 2 | 3;
    align?: "start" | "center" | "end";
    className?: string;
    id?: string;
    title?: string;
    children: ReactNode;
};
export declare function Text({ variant, tone, weight, as: Tag, lines, align, className, id, title, children }: TextProps): import("react").JSX.Element;
