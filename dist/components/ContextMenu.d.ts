import { type ReactElement } from "react";
export type ContextMenuAction = {
    label: string;
    onSelect: () => void;
    disabled?: boolean;
};
export type ContextMenuCheckbox = {
    label: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    disabled?: boolean;
};
export type ContextMenuRadio<T extends string = string> = {
    label: string;
    value: T;
    options: {
        value: T;
        label: string;
        disabled?: boolean;
    }[];
    onValueChange: (value: T) => void;
};
export type ContextMenuEntry = ContextMenuAction | ContextMenuCheckbox | ContextMenuRadio | "separator";
export type ContextMenuProps = {
    items: ContextMenuEntry[];
    children: ReactElement;
    longPress?: boolean;
    disabled?: boolean;
    className?: string;
};
export declare function ContextMenu({ items, children, longPress, disabled, className }: ContextMenuProps): import("react").JSX.Element;
