import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Icon, IconButton, ICON_NAMES } from "../src";

describe("Icon", () => {
  it("svg из набора, скрыт от скринридера, цвет — currentColor", () => {
    const { container } = render(<Icon name="pause" />);
    const svg = container.querySelector("svg")!;
    expect(svg.dataset.icon).toBe("pause");
    expect(svg.getAttribute("aria-hidden")).toBe("true");
    expect(svg.querySelector("path")!.getAttribute("fill")).toBe("currentColor");
    expect(svg.classList.contains("vs-icon--md")).toBe(true);
  });
  it("в наборе ровно иконки из спеки", () => {
    expect([...ICON_NAMES].sort()).toEqual(["alert", "arrow-left", "check", "chevron-down", "chevron-right", "clock", "close", "dot", "external", "info", "next", "pause", "play", "plus", "prev", "search", "weather-clear-night", "weather-cloudy", "weather-exceptional", "weather-fog", "weather-hail", "weather-lightning", "weather-lightning-rainy", "weather-partlycloudy", "weather-pouring", "weather-rainy", "weather-snowy", "weather-snowy-rainy", "weather-sunny", "weather-windy"]);
  });
  it("label — подписанная картинка для скринридера", () => {
    render(<Icon name="weather-partlycloudy" label="облачно" />);
    const img = screen.getByRole("img", { name: "облачно" });
    expect(img.getAttribute("aria-hidden")).toBeNull();
    expect(img.dataset.icon).toBe("weather-partlycloudy");
  });
  it("неизвестное имя — ошибка типов", () => {
    // @ts-expect-error нет такой иконки
    render(<Icon name="nope" />);
  });
});

describe("IconButton", () => {
  it("кнопка с доступным именем, клик", async () => {
    const onClick = vi.fn();
    render(<IconButton icon="next" label="Следующий трек" onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: "Следующий трек" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it("варианты и размер — классы", () => {
    render(<IconButton icon="play" label="Играть" variant="primary" size="lg" />);
    const b = screen.getByRole("button", { name: "Играть" });
    expect(b.className).toContain("vs-icon-button--primary");
    expect(b.className).toContain("vs-icon-button--lg");
  });
  it("без label — ошибка типов", () => {
    // @ts-expect-error label обязателен
    render(<IconButton icon="play" />);
  });
});
