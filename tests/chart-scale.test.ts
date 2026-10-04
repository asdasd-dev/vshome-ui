import { dayTicks, fmtStamp, linePath, niceMax, outageBands } from "../src/charts/scale";
import { compact, plural } from "../src/utils/number";

describe("niceMax", () => {
  it("максимум — четыре шага из ряда 1–1,5–2–2,5–3–4–5–6–8–10 × 10^k", () => {
    expect(niceMax(100)).toBe(100);
    expect(niceMax(101)).toBe(120);
    expect(niceMax(7)).toBe(8);
    expect(niceMax(0.9)).toBe(1);
    expect(niceMax(370)).toBe(400);
  });
  it("пустой ряд или ноль — 4", () => {
    expect(niceMax(0)).toBe(4);
    expect(niceMax(NaN)).toBe(4);
  });
});

describe("dayTicks", () => {
  it("индексы полуночей по местному времени", () => {
    const t0 = new Date(2026, 9, 1, 23, 0).getTime() / 1000;
    expect(dayTicks(t0, 1800, 6)).toEqual([2]);
  });
  it("every — каждая N-я полночь", () => {
    const t0 = new Date(2026, 9, 1, 0, 0).getTime() / 1000;
    expect(dayTicks(t0, 86400, 15, 7)).toEqual([0, 7, 14]);
  });
});

describe("outageBands", () => {
  it("интервалы, где значение меньше 1; null — не авария", () => {
    expect(outageBands([1, 0, 0, 1, null, 0.5])).toEqual([[1, 2], [5, 5]]);
    expect(outageBands([1, 1])).toEqual([]);
  });
});

describe("linePath", () => {
  const x = (i: number) => i * 10, y = (v: number) => v;
  it("null рвёт линию", () => {
    expect(linePath([1, 2, null, 4], x, y, false)).toBe("M0.0 1.0L10.0 2.0M30.0 4.0");
  });
  it("connect ведёт линию через пропуски", () => {
    expect(linePath([1, null, 3], x, y, true)).toBe("M0.0 1.0L20.0 3.0");
  });
});

describe("fmtStamp", () => {
  it("дд.мм чч:мм по местному времени", () => {
    expect(fmtStamp(new Date(2026, 0, 7, 9, 5).getTime() / 1000)).toBe("07.01 09:05");
  });
});

describe("plural", () => {
  it.each([[1, "поиск"], [2, "поиска"], [5, "поисков"], [11, "поисков"], [12, "поисков"], [21, "поиск"], [22, "поиска"], [111, "поисков"], [3.6, "поиска"]])("%s → %s", (n, w) => {
    expect(plural(n, "поиск", "поиска", "поисков")).toBe(w);
  });
});

describe("compact", () => {
  it("M с десятой, k целыми, мелочь как есть, пусто — 0", () => {
    expect(compact(1_250_000)).toBe("1.3M");
    expect(compact(34_400)).toBe("34k");
    expect(compact(999)).toBe("999");
    expect(compact(0)).toBe("0");
  });
});
