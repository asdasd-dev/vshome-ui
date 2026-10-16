export type SeekProps = {
    value: number;
    max: number;
    label: string;
    onCommit: (seconds: number) => void;
    disabled?: boolean;
    className?: string;
};
export declare function formatDuration(seconds: number): string;
export declare function Seek({ value, max, label, onCommit, disabled, className }: SeekProps): import("react").JSX.Element;
