import { type ReactNode } from "react";
export type ToastProviderProps = {
    children: ReactNode;
    duration?: number;
    className?: string;
};
export declare function ToastProvider({ children, duration, className }: ToastProviderProps): import("react").JSX.Element;
export declare function useToast(): (text: string) => void;
