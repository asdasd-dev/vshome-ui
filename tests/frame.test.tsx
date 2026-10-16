import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Frame, Tile } from "../src";

describe("Frame", () => {
  it("iframe с адресом, названием и className на корне", () => {
    const { container } = render(<Frame src="https://tasks.vshome.space/" title="Доска задач" className="x-frame" />);
    const f = container.querySelector("iframe")!;
    expect(f.getAttribute("src")).toBe("https://tasks.vshome.space/");
    expect(f.getAttribute("title")).toBe("Доска задач");
    expect(f.className).toBe("vs-frame x-frame");
    expect(f.getAttribute("loading")).toBe("lazy");
  });
  it("loading=eager для первого экрана", () => {
    const { container } = render(<Frame src="/x" title="x" loading="eager" />);
    expect(container.querySelector("iframe")!.getAttribute("loading")).toBe("eager");
  });
  it("в плитке занимает всё тело", () => {
    const { container } = render(<Tile label="Задачи"><Frame src="/x" title="x" /></Tile>);
    expect(container.querySelector(".vs-tile__body > .vs-frame")).not.toBeNull();
  });
});
