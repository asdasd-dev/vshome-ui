import { useId, type ReactNode, type InputHTMLAttributes, type Ref, type TextareaHTMLAttributes } from "react";
import { cx } from "../utils/cx";
import { Icon } from "./Icon";

export type FieldControlProps = { id: string; className: string; "aria-describedby"?: string; "aria-invalid"?: true };

export type FieldProps = { label: string; hint?: ReactNode; error?: ReactNode; hideLabel?: boolean; className?: string; children: (control: FieldControlProps) => ReactNode };

export function Field({ label, hint, error, hideLabel, className, children }: FieldProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const described = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div className={cx("vs-field", className)}>
      <label htmlFor={id} className={cx("vs-field__label", hideLabel && "vs-visually-hidden")}>{label}</label>
      <div className="vs-field__control">{children({ id, className: "vs-text-field", "aria-describedby": described, ...(error ? { "aria-invalid": true as const } : {}) })}</div>
      {hint && <p id={hintId} className="vs-field__hint">{hint}</p>}
      {error && <p id={errorId} className="vs-field__error">{error}</p>}
    </div>
  );
}

type Common = { label: string; hint?: ReactNode; error?: ReactNode; hideLabel?: boolean; value: string; onChange: (value: string) => void; size?: "sm" | "md"; variant?: "default" | "dashed"; className?: string };

export type TextFieldProps = Common & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "size" | "className"> & { ref?: Ref<HTMLInputElement> };

export function TextField({ label, hint, error, hideLabel, value, onChange, size = "md", variant = "default", className, type = "text", ...rest }: TextFieldProps) {
  const search = type === "search";
  return (
    <Field label={label} hint={hint} error={error} hideLabel={hideLabel} className={className}>
      {(p) => <>
        {search && <Icon name="search" size="sm" className={cx("vs-text-field__icon", size === "sm" && "vs-text-field__icon--sm")} />}
        <input {...rest} {...p} type={type} value={value} onChange={(e) => onChange(e.target.value)}
               className={cx(p.className, `vs-text-field--${variant}`, size === "sm" && "vs-text-field--sm", search && "vs-text-field--with-icon")} />
      </>}
    </Field>
  );
}

export type TextAreaProps = Common & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "value" | "className"> & { ref?: Ref<HTMLTextAreaElement> };

export function TextArea({ label, hint, error, hideLabel, value, onChange, size = "md", variant = "default", className, rows = 3, ...rest }: TextAreaProps) {
  return (
    <Field label={label} hint={hint} error={error} hideLabel={hideLabel} className={className}>
      {(p) => <textarea {...rest} {...p} rows={rows} value={value} onChange={(e) => onChange(e.target.value)}
                        className={cx(p.className, "vs-text-field--area", `vs-text-field--${variant}`, size === "sm" && "vs-text-field--sm")} />}
    </Field>
  );
}
