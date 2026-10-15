import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Badge, Button, Checkbox, Chip, ChipGroup, Field, Link, RadioGroup, Spinner, Tag, TextArea, TextField } from "../src";
import { allCss } from "./css";

describe("Button: новые варианты", () => {
  it("secondary по умолчанию, ghost, lg, block, pill — классами", () => {
    render(<><Button>a</Button><Button variant="ghost" size="lg" block shape="pill">b</Button></>);
    expect(screen.getByRole("button", { name: "a" }).className).toContain("vs-button--secondary");
    const b = screen.getByRole("button", { name: "b" });
    for (const c of ["vs-button--ghost", "vs-button--lg", "vs-button--block", "vs-button--pill"]) expect(b.className, c).toContain(c);
  });
  it("loading — недоступна, aria-busy, со спиннером", async () => {
    const onClick = vi.fn();
    render(<Button loading onClick={onClick}>Сохранить</Button>);
    const b = screen.getByRole("button", { name: /Сохранить/ });
    expect(b).toBeDisabled();
    expect(b).toHaveAttribute("aria-busy", "true");
    expect(b.querySelector(".vs-spinner")).not.toBeNull();
  });
  it("наведение только на устройствах с указателем", () => {
    expect(allCss()).toMatch(/@media \(hover: hover\)[^{]*\{[^@]*\.vs-button:hover/);
  });
});

describe("Chip и ChipGroup", () => {
  it("Chip-ссылка, размер, недоступность, счётчик", () => {
    render(<><Chip href="/x" size="sm">ссылка</Chip><Chip disabled count={3}>фильтр</Chip></>);
    const a = screen.getByRole("link", { name: "ссылка" });
    expect(a.className).toContain("vs-chip--sm");
    const b = screen.getByRole("button", { name: /фильтр/ });
    expect(b).toBeDisabled();
    expect(b.querySelector(".vs-badge")!.textContent).toBe("3");
  });
  it("ChipGroup: одиночный выбор, aria-pressed, прокрутка", async () => {
    const onChange = vi.fn();
    const { container } = render(<ChipGroup label="Статус" value="open" onChange={onChange} scroll options={[{ value: "open", label: "Открытые" }, { value: "done", label: "Готово", count: 2 }]} />);
    expect(screen.getByRole("group", { name: "Статус" }).className).toContain("vs-chip-group--scroll");
    expect(screen.getByRole("button", { name: "Открытые" })).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(screen.getByRole("button", { name: /Готово/ }));
    expect(onChange).toHaveBeenCalledWith("done");
    expect(container.querySelectorAll(".vs-chip")).toHaveLength(2);
  });
});

describe("Badge, Tag, Link", () => {
  it("Badge: число с пределом, тон, точка", () => {
    const { container } = render(<><Badge tone="danger" max={99}>{120}</Badge><Badge dot tone="warn" label="есть новые" /></>);
    expect(screen.getByText("99+").className).toContain("vs-badge--danger");
    const dot = container.querySelector(".vs-badge--dot")!;
    expect(dot.getAttribute("aria-label")).toBe("есть новые");
  });
  it("Tag: тон и вариант", () => {
    render(<Tag tone="ok" variant="outline" size="sm">скидка</Tag>);
    expect(screen.getByText("скидка").className).toBe("vs-tag vs-tag--ok vs-tag--outline vs-tag--sm");
  });
  it("Link: ссылка или кнопка; внешняя открывается в новой вкладке с иконкой", () => {
    const onClick = vi.fn();
    render(<><Link href="https://a.example" external>сайт</Link><Link onClick={onClick} tone="muted">назад</Link></>);
    const a = screen.getByRole("link", { name: /сайт/ });
    expect(a).toHaveAttribute("target", "_blank");
    expect(a).toHaveAttribute("rel", "noopener noreferrer");
    expect(a.querySelector("[data-icon=external]")).not.toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "назад" }));
    expect(onClick).toHaveBeenCalled();
  });
});

describe("Field, TextField, TextArea", () => {
  it("подпись, подсказка и ошибка связаны с полем", () => {
    render(<TextField label="Название" hint="до 70 символов" error="Обязательно" value="" onChange={() => {}} />);
    const input = screen.getByLabelText("Название");
    expect(input).toHaveAttribute("aria-invalid", "true");
    const ids = input.getAttribute("aria-describedby")!.split(" ");
    expect(ids.map((id) => document.getElementById(id)!.textContent)).toEqual(["до 70 символов", "Обязательно"]);
  });
  it("onChange отдаёт строку; поиск с иконкой; пунктирный вариант", async () => {
    const onChange = vi.fn();
    const { container } = render(<><TextField label="Поиск" type="search" value="" onChange={onChange} /><TextField label="Добавить" variant="dashed" value="" onChange={() => {}} /></>);
    await userEvent.type(screen.getByLabelText("Поиск"), "м");
    expect(onChange).toHaveBeenCalledWith("м");
    expect(container.querySelector(".vs-field__control [data-icon=search]")).not.toBeNull();
    expect(container.querySelector(".vs-text-field--dashed")).not.toBeNull();
  });
  it("TextArea: строки и подпись", () => {
    render(<TextArea label="Заметка" rows={4} value="" onChange={() => {}} />);
    expect(screen.getByLabelText("Заметка").tagName).toBe("TEXTAREA");
    expect(screen.getByLabelText("Заметка")).toHaveAttribute("rows", "4");
  });
  it("Field для своего поля", () => {
    render(<Field label="Цвет" hint="любой">{(p) => <input {...p} />}</Field>);
    expect(screen.getByLabelText("Цвет").getAttribute("aria-describedby")).toBeTruthy();
  });
});

describe("Checkbox и RadioGroup", () => {
  it("Checkbox: видимая подпись, onChange(bool), крупный", async () => {
    const onChange = vi.fn();
    const { container } = render(<Checkbox label="Купил" checked={false} onChange={onChange} size="lg" />);
    await userEvent.click(screen.getByLabelText("Купил"));
    expect(onChange).toHaveBeenCalledWith(true);
    expect(container.firstElementChild!.className).toContain("vs-checkbox--lg");
  });
  it("RadioGroup: легенда, выбор, подсказка у варианта", async () => {
    const onChange = vi.fn();
    render(<RadioGroup legend="Как закрыть" value="done" onChange={onChange} options={[{ value: "done", label: "Сделано" }, { value: "wont", label: "Не будем", hint: "с причиной" }]} />);
    expect(screen.getByRole("group", { name: "Как закрыть" })).toBeTruthy();
    expect(screen.getByLabelText(/Сделано/)).toBeChecked();
    await userEvent.click(screen.getByLabelText(/Не будем/));
    expect(onChange).toHaveBeenCalledWith("wont");
  });
});

describe("Spinner", () => {
  it("статус с подписью, размер", () => {
    render(<Spinner size="lg" label="Загружаю" />);
    const s = screen.getByRole("status", { name: "Загружаю" });
    expect(s.className).toContain("vs-spinner--lg");
  });
});
