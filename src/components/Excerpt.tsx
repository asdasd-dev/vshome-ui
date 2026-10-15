import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cx } from "../utils/cx";
import { Sheet } from "./Sheet";
import { Text } from "./Text";

export type ExcerptProps = { children: string; title: ReactNode; className?: string };

export function Excerpt({ children, title, className }: ExcerptProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [more, setMore] = useState(false);
  const [open, setOpen] = useState(false);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => setMore(el.scrollHeight > el.clientHeight + 1);
    check();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [children]);
  const kiosk = !!ref.current?.closest(".vs-kiosk");
  return (
    <>
      <div ref={ref} className={cx("vs-excerpt", className)} data-more={more ? "" : undefined} role={more ? "button" : undefined}
           tabIndex={more ? 0 : undefined} onClick={more ? () => setOpen(true) : undefined}>{children}</div>
      {open && (
        <Sheet open onRequestClose={() => setOpen(false)} className={kiosk ? "vs-kiosk" : undefined} head={<Text variant="display">{title}</Text>}>
          <Text as="p" variant="lead" className="vs-excerpt__full">{children}</Text>
        </Sheet>
      )}
    </>
  );
}
