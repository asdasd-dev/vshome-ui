import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { installMatchMedia, setMobile } from "./media";

afterEach(() => cleanup());

// tests/fanout.test.ts и tests/release.test.ts идут в окружении node — там window нет
if (typeof window !== "undefined") installMatchMedia();
afterEach(() => setMobile(false));

// jsdom не реализует showModal/close у <dialog> — подменяем минимально: open + событие close
if (typeof HTMLDialogElement !== "undefined" && !HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) { this.open = true; };
  HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
    this.open = false;
    this.dispatchEvent(new Event("close"));
  };
}
