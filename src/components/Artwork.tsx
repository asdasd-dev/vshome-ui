import { useState, type ReactNode } from "react";
import { cx } from "../utils/cx";
import type { Tone } from "./tone";

export type ArtworkProps = {
  src?: string; alt?: string; fallback?: ReactNode; size?: "sm" | "md" | "lg" | "fill"; fit?: "cover" | "contain"; backdrop?: Tone;
  loading?: "lazy" | "eager"; className?: string;
};

export function Artwork({ src, alt = "", fallback, size = "md", fit = "cover", backdrop, loading = "lazy", className }: ArtworkProps) {
  const [broken, setBroken] = useState<string | undefined>(undefined);
  const cls = cx("vs-artwork", `vs-artwork--${size}`, fit === "contain" && "vs-artwork--contain", backdrop && `vs-artwork--backdrop-${backdrop}`, className);
  if (!src || broken === src) return <span className={cx(cls, "vs-artwork--fallback")} aria-hidden={alt ? undefined : true} aria-label={alt || undefined} role={alt ? "img" : undefined}>{fallback}</span>;
  return <img className={cls} src={src} alt={alt} loading={loading} onError={() => setBroken(src)} />;
}
