export declare class ApiError extends Error {
    readonly status: number;
    readonly data: unknown;
    constructor(message: string, status: number, data: unknown);
}
export declare function api<T = unknown>(method: string, url: string, body?: unknown): Promise<T>;
