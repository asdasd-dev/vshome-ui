import { type ReactNode } from "react";
export type ArtworkProps = {
    src?: string;
    alt?: string;
    fallback?: ReactNode;
    size?: "sm" | "md" | "lg";
    className?: string;
};
export declare function Artwork({ src, alt, fallback, size, className }: ArtworkProps): import("react").JSX.Element;
