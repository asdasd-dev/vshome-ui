import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Folder } from "../src";
import { allCss } from "./css";

const show = (props: Partial<Parameters<typeof Folder>[0]> = {}) => render(
  <Folder title="Медиа" trigger={<span>Медиа</span>} tooltip="Кино" {...props}><a href="#j">Jellyfin</a><a href="#s">Sonarr</a></Folder>,
);

describe("Folder", () => {
  it("плитка — кнопка с aria-haspopup=dialog и aria-expanded", () => {
    show();
    const b = screen.getByRole("button", { name: "Медиа" });
    expect(b.getAttribute("aria-haspopup")).toBe("dialog");
    expect(b.getAttribute("aria-expanded")).toBe("false");
    expect(b.className).toMatch(/vs-card--interactive/);
  });
  it("открывается модальным окном с названием, фокус внутри; Esc закрывает и возвращает фокус", async () => {
    show();
    const b = screen.getByRole("button", { name: "Медиа" });
    fireEvent.click(b);
    const d = await screen.findByRole("dialog", { name: "Медиа" });
    expect(d.getAttribute("aria-modal")).toBe("true");
    expect(b.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByRole("link", { name: "Jellyfin" })).toBeTruthy();
    await waitFor(() => expect(d.contains(document.activeElement)).toBe(true));
    fireEvent.keyDown(d, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(document.activeElement).toBe(b));
  });
  it("панель растёт от плитки: сдвиг и масштаб от её координат", async () => {
    const r = vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ left: 10, top: 20, width: 80, height: 90, right: 90, bottom: 110, x: 10, y: 20, toJSON: () => ({}) } as DOMRect);
    show();
    fireEvent.click(screen.getByRole("button", { name: "Медиа" }));
    const d = await screen.findByRole("dialog");
    expect(d.style.getPropertyValue("--vs-folder-dx")).toBe(`${Math.round(50 - window.innerWidth / 2)}px`);
    expect(d.style.getPropertyValue("--vs-folder-dy")).toBe(`${Math.round(65 - window.innerHeight / 2)}px`);
    expect(Number(d.style.getPropertyValue("--vs-folder-s"))).toBeGreaterThan(0);
    r.mockRestore();
  });
  it("управление снаружи: open и onOpenChange", async () => {
    const on = vi.fn();
    show({ open: true, onOpenChange: on });
    expect(await screen.findByRole("dialog")).toBeTruthy();
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(on).toHaveBeenCalledWith(false);
  });
  it("движение на токенах, без анимации при reduce", () => {
    const css = allCss();
    expect(css).toMatch(/\.vs-folder \{[^}]*transition: transform var\(--vs-duration-sheet\) var\(--vs-ease-sheet\)/);
    expect(css).toMatch(/\.vs-folder-backdrop \{[^}]*backdrop-filter: blur\(var\(--vs-scrim-blur\)\)/);
    expect(css).toMatch(/prefers-reduced-motion: reduce\) \{\s*\.vs-folder, \.vs-folder-backdrop \{ transition: none; \}/);
  });
});
