import { type ReactNode } from "react";
export type TileProps = {
    label?: string;
    aside?: ReactNode;
    tone?: "default" | "warn" | "danger";
    children?: ReactNode;
    footer?: ReactNode;
    scroll?: boolean;
    dimmed?: boolean;
    className?: string;
    "data-tile"?: string;
};
export declare function Tile({ label, aside, tone, children, footer, scroll, dimmed, className, ...data }: TileProps): import("react").JSX.Element;
