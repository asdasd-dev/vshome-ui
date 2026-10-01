import { act, render, screen } from "@testing-library/react";
import { useMediaQuery } from "../src";
import { setMobile } from "./media";

function Probe() {
  return <span>{useMediaQuery("(max-width: 760px)") ? "телефон" : "комп"}</span>;
}

describe("useMediaQuery", () => {
  it("отдаёт текущее значение и перерисовывает на change", () => {
    render(<Probe />);
    expect(screen.getByText("комп")).toBeInTheDocument();
    act(() => setMobile(true));
    expect(screen.getByText("телефон")).toBeInTheDocument();
  });
});
