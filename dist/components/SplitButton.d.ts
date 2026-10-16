import { type ReactNode } from "react";
import type { IconName } from "./icons";
export type SplitButtonProps = {
    children: ReactNode;
    onClick: () => void;
    onHold?: () => void;
    holdMs?: number;
    pressed?: boolean;
    icon?: IconName;
    indicator?: "lamp";
    disabled?: boolean;
    more: {
        label: string;
        onClick: () => void;
        icon?: IconName;
    };
    className?: string;
};
export declare function SplitButton({ children, onClick, onHold, holdMs, pressed, icon, indicator, disabled, more, className }: SplitButtonProps): import("react").JSX.Element;
