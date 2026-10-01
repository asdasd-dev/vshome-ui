import { api, ApiError } from "../src/data/api";

const respond = (status: number, body: unknown) =>
  vi.fn().mockResolvedValue(new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } }));

afterEach(() => vi.unstubAllGlobals());

describe("api", () => {
  it("GET без тела: same-origin, без Content-Type, возвращает JSON", async () => {
    const f = respond(200, { ok: 1 });
    vi.stubGlobal("fetch", f);
    await expect(api("GET", "/x")).resolves.toEqual({ ok: 1 });
    expect(f).toHaveBeenCalledWith("/x", { method: "GET", credentials: "same-origin", headers: {}, body: undefined });
  });
  it("PATCH с телом шлёт JSON", async () => {
    const f = respond(200, {});
    vi.stubGlobal("fetch", f);
    await api("PATCH", "/x", { a: 1 });
    expect(f).toHaveBeenCalledWith("/x", { method: "PATCH", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: '{"a":1}' });
  });
  it("не-2xx → ApiError с текстом error, статусом и данными (409 со свежей версией)", async () => {
    vi.stubGlobal("fetch", respond(409, { error: "conflict", task: { id: 1 } }));
    const err = await api("PATCH", "/x", {}).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(ApiError);
    expect(err).toMatchObject({ message: "conflict", status: 409, data: { error: "conflict", task: { id: 1 } } });
  });
  it("не-2xx без error → HTTP <код>; тело не JSON → data {}", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("oops", { status: 502 })));
    await expect(api("GET", "/x")).rejects.toMatchObject({ message: "HTTP 502", status: 502, data: {} });
  });
  it("нет сети → ApiError status 0 «нет связи с сервером»", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));
    await expect(api("GET", "/x")).rejects.toMatchObject({ name: "ApiError", message: "нет связи с сервером", status: 0 });
  });
});
