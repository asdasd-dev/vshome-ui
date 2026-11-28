import { type ReactNode } from "react";
export declare const SHEET_MOBILE = "(max-width: 759px)";
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
    /** на телефоне — по высоте содержимого, а не во весь экран */
    fit?: boolean;
};
export declare function Sheet({ open, onRequestClose, head, actions, footer, children, scrollKey, className, fit }: SheetProps): import("react").JSX.Element;
