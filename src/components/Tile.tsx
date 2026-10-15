import { useCallback, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cx } from "../utils/cx";

export type TileProps = {
  label?: string; aside?: ReactNode; tone?: "default" | "warn" | "danger"; children?: ReactNode; footer?: ReactNode;
  scroll?: boolean; className?: string; "data-tile"?: string;
};

function useFade(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [fade, setFade] = useState("");
  const measure = useCallback(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const top = el.scrollTop > 1;
    const bottom = el.scrollTop + el.clientHeight < el.scrollHeight - 1;
    setFade([top && "top", bottom && "bottom"].filter(Boolean).join(" "));
  }, [enabled]);
  useLayoutEffect(measure);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !enabled || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [enabled, measure]);
  return { ref, fade, measure };
}

export function Tile({ label, aside, tone = "default", children, footer, scroll, className, ...data }: TileProps) {
  const id = useId();
  const { ref, fade, measure } = useFade(!!scroll);
  const cls = cx("vs-tile", `vs-tile--${tone}`, className);
  const body = (
    <>
      {label && aside != null ? (
        <div className="vs-tile__head"><div id={id} className="vs-tile__label">{label}</div><div className="vs-tile__aside">{aside}</div></div>
      ) : label && <div id={id} className="vs-tile__label">{label}</div>}
      <div ref={ref} className={cx("vs-tile__body", scroll && "vs-tile__body--scroll")} data-fade={scroll && fade ? fade : undefined}
           onScroll={scroll ? measure : undefined}>{children}</div>
      {footer && <div className="vs-tile__footer">{footer}</div>}
    </>
  );
  return <section className={cls} aria-labelledby={label ? id : undefined} {...data}>{body}</section>;
}
