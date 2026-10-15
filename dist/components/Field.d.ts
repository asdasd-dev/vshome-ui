import { type ReactNode, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
export type FieldControlProps = {
    id: string;
    className: string;
    "aria-describedby"?: string;
    "aria-invalid"?: true;
};
export type FieldProps = {
    label: string;
    hint?: ReactNode;
    error?: ReactNode;
    hideLabel?: boolean;
    className?: string;
    children: (control: FieldControlProps) => ReactNode;
};
export declare function Field({ label, hint, error, hideLabel, className, children }: FieldProps): import("react").JSX.Element;
type Common = {
    label: string;
    hint?: ReactNode;
    error?: ReactNode;
    hideLabel?: boolean;
    value: string;
    onChange: (value: string) => void;
    size?: "sm" | "md";
    variant?: "default" | "dashed";
    className?: string;
};
export type TextFieldProps = Common & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "size" | "className">;
export declare function TextField({ label, hint, error, hideLabel, value, onChange, size, variant, className, type, ...rest }: TextFieldProps): import("react").JSX.Element;
export type TextAreaProps = Common & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "value" | "className">;
export declare function TextArea({ label, hint, error, hideLabel, value, onChange, size, variant, className, rows, ...rest }: TextAreaProps): import("react").JSX.Element;
export {};
