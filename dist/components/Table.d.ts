import type { ReactNode } from "react";
export type TableColumn<R> = {
    key: string;
    label: ReactNode;
    numeric?: boolean;
    nowrap?: boolean;
    muted?: boolean;
    width?: string;
    render?: (row: R) => ReactNode;
};
export type TableProps<R> = {
    columns: TableColumn<R>[];
    rows: R[];
    rowKey: (row: R, index: number) => string | number;
    caption?: string;
    dense?: boolean;
    onRowClick?: (row: R) => void;
    empty?: ReactNode;
    className?: string;
};
export declare function Table<R>({ columns, rows, rowKey, caption, dense, onRowClick, empty, className }: TableProps<R>): import("react").JSX.Element;
