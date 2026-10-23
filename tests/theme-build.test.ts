// @vitest-environment node
import { describe, expect, it } from "vitest";
import type { Plugin } from "vite";
import { themeBootScript, themeViolations, vshomeBuild } from "../src/node/vite";

const plugin = (c: ReturnType<typeof vshomeBuild>, name: string) =>
  (c.plugins ?? []).flat().find((p): p is Plugin => !!p && typeof p === "object" && "name" in p && p.name === name);

describe("защита темы", () => {
  it.each([
    ["@media (prefers-color-scheme: dark) { .x { color: red } }"],
    ["const dark = matchMedia(\"(prefers-color-scheme: dark)\").matches;"],
    [":root[data-calendar-theme=\"dark\"] { --x: 1 }"],
    ["[data-color-scheme=\"dark\"] .x {}"],
    ["document.documentElement.dataset.calendarTheme = mode;"],
    ["document.documentElement.dataset.colorScheme = mode;"],
    [".cal-shell[data-theme=\"light\"] .chip {}"],
    ["<div className=\"cal-shell\" data-theme={mode}>"],
  ])("ловит %s", (line) => {
    expect(themeViolations(line)).toHaveLength(1);
  });
  it.each([
    [":root[data-theme=\"dark\"] .amb { background: black; }"],
    ["html[data-theme=\"dark\"] .x {}"],
    ["document.documentElement.dataset.theme = \"dark\";"],
    ["root.dataset.theme = themeAt(new Date());"],
    ["<ThemeSwitch value={theme.choice} onChange={theme.set} />"],
    [".vs-theme-switch { gap: 4px }"],
  ])("пропускает %s", (line) => {
    expect(themeViolations(line)).toEqual([]);
  });
  it("в сборке: файл сайта с нарушением роняет сборку, пакеты из node_modules и тесты не проверяются", () => {
    const guard = plugin(vshomeBuild({ outDir: "x" }), "vshome-theme-guard")!;
    const transform = guard.transform as (this: unknown, code: string, id: string) => unknown;
    const ctx = { error: (m: string) => { throw new Error(m); } };
    const bad = "@media (prefers-color-scheme: dark) {}";
    expect(() => transform.call(ctx, bad, "/app/src/app.css")).toThrow(/тема в обход @vshome\/ui[\s\S]*1: @media/);
    expect(transform.call(ctx, bad, "/app/node_modules/@vshome/ui/dist/style.css")).toBeNull();
    expect(transform.call(ctx, bad, "/app/src/logo.svg")).toBeNull();
    expect(transform.call(ctx, bad, "/app/src/wall.test.tsx")).toBeNull();
  });
});

describe("скрипт темы в index.html", () => {
  type Tag = { tag: string; children?: string; attrs?: Record<string, string>; injectTo: string };
  const setup = (opts: Parameters<typeof vshomeBuild>[0], command: "build" | "serve") => {
    const p = plugin(vshomeBuild(opts), "vshome-theme-boot");
    if (!p) return null;
    (p.configResolved as (c: unknown) => void)({ base: "./", command });
    const emitted: { fileName: string; source: string }[] = [];
    (p.buildStart as ((this: unknown) => void) | undefined)?.call({ emitFile: (f: { fileName: string; source: string }) => { emitted.push(f); return ""; } });
    return { tags: (p.transformIndexHtml as () => Tag[])(), emitted };
  };
  it("по умолчанию — ключ vs-theme, отдельным файлом первым в <head>", () => {
    const { tags, emitted } = setup({ outDir: "x" }, "build")!;
    expect(emitted).toHaveLength(1);
    expect(emitted[0]!.source).toBe(themeBootScript({}));
    expect(emitted[0]!.fileName).toMatch(/^assets\/theme-boot-[0-9a-f]{8}\.js$/);
    expect(tags).toEqual([{ tag: "script", attrs: { src: "./" + emitted[0]!.fileName }, injectTo: "head-prepend" }]);
  });
  it("singleFile и vite dev — инлайн, с ключом сайта", () => {
    const theme = { key: "lenta-theme", fallback: "light" } as const;
    for (const [opts, cmd] of [[{ outDir: "x", singleFile: true, theme }, "build"], [{ outDir: "x", theme }, "serve"]] as const) {
      const { tags, emitted } = setup(opts, cmd)!;
      expect(emitted).toEqual([]);
      expect(tags).toEqual([{ tag: "script", children: themeBootScript(theme), injectTo: "head-prepend" }]);
    }
  });
  it("theme: false — сайт ставит тему сам, скрипта нет", () => {
    expect(setup({ outDir: "x", theme: false }, "build")).toBeNull();
  });
});
