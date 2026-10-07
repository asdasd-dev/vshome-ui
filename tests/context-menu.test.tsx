import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { ContextMenu, Sheet, type ContextMenuEntry } from "../src";

const STATUSES = [
  { value: "doing", label: "Doing" },
  { value: "review", label: "Review" },
] as const;

function Harness({ onOpen = () => {}, onStatus = () => {}, onAgent = () => {}, longPress }: {
  onOpen?: () => void;
  onStatus?: (v: string) => void;
  onAgent?: (v: boolean) => void;
  longPress?: boolean;
}) {
  const [agent, setAgent] = useState(false);
  const items: ContextMenuEntry[] = [
    { label: "Открыть", onSelect: onOpen },
    "separator",
    { label: "Статус", value: "doing", options: [...STATUSES], onValueChange: onStatus },
    { label: "🤖 агент", checked: agent, onCheckedChange: (v) => { setAgent(v); onAgent(v); } },
    { label: "Недоступно", onSelect: () => {}, disabled: true },
  ];
  return (
    <ContextMenu items={items} longPress={longPress}>
      <article data-testid="tile" onClick={() => {}}>T-1</article>
    </ContextMenu>
  );
}

const rightClick = (el: Element) => fireEvent.contextMenu(el, { clientX: 10, clientY: 10, button: 2 });

describe("ContextMenu", () => {
  it("правый клик по ребёнку открывает меню, сам ребёнок остаётся тем же элементом", async () => {
    render(<Harness />);
    const tile = screen.getByTestId("tile");
    expect(tile.tagName).toBe("ARTICLE");
    rightClick(tile);
    expect(await screen.findByRole("menu")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Открыть" })).toBeInTheDocument();
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("пункт зовёт onSelect и закрывает меню", async () => {
    const onOpen = vi.fn();
    render(<Harness onOpen={onOpen} />);
    rightClick(screen.getByTestId("tile"));
    await userEvent.click(await screen.findByRole("menuitem", { name: "Открыть" }));
    expect(onOpen).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByRole("menu")).not.toBeInTheDocument());
  });

  it("группа радио: подпись группы, отмечено текущее, выбор зовёт onValueChange", async () => {
    const onStatus = vi.fn();
    render(<Harness onStatus={onStatus} />);
    rightClick(screen.getByTestId("tile"));
    await screen.findByRole("menu");
    expect(screen.getByRole("group", { name: "Статус" })).toBeInTheDocument();
    expect(screen.getByRole("menuitemradio", { name: "Doing" })).toHaveAttribute("aria-checked", "true");
    await userEvent.click(screen.getByRole("menuitemradio", { name: "Review" }));
    expect(onStatus).toHaveBeenCalledWith("review");
  });

  it("выбор текущего значения радио onValueChange не зовёт", async () => {
    const onStatus = vi.fn();
    render(<Harness onStatus={onStatus} />);
    rightClick(screen.getByTestId("tile"));
    await userEvent.click(await screen.findByRole("menuitemradio", { name: "Doing" }));
    expect(onStatus).not.toHaveBeenCalled();
  });

  it("флажок переключается", async () => {
    const onAgent = vi.fn();
    render(<Harness onAgent={onAgent} />);
    rightClick(screen.getByTestId("tile"));
    const box = await screen.findByRole("menuitemcheckbox", { name: "🤖 агент" });
    expect(box).toHaveAttribute("aria-checked", "false");
    await userEvent.click(box);
    expect(onAgent).toHaveBeenCalledWith(true);
  });

  it("недоступный пункт помечен aria-disabled", async () => {
    render(<Harness />);
    rightClick(screen.getByTestId("tile"));
    expect(await screen.findByRole("menuitem", { name: "Недоступно" })).toHaveAttribute("aria-disabled", "true");
  });

  it("не вставляет inline <style> (CSP сайтов: style-src 'self')", async () => {
    render(<Harness />);
    rightClick(screen.getByTestId("tile"));
    await screen.findByRole("menu");
    expect(document.querySelectorAll("style").length).toBe(0);
  });

  describe("долгое нажатие", () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());
    const hold = (el: Element) => {
      fireEvent.touchStart(el, { touches: [{ clientX: 10, clientY: 10 }] });
      act(() => vi.advanceTimersByTime(700));
    };

    it("по умолчанию открывает меню", () => {
      render(<Harness />);
      hold(screen.getByTestId("tile"));
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });

    it("longPress={false}: не открывает ни таймер, ни contextmenu от касания", () => {
      render(<Harness longPress={false} />);
      const tile = screen.getByTestId("tile");
      hold(tile);
      rightClick(tile);
      act(() => vi.advanceTimersByTime(100));
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("longPress={false}: касание не глушит touchstart у предков (перетаскивание тачем)", () => {
      const parent = vi.fn();
      render(<div onTouchStart={parent}><Harness longPress={false} /></div>);
      fireEvent.touchStart(screen.getByTestId("tile"), { touches: [{ clientX: 10, clientY: 10 }] });
      expect(parent).toHaveBeenCalledTimes(1);
    });

    it("longPress={false}: правый клик мышью после касаний всё так же открывает меню", () => {
      render(<Harness longPress={false} />);
      const tile = screen.getByTestId("tile");
      hold(tile);
      act(() => vi.advanceTimersByTime(2000));
      rightClick(tile);
      act(() => vi.advanceTimersByTime(100));
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });
  });

  it("клик по фону внутри открытого листа закрывает только меню", async () => {
    const onRequestClose = vi.fn();
    render(<Sheet open onRequestClose={onRequestClose} head="T-1"><Harness /></Sheet>);
    rightClick(screen.getByTestId("tile"));
    await screen.findByRole("menu");
    const user = userEvent.setup();
    const backdrop = document.querySelector(".vs-sheet-backdrop") as HTMLElement;
    await user.pointer({ keys: "[MouseLeft>]", target: backdrop });
    await user.pointer({ keys: "[/MouseLeft]", target: backdrop });
    await waitFor(() => expect(screen.queryByRole("menu")).not.toBeInTheDocument());
    expect(onRequestClose).not.toHaveBeenCalled();
  });
});
