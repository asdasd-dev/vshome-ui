import { useId, type ReactNode } from "react";
import { cx } from "../utils/cx";

export type TileProps = {
  label?: string; tone?: "default" | "warn" | "danger"; children?: ReactNode; footer?: ReactNode;
  onClick?: () => void; className?: string; "data-tile"?: string;
};

export function Tile({ label, tone = "default", children, footer, onClick, className, ...data }: TileProps) {
  const id = useId();
  const cls = cx("vs-tile", `vs-tile--${tone}`, onClick && "vs-tile--action", className);
  const body = (
    <>
      {label && <div id={id} className="vs-tile__label">{label}</div>}
      <div className="vs-tile__body">{children}</div>
      {footer && <div className="vs-tile__footer">{footer}</div>}
    </>
  );
  if (onClick) return <button type="button" className={cls} aria-labelledby={label ? id : undefined} onClick={onClick} {...data}>{body}</button>;
  return <section className={cls} aria-labelledby={label ? id : undefined} {...data}>{body}</section>;
}
