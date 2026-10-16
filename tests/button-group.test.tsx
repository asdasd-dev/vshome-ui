import { fireEvent, render, screen } from "@testing-library/react";
import { ButtonGroup, ControlRow } from "../src";

const gates = (fn = vi.fn()) => [1, 2, 5].map((n) => ({ label: String(n), ariaLabel: `Калитка ${n}`, onClick: () => fn(n), disabled: n === 5 }));

describe("ButtonGroup", () => {
  it("группа с подписью и кнопками со своими именами", () => {
    render(<ButtonGroup label="Калитка" items={gates()} />);
    const group = screen.getByRole("group", { name: "Калитка" });
    expect(group.className).toContain("vs-button-group");
    expect(screen.getAllByRole("button").map((b) => b.getAttribute("aria-label"))).toEqual(["Калитка 1", "Калитка 2", "Калитка 5"]);
  });
  it("нажатие вызывает только свою кнопку, выключенная молчит", () => {
    const fn = vi.fn();
    render(<ButtonGroup label="Калитка" items={gates(fn)} />);
    fireEvent.click(screen.getByRole("button", { name: "Калитка 2" }));
    fireEvent.click(screen.getByRole("button", { name: "Калитка 5" }));
    expect(fn.mock.calls).toEqual([[2]]);
  });
});

describe("ControlRow inline", () => {
  it("дополнение в одной строке между подписью и контролом", () => {
    const { container } = render(<ul><ControlRow inline label="Люстра" control={<button>sw</button>}><input aria-label="яркость" /></ControlRow></ul>);
    const row = container.querySelector("li")!;
    expect(row.className).toContain("vs-control-row--inline");
    expect([...row.children].map((c) => c.className)).toEqual(["vs-control-row__label", "vs-control-row__extra", "vs-control-row__control"]);
  });
  it("без inline — как раньше, дополнение последним", () => {
    const { container } = render(<ul><ControlRow label="Люстра" control={<button>sw</button>}><input aria-label="яркость" /></ControlRow></ul>);
    const row = container.querySelector("li")!;
    expect(row.className).not.toContain("vs-control-row--inline");
    expect(row.lastElementChild!.className).toBe("vs-control-row__extra");
  });
});
