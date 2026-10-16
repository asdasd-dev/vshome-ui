import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { IconButton, Snippet } from "../src";

describe("Snippet", () => {
  it("название — ссылка на объект, кнопка в углу отдельно от ссылки", () => {
    const onClick = vi.fn();
    render(<Snippet href="#p/1" title="Ананасы" corner={<IconButton icon="star" label="В избранное" pressed onClick={onClick} />} />);
    const link = screen.getByRole("link", { name: "Ананасы" });
    expect(link).toHaveAttribute("href", "#p/1");
    const star = screen.getByRole("button", { name: "В избранное" });
    expect(star).toHaveAttribute("aria-pressed", "true");
    expect(link.contains(star)).toBe(false);
    fireEvent.click(star);
    expect(onClick).toHaveBeenCalled();
  });
  it("без href — заголовок без ссылки, external открывает в новой вкладке", () => {
    const { rerender } = render(<Snippet title="Задача" />);
    expect(screen.queryByRole("link")).toBeNull();
    rerender(<Snippet title="Задача" href="https://a.example" external />);
    expect(screen.getByRole("link", { name: "Задача" })).toHaveAttribute("target", "_blank");
  });
  it("className доходит до корня", () => {
    const { container } = render(<Snippet title="x" className="mine" />);
    expect(container.firstElementChild).toHaveClass("vs-snippet", "mine");
  });
});
