import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// jsdom не реализует эти API; сайт может подменить их своими во втором setup-файле
if (typeof window !== "undefined") {
  window.scrollTo ??= () => {};
  Element.prototype.scrollIntoView ??= () => {};
  window.matchMedia ??= (query: string) => ({
    matches: false, media: query, onchange: null,
    addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, dispatchEvent: () => false,
  });
  window.IntersectionObserver ??= class {
    readonly root = null; readonly rootMargin = ""; readonly thresholds = [];
    observe() {} unobserve() {} disconnect() {} takeRecords() { return []; }
  };
  // jsdom не считает раскладку: графики @vshome/ui/charts получают ширину 600
  window.ResizeObserver ??= class {
    constructor(private cb: ResizeObserverCallback) {}
    observe(target: Element) {
      this.cb([{ target, contentRect: { width: 600, height: 0 } } as unknown as ResizeObserverEntry], this as unknown as ResizeObserver);
    }
    unobserve() {} disconnect() {}
  };
}

afterEach(() => {
  cleanup();
  if (typeof window !== "undefined") localStorage.clear();
});
