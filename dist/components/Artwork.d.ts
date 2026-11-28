import { type ReactNode } from "react";
import type { Tone } from "./tone";
export type ArtworkProps = {
    src?: string;
    alt?: string;
    fallback?: ReactNode;
    size?: "sm" | "md" | "lg" | "fill";
    fit?: "cover" | "contain";
    backdrop?: Tone;
    loading?: "lazy" | "eager";
    className?: string;
};
export declare function Artwork({ src, alt, fallback, size, fit, backdrop, loading, className }: ArtworkProps): import("react").JSX.Element;
