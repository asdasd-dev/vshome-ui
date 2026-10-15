import type { ReactNode } from "react";
export type SegmentProps<T extends string> = {
    options: {
        value: T;
        label: ReactNode;
    }[];
    value: T;
    onChange: (v: T) => void;
    ariaLabel: string;
};
export declare function Segment<T extends string>({ options, value, onChange, ariaLabel }: SegmentProps<T>): import("react").JSX.Element;
