import { act, render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeSwitch, themeBootScript, useTheme } from "../src";

afterEach(() => { localStorage.clear(); delete document.documentElement.dataset.theme; document.querySelector('meta[name="theme-color"]')?.remove(); });

describe("useTheme", () => {
  it("без выбора — fallback; set сохраняет, ставит data-theme и theme-color, обновляет все экземпляры", () => {
    const a = renderHook(() => useTheme({ key: "t", fallback: "light", themeColor: { light: "#111111", dark: "#222222" } }));
    const b = renderHook(() => useTheme({ key: "t", fallback: "light" }));
    expect(a.result.current.value).toBe("light");
    expect(document.documentElement.dataset.theme).toBe("light");
    act(() => a.result.current.set("dark"));
    expect(localStorage.getItem("t")).toBe("dark");
    expect(b.result.current.value).toBe("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')!.content).toBe("#222222");
    act(() => a.result.current.set("system"));
    expect(document.documentElement.dataset.theme).toBeUndefined();
  });
  it("мусор в хранилище — fallback", () => {
    localStorage.setItem("t", "purple");
    expect(renderHook(() => useTheme({ key: "t", fallback: "light" })).result.current.value).toBe("light");
  });
  it("скрипт загрузки ставит тему до отрисовки", () => {
    localStorage.setItem("t", "dark");
    new Function(themeBootScript("t", "light"))();
    expect(document.documentElement.dataset.theme).toBe("dark");
    localStorage.clear(); delete document.documentElement.dataset.theme;
    new Function(themeBootScript("t", "light"))();
    expect(document.documentElement.dataset.theme).toBe("light");
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
