import "../src/node/test-setup";
import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { installMatchMedia, setMobile } from "./media";

// tests/fanout.test.ts и tests/release.test.ts идут в окружении node — там window нет
if (typeof window !== "undefined") installMatchMedia();
afterEach(() => {
  cleanup();
  setMobile(false);
});
