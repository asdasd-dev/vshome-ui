import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Container, List, ListRow } from "../src";

describe("List-навигация", () => {
  it("selected — aria-current и класс, divided=false убирает разделители", () => {
    const { container } = render(<List divided={false}><ListRow title="Все" meta={10} onClick={() => undefined} /><ListRow title="Рыба" meta={3} selected onClick={() => undefined} /></List>);
    expect(screen.getByRole("button", { name: /Рыба/ })).toHaveAttribute("aria-current", "true");
    expect(screen.getByRole("button", { name: /Все/ })).not.toHaveAttribute("aria-current");
    expect(container.querySelector(".vs-list")).toHaveClass("vs-list--plain");
  });
  it("Container xl", () => {
    const { container } = render(<Container size="xl"><p>x</p></Container>);
    expect(container.firstElementChild).toHaveClass("vs-container--xl");
  });
});
