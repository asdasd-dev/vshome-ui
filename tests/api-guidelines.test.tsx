import fs from "node:fs";
import path from "node:path";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Excerpt, ListRow, Segment, Slider, Switch } from "../src";

const dir = path.join(__dirname, "..", "src", "components");

describe("единый API компонентов", () => {
  it("у каждого компонента с разметкой есть className", () => {
    const skip = new Set(["Toast.tsx", "icons.ts"]);
    for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".tsx") && !skip.has(x))) {
      const src = fs.readFileSync(path.join(dir, f), "utf8");
      for (const part of src.split("export ").filter((x) => /^type \w+Props\b/.test(x))) {
        const name = part.match(/^type (\w+Props)/)![1]!;
        if (name.endsWith("ControlProps")) continue;
        const body = part.split(/\nexport |\nfunction |\nconst /)[0]!;
        expect(body.includes("className") || body.includes("HTMLAttributes"), `${f}: ${name}`).toBe(true);
      }
    }
  });
  it("className доходит до корня у Segment, Switch, Slider, ListRow", () => {
    const { container } = render(<>
      <Segment label="Раздел" options={[{ value: "a", label: "A" }]} value="a" onChange={() => {}} className="x-seg" />
      <Switch label="Свет" checked={false} onChange={() => {}} className="x-sw" />
      <Slider label="Яркость" value={10} onCommit={() => {}} className="x-sl" />
      <ul><ListRow title="t" className="x-row" /></ul>
    </>);
    for (const c of ["x-seg", "x-sw", "x-sl", "x-row"]) expect(container.querySelector(`.${c}`), c).not.toBeNull();
  });
  it("Segment: доступное имя — label, как у остальных", () => {
    render(<Segment label="Раздел" options={[{ value: "a", label: "A" }]} value="a" onChange={() => {}} />);
    expect(screen.getByRole("group", { name: "Раздел" })).toBeTruthy();
  });
});

describe("стили — файл на компонент", () => {
  it("нет общих файлов на несколько компонентов", () => {
    expect(fs.existsSync(path.join(dir, "Panel.css"))).toBe(false);
    for (const f of ["Tile.css", "Stat.css", "List.css", "Banner.css", "IconButton.css"]) expect(fs.existsSync(path.join(dir, f)), f).toBe(true);
    expect(fs.readFileSync(path.join(dir, "Icon.css"), "utf8")).not.toContain(".vs-icon-button");
  });
});

describe("Excerpt с клавиатуры", () => {
  it("Enter и пробел открывают полный текст", () => {
    const h = vi.spyOn(HTMLElement.prototype, "scrollHeight", "get").mockImplementation(function (this: HTMLElement) { return this.classList.contains("vs-excerpt") ? 500 : 0; });
    render(<Excerpt title="Синк">длинное</Excerpt>);
    fireEvent.keyDown(screen.getByRole("button", { name: "длинное" }), { key: "Enter" });
    expect(screen.getByRole("dialog")).toBeTruthy();
    h.mockRestore();
  });
});
