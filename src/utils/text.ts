export type TextPart = { text: string; url?: string };

export function clampText(text: string, maxLines: number, maxChars: number): { text: string; cut: boolean } {
  const lines = text.split("\n");
  let seen = 0;
  let end = lines.length;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i]!.trim()) seen++;
    if (seen === maxLines) { end = i + 1; break; }
  }
  let out = lines.slice(0, end).join("\n");
  let cut = end < lines.length && lines.slice(end).some((l) => l.trim());
  if (out.length > maxChars) {
    const head = out.slice(0, maxChars + 1);
    const space = head.lastIndexOf(" ");
    out = space > 0 ? head.slice(0, space) : out.slice(0, maxChars);
    cut = true;
  }
  return cut ? { text: out.trimEnd() + "…", cut } : { text: out, cut };
}

const LINK_RE = /\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)|https?:\/\/[^\s<>"]+/gi;
const TRAILING = /[.,;:!?)»"']+$/;

export function linkify(text: string): TextPart[] {
  const parts: TextPart[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK_RE)) {
    const start = m.index;
    let url = m[2] ?? m[0];
    let label = m[1] ?? url;
    let end = start + m[0].length;
    if (!m[2]) {
      const tail = TRAILING.exec(url)?.[0] ?? "";
      url = url.slice(0, url.length - tail.length);
      label = url;
      end -= tail.length;
    }
    if (start > last) parts.push({ text: text.slice(last, start) });
    parts.push({ url, text: label });
    last = end;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });
  return parts;
}
