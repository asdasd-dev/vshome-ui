export type SelectOption<T extends string> = {
    value: T;
    label: string;
};
export type SelectProps<T extends string> = {
    value: T;
    onChange: (value: T) => void;
    options: SelectOption<T>[];
    label: string;
    className?: string;
    disabled?: boolean;
};
export declare function Select<T extends string>({ value, onChange, options, label, className, disabled }: SelectProps<T>): import("react").JSX.Element;
