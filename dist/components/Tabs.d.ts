import type { ReactNode } from "react";
import type { IconName } from "./icons";
export type TabItem<T extends string> = {
    value: T;
    label: ReactNode;
    icon?: IconName;
    count?: number;
    href?: string;
};
export type TabsProps<T extends string> = {
    items: TabItem<T>[];
    value: T;
    onChange?: (v: T) => void;
    label: string;
    variant?: "underline" | "bottom";
    sticky?: boolean;
    className?: string;
};
export declare function Tabs<T extends string>({ items, value, onChange, label, variant, sticky, className }: TabsProps<T>): import("react").JSX.Element;
