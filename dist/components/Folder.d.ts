import { type ReactNode } from "react";
export type FolderProps = {
    title: string;
    trigger: ReactNode;
    children: ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    label?: string;
    tooltip?: string;
    className?: string;
    panelClassName?: string;
};
export declare function Folder({ title, trigger, children, open, onOpenChange, label, tooltip, className, panelClassName }: FolderProps): import("react").JSX.Element;
