export type FrameProps = {
    src: string;
    title: string;
    loading?: "lazy" | "eager";
    allow?: string;
    className?: string;
};
export declare function Frame({ src, title, loading, allow, className }: FrameProps): import("react").JSX.Element;
