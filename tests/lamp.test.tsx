import fs from "node:fs";
import path from "node:path";
import { render, screen } from "@testing-library/react";
import { allCss } from "./css";
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
  it("лампа видна всегда: горит — тон lamp, выключена — потухшая, текст не сдвигается", () => {
    const { rerender } = render(<Button pressed indicator="lamp">Баня</Button>);
    const icon = () => screen.getByRole("button", { name: "Баня" }).querySelector("svg[data-icon]");
    expect(icon()!.getAttribute("data-icon")).toBe("dot");
    expect(icon()!.classList.contains("vs-icon--lamp")).toBe(true);
    expect(icon()!.classList.contains("vs-button__lamp")).toBe(true);
    expect(screen.getByRole("button", { name: "Баня" }).firstElementChild).toBe(icon());
    expect(screen.getByRole("button", { name: "Баня" }).className).toContain("vs-button--icon");
    rerender(<Button pressed={false} indicator="lamp">Баня</Button>);
    expect(icon()!.classList.contains("vs-icon--lamp")).toBe(false);
    expect(icon()!.classList.contains("vs-button__lamp--off")).toBe(true);
    rerender(<SplitButton pressed={false} indicator="lamp" onClick={() => {}} more={{ label: "Кухня: лампы", onClick: () => {} }}>Кухня</SplitButton>);
    const split = screen.getByRole("button", { name: "Кухня" }).querySelector("svg[data-icon=dot]")!;
    expect(split.classList.contains("vs-split__lamp--off")).toBe(true);
    for (const f of ["components/Button.css", "components/SplitButton.css"]) {
      expect(read(f)).not.toMatch(/__lamp \{[^}]*position: absolute/);
      expect(read(f)).not.toMatch(/--vs-(button|split-main)-pl: var\(--vs-space-6\)/);
    }
    expect(read("components/Button.css")).toMatch(/\.vs-button__lamp--off \{[^}]*color: var\(--vs-muted\)[^}]*filter: none/);
    expect(read("components/SplitButton.css")).toMatch(/\.vs-split__lamp--off \{[^}]*color: var\(--vs-muted\)[^}]*filter: none/);
    expect(allCss()).toMatch(/\.vs-icon--lamp \{[^}]*color: var\(--vs-lamp\)/);
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
