import { cx } from "../utils/cx";

export type FrameProps = { src: string; title: string; loading?: "lazy" | "eager"; allow?: string; className?: string };

export function Frame({ src, title, loading = "lazy", allow, className }: FrameProps) {
  return <iframe className={cx("vs-frame", className)} src={src} title={title} loading={loading} allow={allow} />;
}
