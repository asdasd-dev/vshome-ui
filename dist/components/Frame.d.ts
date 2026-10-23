export type FrameProps = {
    src: string;
    title: string;
    loading?: "lazy" | "eager";
    className?: string;
};
export declare function Frame({ src, title, loading, className }: FrameProps): import("react").JSX.Element;
