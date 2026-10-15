import fs from "node:fs";
import path from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button, SplitButton } from "../src";

const read = (f: string) => fs.readFileSync(path.join(__dirname, "..", "src", f), "utf8");

describe("indicator=lamp", () => {
  it("Button и SplitButton получают класс лампы, aria-pressed остаётся", () => {
    render(<><Button pressed indicator="lamp">Баня</Button><SplitButton pressed indicator="lamp" onClick={() => {}} more={{ label: "Кухня: лампы", onClick: () => {} }}>Кухня</SplitButton></>);
    const b = screen.getByRole("button", { name: "Баня" });
    expect(b.className).toContain("vs-button--lamp");
    expect(b).toHaveAttribute("aria-pressed", "true");
    const main = screen.getByRole("button", { name: "Кухня" });
    expect(main.closest(".vs-split")!.className).toContain("vs-split--lamp");
    expect(main).toHaveAttribute("aria-pressed", "true");
  });
  it("нажатая лампа — иконка dot тоном lamp слева, без заливки; отжатая — без иконки", () => {
    const { rerender } = render(<Button pressed indicator="lamp">Баня</Button>);
    const icon = () => screen.getByRole("button", { name: "Баня" }).querySelector("svg[data-icon]");
    expect(icon()!.getAttribute("data-icon")).toBe("dot");
    expect(icon()!.classList.contains("vs-icon--lamp")).toBe(true);
    expect(icon()!.classList.contains("vs-button__lamp")).toBe(true);
    expect(screen.getByRole("button", { name: "Баня" }).firstElementChild).toBe(icon());
    rerender(<Button pressed={false} indicator="lamp">Баня</Button>);
    expect(icon()).toBeNull();
    expect(read("components/Button.css")).toMatch(/\.vs-button--lamp \{[^}]*--vs-button-pressed: var\(--vs-button-bg\)[^}]*--vs-button-pl: var\(--vs-space-6\)/);
    expect(read("components/SplitButton.css")).toMatch(/\.vs-split--lamp \{[^}]*--vs-split-pressed: var\(--vs-split-bg\)[^}]*--vs-split-main-pl: var\(--vs-space-6\)/);
    expect(screen.getByRole("button", { name: "Баня" }).className).not.toContain("vs-button--icon");
    expect(read("components/Button.css")).toMatch(/\.vs-button__lamp \{[^}]*position: absolute[^}]*left: var\(--vs-space-0_5\)[^}]*width: var\(--vs-space-5\)/);
    expect(read("components/Icon.css")).toMatch(/\.vs-icon--lamp \{[^}]*color: var\(--vs-lamp\)/);
  });
  it("icon — иконка из набора слева от текста у Button и SplitButton", () => {
    render(<><Button icon="check">Готово</Button><SplitButton icon="clock" onClick={() => {}} more={{ label: "ещё", onClick: () => {} }}>Таймер</SplitButton></>);
    const b = screen.getByRole("button", { name: "Готово" });
    expect(b.firstElementChild!.getAttribute("data-icon")).toBe("check");
    expect(b.className).toContain("vs-button--icon");
    expect(screen.getByRole("button", { name: "Таймер" }).firstElementChild!.getAttribute("data-icon")).toBe("clock");
  });
  it("токен --vs-lamp есть в светлой и тёмной теме", () => {
    const t = read("styles/tokens.css");
    expect(t.match(/--vs-lamp:/g)).toHaveLength(3);
  });
});

describe("подпись кнопки", () => {
  it("не переносится ни у Button, ни у SplitButton", () => {
    expect(read("components/Button.css")).toMatch(/\.vs-button \{[^}]*white-space: nowrap/);
    expect(read("components/SplitButton.css")).toMatch(/\.vs-split button \{[^}]*white-space: nowrap/);
  });
});
