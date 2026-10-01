import { fmtDate, fmtDay, localToday } from "../src/utils/format";

describe("format", () => {
  it("fmtDate — день.месяц.год часы:минуты в локальной зоне; пусто для null", () => {
    const ms = new Date(2026, 9, 1, 9, 5).getTime();
    expect(fmtDate(ms)).toBe("01.10.2026 09:05");
    expect(fmtDate(null)).toBe("");
    expect(fmtDate(undefined)).toBe("");
  });
  it("fmtDay — день.месяц", () => {
    expect(fmtDay(new Date(2026, 0, 7).getTime())).toBe("07.01");
    expect(fmtDay(null)).toBe("");
  });
  it("localToday — локальная дата, а не UTC", () => {
    expect(localToday(new Date(2026, 9, 1, 0, 30))).toBe("2026-10-01");
  });
});
