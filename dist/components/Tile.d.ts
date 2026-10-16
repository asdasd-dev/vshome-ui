import { type ReactNode } from "react";
export type TileProps = {
    label?: string;
    aside?: ReactNode;
    tone?: "default" | "warn" | "danger";
    children?: ReactNode;
    footer?: ReactNode;
    scroll?: boolean;
    dimmed?: boolean;
    backdrop?: string;
    backdropVideo?: string;
    className?: string;
    "data-tile"?: string;
    switcher?: {
        label: string;
        value: string;
        options: {
            value: string;
            label: ReactNode;
        }[];
        onChange: (v: string) => void;
    };
};
export declare function Tile({ label, aside, tone, children, footer, scroll, dimmed, backdrop, backdropVideo, className, switcher, ...data }: TileProps): import("react").JSX.Element;
