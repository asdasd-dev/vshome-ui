import { ApiError } from "../src/data/api";
import { shouldRetry, createQueryClient } from "../src/data/query";

describe("query", () => {
  it("4xx не повторяем, 5xx и нет связи — до двух повторов", () => {
    expect(shouldRetry(0, new ApiError("x", 404, {}))).toBe(false);
    expect(shouldRetry(0, new ApiError("x", 409, {}))).toBe(false);
    expect(shouldRetry(0, new ApiError("x", 502, {}))).toBe(true);
    expect(shouldRetry(1, new ApiError("нет связи с сервером", 0, null))).toBe(true);
    expect(shouldRetry(2, new ApiError("x", 502, {}))).toBe(false);
  });
  it("createQueryClient: обновление при возврате на вкладку, мутации без повторов", () => {
    const c = createQueryClient();
    expect(c.getDefaultOptions().queries?.refetchOnWindowFocus).toBe(true);
    expect(c.getDefaultOptions().mutations?.retry).toBe(false);
  });
});
