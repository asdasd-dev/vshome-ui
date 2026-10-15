import { useId, type ReactNode } from "react";
import { cx } from "../utils/cx";

export type TileProps = {
  label?: string; tone?: "default" | "warn" | "danger"; children?: ReactNode; footer?: ReactNode;
  className?: string; "data-tile"?: string;
};

export function Tile({ label, tone = "default", children, footer, className, ...data }: TileProps) {
  const id = useId();
  const cls = cx("vs-tile", `vs-tile--${tone}`, className);
  const body = (
    <>
      {label && <div id={id} className="vs-tile__label">{label}</div>}
      <div className="vs-tile__body">{children}</div>
      {footer && <div className="vs-tile__footer">{footer}</div>}
    </>
  );
  return <section className={cls} aria-labelledby={label ? id : undefined} {...data}>{body}</section>;
}
