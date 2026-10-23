import { act, render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeSwitch, themeBootScript, useSystemTheme, useTheme } from "../src";
import { setSystemDark } from "./media";

afterEach(() => { localStorage.clear(); delete document.documentElement.dataset.theme; document.querySelector('meta[name="theme-color"]')?.remove(); setSystemDark(false); });

const root = () => document.documentElement.dataset.theme;

describe("useTheme", () => {
  it("без выбора — fallback; set сохраняет, ставит data-theme и theme-color, обновляет все экземпляры", () => {
    const a = renderHook(() => useTheme({ key: "t", fallback: "light", themeColor: { light: "#111111", dark: "#222222" } }));
    const b = renderHook(() => useTheme({ key: "t", fallback: "light" }));
    expect(a.result.current.choice).toBe("light");
    expect(root()).toBe("light");
    act(() => a.result.current.set("dark"));
    expect(localStorage.getItem("t")).toBe("dark");
    expect(b.result.current.choice).toBe("dark");
    expect(root()).toBe("dark");
    expect(document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')!.content).toBe("#222222");
  });
  it("«как в системе» — на <html> всегда итоговая тема, и она следует за системой", () => {
    setSystemDark(true);
    const t = renderHook(() => useTheme({ key: "t" }));
    expect(t.result.current.choice).toBe("system");
    expect(t.result.current.resolved).toBe("dark");
    expect(root()).toBe("dark");
    act(() => setSystemDark(false));
    expect(t.result.current.resolved).toBe("light");
    expect(root()).toBe("light");
  });
  it("мусор в хранилище — fallback", () => {
    localStorage.setItem("t", "purple");
    expect(renderHook(() => useTheme({ key: "t", fallback: "light" })).result.current.choice).toBe("light");
  });
});

describe("useSystemTheme", () => {
  it("тема системы для сайтов, которые ставят data-theme сами", () => {
    const t = renderHook(() => useSystemTheme());
    expect(t.result.current).toBe("light");
    act(() => setSystemDark(true));
    expect(t.result.current).toBe("dark");
  });
});

describe("themeBootScript", () => {
  const boot = (config: Parameters<typeof themeBootScript>[0]) => new Function(themeBootScript(config))();
  it("ставит выбранную тему до отрисовки", () => {
    localStorage.setItem("t", "dark");
    boot({ key: "t", fallback: "light" });
    expect(root()).toBe("dark");
  });
  it("без выбора — fallback", () => {
    boot({ key: "t", fallback: "light" });
    expect(root()).toBe("light");
  });
  it("«как в системе» превращает в итоговую тему и следует за системой", () => {
    setSystemDark(true);
    boot({});
    expect(root()).toBe("dark");
    setSystemDark(false);
    expect(root()).toBe("light");
  });
  it("по умолчанию тот же ключ, что у useTheme", () => {
    localStorage.setItem("vs-theme", "dark");
    boot({});
    expect(root()).toBe("dark");
  });
});

describe("ThemeSwitch", () => {
  it("сегмент: три варианта, выбранный нажат", async () => {
    let v = "light";
    render(<ThemeSwitch value="light" onChange={(x) => { v = x; }} />);
    expect(screen.getByRole("button", { name: /Светлая/ })).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(screen.getByRole("button", { name: /Как в системе/ }));
    expect(v).toBe("system");
  });
  it("кнопка: по кругу, имя говорит текущую и следующую", async () => {
    let v = "dark";
    render(<ThemeSwitch variant="button" value="dark" onChange={(x) => { v = x; }} />);
    await userEvent.click(screen.getByRole("button", { name: "Тема: тёмная. Нажмите — как в системе" }));
    expect(v).toBe("system");
  });
});
