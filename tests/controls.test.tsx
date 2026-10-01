import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button, Chip, Segment } from "../src";

describe("Button", () => {
  it("по умолчанию type=button, вариант в классе", () => {
    render(<Button variant="primary">Апрув</Button>);
    const b = screen.getByRole("button", { name: "Апрув" });
    expect(b).toHaveAttribute("type", "button");
    expect(b).toHaveClass("vs-button", "vs-button--primary");
  });
  it("type=submit пробрасывается", () => {
    render(<Button type="submit">Сохранить</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });
});

describe("Chip", () => {
  it("aria-pressed отражает pressed, клик вызывает onClick", async () => {
    const onClick = vi.fn();
    render(<Chip pressed onClick={onClick}>Personal OS</Chip>);
    const b = screen.getByRole("button", { name: "Personal OS" });
    expect(b).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(b);
    expect(onClick).toHaveBeenCalledOnce();
  });
  it("без pressed — нет aria-pressed", () => {
    render(<Chip>PR 1</Chip>);
    expect(screen.getByRole("button")).not.toHaveAttribute("aria-pressed");
  });
});

describe("Segment", () => {
  it("отмечает выбранное и сообщает о выборе", async () => {
    const onChange = vi.fn();
    render(<Segment ariaLabel="Вид" value="board" onChange={onChange} options={[{ value: "board", label: "Доска" }, { value: "backlog", label: "Бэклог" }]} />);
    expect(screen.getByRole("group", { name: "Вид" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Доска" })).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(screen.getByRole("button", { name: "Бэклог" }));
    expect(onChange).toHaveBeenCalledWith("backlog");
  });
});
