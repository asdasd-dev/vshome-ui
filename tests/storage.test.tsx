import { act, renderHook } from "@testing-library/react";
import { storage, useLocalStorage } from "../src";

afterEach(() => { vi.restoreAllMocks(); localStorage.clear(); });

describe("storage / useLocalStorage", () => {
  it("читает сохранённое и пишет новое", () => {
    localStorage.setItem("tasks.view", "backlog");
    const { result } = renderHook(() => useLocalStorage("tasks.view", "board"));
    expect(result.current[0]).toBe("backlog");
    act(() => result.current[1]("board"));
    expect(result.current[0]).toBe("board");
    expect(localStorage.getItem("tasks.view")).toBe("board");
  });
  it("localStorage бросает — работаем на значении по умолчанию, без исключений", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("SecurityError"); });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("SecurityError"); });
    expect(storage.get("k", "d")).toBe("d");
    expect(() => storage.set("k", "v")).not.toThrow();
    const { result } = renderHook(() => useLocalStorage("k", "d"));
    act(() => result.current[1]("v"));
    expect(result.current[0]).toBe("v");
  });
});
