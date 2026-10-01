import { cx } from "../src/utils/cx";

describe("cx", () => {
  it("склеивает непустые части через пробел", () => {
    expect(cx("a", false, null, undefined, "", "b")).toBe("a b");
  });
});
