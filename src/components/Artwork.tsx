import { cx } from "../utils/cx";

export type ArtworkProps = { src: string; alt?: string; size?: "md" | "lg"; className?: string };

export function Artwork({ src, alt = "", size = "md", className }: ArtworkProps) {
  return <img className={cx("vs-artwork", `vs-artwork--${size}`, className)} src={src} alt={alt} />;
}
