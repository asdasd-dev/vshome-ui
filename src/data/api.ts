export class ApiError extends Error {
  readonly status: number;
  readonly data: unknown;
  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

function errorText(data: unknown, status: number): string {
  if (typeof data === "object" && data !== null && "error" in data && typeof data.error === "string") return data.error;
  return `HTTP ${status}`;
}

export async function api<T = unknown>(method: string, url: string, body?: unknown): Promise<T> {
  let r: Response;
  try {
    r = await fetch(url, {
      method,
      credentials: "same-origin",
      headers: body === undefined ? {} : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError("нет связи с сервером", 0, null);
  }
  const data: unknown = await r.json().catch(() => ({}));
  if (!r.ok) throw new ApiError(errorText(data, r.status), r.status, data);
  return data as T;
}
