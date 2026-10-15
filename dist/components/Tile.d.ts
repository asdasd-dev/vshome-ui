import { type ReactNode } from "react";
export type TileProps = {
    label?: string;
    tone?: "default" | "warn" | "danger";
    children?: ReactNode;
    footer?: ReactNode;
    className?: string;
    "data-tile"?: string;
};
export declare function Tile({ label, tone, children, footer, className, ...data }: TileProps): import("react").JSX.Element;
