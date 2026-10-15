import fs from "node:fs";
import path from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Text } from "../src";

const css = fs.readFileSync(path.join(__dirname, "..", "src", "components", "Text.css"), "utf8");
const rule = (sel: string) => { const at = css.indexOf(`${sel} {`); return at < 0 ? "" : css.slice(css.indexOf("{", at) + 1, css.indexOf("}", at)); };

describe("Text", () => {
  it("по умолчанию span с ролью body и обычным тоном", () => {
    render(<Text>привет</Text>);
    const t = screen.getByText("привет");
    expect(t.tagName).toBe("SPAN");
    expect(t.className).toBe("vs-text vs-text--body");
  });
  it("роль, тон, вес, тег и обрезка — классами", () => {
    render(<Text variant="title" tone="muted" weight="medium" as="h2" lines={2} className="x">заголовок</Text>);
    const t = screen.getByRole("heading", { level: 2, name: "заголовок" });
    for (const c of ["vs-text--title", "vs-text--muted", "vs-text--w-medium", "vs-text--lines-2", "x"]) expect(t.classList.contains(c), c).toBe(true);
  });
  it("lines=1 — одна строка с многоточием", () => {
    render(<Text lines={1}>длинное</Text>);
    expect(screen.getByText("длинное").classList.contains("vs-text--lines-1")).toBe(true);
    expect(rule(".vs-text--lines-1")).toMatch(/text-overflow: ellipsis/);
  });
  it("у каждой роли размер и интервал из шкалы токенов", () => {
    const roles: Record<string, string> = { display: "2xl", title: "lg", lead: "lg", body: "md", caption: "sm", label: "xs" };
    for (const [r, s] of Object.entries(roles)) {
      const body = rule(`.vs-text--${r}`);
      expect(body, r).toContain(`font-size: var(--vs-text-${s})`);
      expect(body, r).toContain(`line-height: var(--vs-leading-${s})`);
    }
    expect(rule(".vs-text--display")).toContain("font-family: var(--vs-font-display)");
    expect(rule(".vs-text--label")).toContain("text-transform: uppercase");
  });
  it("в CSS нет чисел вместо токенов размера и веса", () => {
    expect(css).not.toMatch(/font-size:\\s*\\d/);
    expect(css).not.toMatch(/font-weight:\\s*\\d/);
  });
});
