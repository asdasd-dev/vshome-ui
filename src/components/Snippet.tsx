import type { ReactNode } from "react";
import { cx } from "../utils/cx";

export type SnippetProps = {
  title: ReactNode; href?: string; external?: boolean; titleLines?: 1 | 2 | 3;
  media?: ReactNode; meta?: ReactNode; price?: ReactNode; tags?: ReactNode; corner?: ReactNode; actions?: ReactNode;
  tone?: "default" | "muted"; elevated?: boolean; as?: "div" | "article" | "li"; className?: string;
};

export function Snippet({ title, href, external, titleLines = 2, media, meta, price, tags, corner, actions, tone = "default", elevated, as: Tag = "article", className }: SnippetProps) {
  const name = <span className={cx("vs-snippet__title", `vs-snippet__title--lines-${titleLines}`)}>{title}</span>;
  return (
    <Tag className={cx("vs-snippet", `vs-snippet--${tone}`, elevated && "vs-snippet--elevated", href != null && "vs-snippet--link", !media && "vs-snippet--no-media", className)}>
      {media && <div className="vs-snippet__media">{media}</div>}
      <div className="vs-snippet__body">
        <div className={cx("vs-snippet__head", !!corner && "vs-snippet__head--corner")}>
          {href != null
            ? <a className="vs-snippet__link" href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{name}</a>
            : name}
        </div>
        {meta && <div className="vs-snippet__meta">{meta}</div>}
        {price && <div className="vs-snippet__price">{price}</div>}
        {tags && <div className="vs-snippet__tags">{tags}</div>}
        {actions && <div className="vs-snippet__actions">{actions}</div>}
      </div>
      {corner && <div className="vs-snippet__corner">{corner}</div>}
    </Tag>
  );
}
