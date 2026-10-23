import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { List, ListRow } from "../src";

const ROW = 50, MORE = 20;
let avail = 0;

function layout() {
  vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockImplementation(function (this: HTMLElement) { return this.classList.contains("vs-list-wrap") ? avail : 0; });
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
    const i = this.tagName === "LI" ? [...this.parentElement!.children].indexOf(this) : -1;
    const top = i >= 0 ? i * ROW : 0, height = i >= 0 ? ROW : this.classList.contains("vs-list-more") ? MORE : avail;
    return { top, bottom: top + height, height, left: 0, right: 0, width: 0, x: 0, y: top, toJSON: () => ({}) } as DOMRect;
  });
}
afterEach(() => vi.restoreAllMocks());

const rows = (n: number) => Array.from({ length: n }, (_, i) => <ListRow key={i} title={`Дело ${i + 1}`} />);

describe("List fit", () => {
  it("показывает только целые строки, без «ещё N» и без места под него", () => {
    avail = 160;
    layout();
    const { container } = render(<List fit>{rows(4)}</List>);
    expect(container.querySelectorAll("li")).toHaveLength(3);
    expect(container.querySelector(".vs-list-more")).toBeNull();
    expect(container.querySelector(".vs-list-wrap")).toHaveClass("vs-list-wrap--fit");
  });
  it("всё помещается — без «ещё»", () => {
    avail = 200;
    layout();
    const { container } = render(<List fit>{rows(4)}</List>);
    expect(container.querySelectorAll("li")).toHaveLength(4);
    expect(container.querySelector(".vs-list-more")).toBeNull();
  });
  it("onMore — под строками нажимаемое «ещё N», место под него оставлено", () => {
    avail = 160;
    layout();
    const more = vi.fn();
    const { container } = render(<List fit onMore={more}>{rows(4)}</List>);
    expect(container.querySelectorAll("li")).toHaveLength(2);
    fireEvent.click(screen.getByRole("button", { name: "ещё 2" }));
    expect(more).toHaveBeenCalledOnce();
  });
  it("onMore с max считает скрытые и за пределом, и не влезшие", () => {
    avail = 140;
    layout();
    const { container } = render(<List fit max={3} onMore={() => {}}>{rows(6)}</List>);
    expect(container.querySelectorAll("li")).toHaveLength(2);
    expect(screen.getByText("ещё 4")).toBeTruthy();
  });
  it("max без fit — «ещё N» как раньше", () => {
    const { container } = render(<List max={2}>{rows(4)}</List>);
    expect(container.querySelectorAll("li")).toHaveLength(2);
    expect(screen.getByText("ещё 2")).toBeTruthy();
  });
  it("без раскладки (высота 0) — все строки", () => {
    avail = 0;
    layout();
    const { container } = render(<List fit>{rows(3)}</List>);
    expect(container.querySelectorAll("li")).toHaveLength(3);
  });
});
