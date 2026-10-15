import { type ReactNode } from "react";
import type { IconName } from "./icons";
export type SplitButtonProps = {
    children: ReactNode;
    onClick: () => void;
    onHold?: () => void;
    holdMs?: number;
    pressed?: boolean;
    more: {
        label: string;
        onClick: () => void;
        icon?: IconName;
    };
    className?: string;
};
export declare function SplitButton({ children, onClick, onHold, holdMs, pressed, more, className }: SplitButtonProps): import("react").JSX.Element;
