import { useState, type ReactNode } from "react";
import { cx } from "../utils/cx";

export type ArtworkProps = { src?: string; alt?: string; fallback?: ReactNode; size?: "sm" | "md" | "lg"; className?: string };

export function Artwork({ src, alt = "", fallback, size = "md", className }: ArtworkProps) {
  const [broken, setBroken] = useState<string | undefined>(undefined);
  const cls = cx("vs-artwork", `vs-artwork--${size}`, className);
  if (!src || broken === src) return <span className={cx(cls, "vs-artwork--fallback")} aria-hidden={alt ? undefined : true} aria-label={alt || undefined} role={alt ? "img" : undefined}>{fallback}</span>;
  return <img className={cls} src={src} alt={alt} onError={() => setBroken(src)} />;
}
