import { type ReactNode } from "react";
export declare const SHEET_MOBILE = "(max-width: 760px)";
export declare function sheetOpenChange(onRequestClose: () => boolean | void): (next: boolean, details: {
    cancel: () => void;
    reason?: string;
}) => void;
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
