import { type ReactNode } from "react";
export declare function ToastProvider({ children, duration }: {
    children: ReactNode;
    duration?: number;
}): import("react").JSX.Element;
export declare function useToast(): (text: string) => void;
