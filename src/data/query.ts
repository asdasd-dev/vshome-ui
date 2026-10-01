import { QueryClient } from "@tanstack/react-query";
import { ApiError } from "./api";

export function shouldRetry(count: number, err: unknown): boolean {
  if (err instanceof ApiError && err.status >= 400 && err.status < 500) return false;
  return count < 2;
}

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: true, staleTime: 0, retry: shouldRetry },
      mutations: { retry: false },
    },
  });
}
