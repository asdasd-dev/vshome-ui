import { type ReactNode } from "react";
export type SheetProps = {
    open: boolean;
    onRequestClose: () => boolean | void;
    head: ReactNode;
    actions?: ReactNode;
    footer?: ReactNode;
    children: ReactNode;
    scrollKey?: unknown;
    className?: string;
};
export declare function Sheet({ open, onRequestClose, head, actions, footer, children, scrollKey, className }: SheetProps): import("react").JSX.Element;
