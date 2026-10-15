import type { ReactNode } from "react";
import { cx } from "../utils/cx";

export type ProseProps = { html?: string; children?: ReactNode; className?: string };

export function Prose({ html, children, className }: ProseProps) {
  if (html != null) return <div className={cx("vs-prose", className)} dangerouslySetInnerHTML={{ __html: html }} />;
  return <div className={cx("vs-prose", className)}>{children}</div>;
}
