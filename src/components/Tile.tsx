import { useCallback, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cx } from "../utils/cx";
import { Segment } from "./Segment";

export type TileProps = {
  label?: string; aside?: ReactNode; tone?: "default" | "warn" | "danger"; children?: ReactNode; footer?: ReactNode;
  scroll?: boolean; dimmed?: boolean; backdrop?: string; className?: string; "data-tile"?: string;
  switcher?: { label: string; value: string; options: { value: string; label: ReactNode }[]; onChange: (v: string) => void };
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

export function Tile({ label, aside, tone = "default", children, footer, scroll, dimmed, backdrop, className, switcher, ...data }: TileProps) {
  const id = useId();
  const { ref, fade, measure } = useFade(!!scroll);
  const cls = cx("vs-tile", `vs-tile--${tone}`, dimmed && "vs-tile--dimmed", backdrop && "vs-tile--backdrop", className);
  const body = (
    <>
      {backdrop && <span className="vs-tile__backdrop" aria-hidden="true"><img src={backdrop} alt="" /></span>}
      {switcher ? (
        <div className="vs-tile__head">
          <Segment label={switcher.label} variant="soft" size="sm" value={switcher.value} options={switcher.options} onChange={switcher.onChange} />
          {aside != null && <div className="vs-tile__aside">{aside}</div>}
        </div>
      ) : label && aside != null ? (
        <div className="vs-tile__head"><div id={id} className="vs-tile__label">{label}</div><div className="vs-tile__aside">{aside}</div></div>
      ) : label && <div id={id} className="vs-tile__label">{label}</div>}
      <div ref={ref} className={cx("vs-tile__body", scroll && "vs-tile__body--scroll")} data-fade={scroll && fade ? fade : undefined}
           onScroll={scroll ? measure : undefined}>{children}</div>
      {footer && <div className="vs-tile__footer">{footer}</div>}
    </>
  );
  return <section className={cls} aria-labelledby={label && !switcher ? id : undefined} aria-label={switcher?.label} {...data}>{body}</section>;
}
