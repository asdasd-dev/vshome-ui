export type ArtworkProps = {
    src: string;
    alt?: string;
    size?: "md" | "lg";
    className?: string;
};
export declare function Artwork({ src, alt, size, className }: ArtworkProps): import("react").JSX.Element;
