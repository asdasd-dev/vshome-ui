import fs from "node:fs";
import path from "node:path";
import { render } from "@testing-library/react";
import { Artwork, List, ListRow } from "../src";

describe("ListRow align=center", () => {
  it("картинка слева и две строки текста центрируются по вертикали", () => {
    const { container } = render(<List><ListRow align="center" lead={<Artwork size="sm" />} title="Marianne" sub="Fontaines D.C." /></List>);
    expect(container.querySelector(".vs-list-row")!.className).toContain("vs-list-row--center");
    const css = fs.readFileSync(path.join(__dirname, "..", "src", "components", "List.css"), "utf8");
    expect(css).toMatch(/\.vs-list-row--center \.vs-list-row__lead, \.vs-list-row--center\.vs-list-row--two \.vs-list-row__title \{ align-self: center; \}/);
  });
});
