import { useEffect, type RefObject } from "react";

const PEEK = 24;

export function useKeepSelectedInView(ref: RefObject<HTMLElement | null>, selector: string, key: unknown) {
  useEffect(() => {
    const box = ref.current;
    const el = box?.querySelector<HTMLElement>(selector);
    if (!box || !el || box.scrollWidth <= box.clientWidth) return;
    const b = box.getBoundingClientRect(), r = el.getBoundingClientRect();
    if (r.left < b.left) box.scrollLeft -= b.left - r.left + PEEK;
    else if (r.right > b.right) box.scrollLeft += r.right - b.right + PEEK;
  }, [key]);
}
