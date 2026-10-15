import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";
import * as ui from "../src";
import * as charts from "../src/charts";

const root = path.join(__dirname, "..");
const stories = fs.readdirSync(path.join(root, "showcase", "stories")).filter((f) => f.endsWith(".tsx"));
const metas = stories.map((f) => {
  const src = fs.readFileSync(path.join(root, "showcase", "stories", f), "utf8");
  const m = src.match(/export const meta[^=]*=\s*(\{[\s\S]*?\});/);
  return { file: f, components: [...(m?.[1]?.matchAll(/"([A-Za-z]+)"/g) ?? [])].map((x) => x[1]!), doc: m?.[1]?.match(/doc:\s*"([^"]+)"/)?.[1] };
});
const covered = new Set(metas.flatMap((m) => m.components));
const exported = (mod: Record<string, unknown>) => Object.entries(mod).filter(([k, v]) => /^[A-Z][a-z]/.test(k) && typeof v === "function" && k !== "ApiError").map(([k]) => k);

describe("каталог покрывает всю систему", () => {
  it("у каждого компонента есть примеры", () => {
    const missing = [...exported(ui as Record<string, unknown>), ...exported(charts as Record<string, unknown>)].filter((k) => !covered.has(k));
    expect(missing).toEqual([]);
  });
  it("у каждой страницы примеров есть гайдлайн", () => {
    const missing = metas.filter((m) => !m.doc || !fs.existsSync(path.join(root, "docs", "components", `${m.doc}.md`))).map((m) => m.file);
    expect(missing).toEqual([]);
  });
  it("таблица свойств актуальна", () => {
    expect(() => execFileSync("node", [path.join(root, "scripts", "props.mjs"), "--check"], { stdio: "pipe" })).not.toThrow();
  });
});
